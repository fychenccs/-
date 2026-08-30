import { cp, mkdir, readdir, readFile, rm, stat, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import matter from "gray-matter"

// Windows 用户：将此处改成你的 Obsidian 主库绝对路径。
// 也可以临时设置同名环境变量覆盖这些默认值。
const DEFAULT_OBSIDIAN_VAULT_PATH = String.raw`D:\Obsidian\My Vault\枫叶集`
const DEFAULT_PUBLISH_DIR = "_Publish"
const DEFAULT_PUBLISH_TAG = "" // 例如 "publish"；留空表示只同步发布目录。

const OBSIDIAN_VAULT_PATH = path.resolve(
  process.env.OBSIDIAN_VAULT_PATH?.trim() || DEFAULT_OBSIDIAN_VAULT_PATH,
)
const PUBLISH_DIR = process.env.PUBLISH_DIR?.trim() || DEFAULT_PUBLISH_DIR
const PUBLISH_TAG = normalizeTag(process.env.PUBLISH_TAG?.trim() || DEFAULT_PUBLISH_TAG)

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(scriptDirectory, "..")
const contentDirectory = path.join(projectRoot, "content")
const publishDirectory = path.resolve(OBSIDIAN_VAULT_PATH, PUBLISH_DIR)

const ignoredDirectoryNames = new Set([
  ".git",
  ".obsidian",
  ".stfolder",
  ".trash",
  "_private",
  "private",
])
const ignoredFileExtensions = new Set([".bak", ".swp", ".temp", ".tmp"])

function normalizeTag(tag) {
  return String(tag).trim().replace(/^#/, "").toLowerCase()
}

function isInside(parent, child) {
  const relative = path.relative(parent, child)
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative))
}

function shouldIgnore(relativePath) {
  const segments = relativePath.split(/[\\/]/).map((segment) => segment.toLowerCase())
  const basename = segments.at(-1) || ""
  const extension = path.extname(basename).toLowerCase()

  return (
    segments.some((segment) => ignoredDirectoryNames.has(segment)) ||
    basename.startsWith("~$") ||
    basename.includes(".private.") ||
    ignoredFileExtensions.has(extension)
  )
}

async function assertDirectory(directory, label) {
  let info
  try {
    info = await stat(directory)
  } catch {
    throw new Error(`${label}不存在：${directory}`)
  }

  if (!info.isDirectory()) {
    throw new Error(`${label}不是目录：${directory}`)
  }
}

async function walkFiles(rootDirectory) {
  const files = []

  async function visit(currentDirectory) {
    const entries = await readdir(currentDirectory, { withFileTypes: true })
    for (const entry of entries) {
      const absolutePath = path.join(currentDirectory, entry.name)
      const relativePath = path.relative(rootDirectory, absolutePath)
      if (shouldIgnore(relativePath)) continue

      if (entry.isDirectory()) {
        await visit(absolutePath)
      } else if (entry.isFile()) {
        files.push(absolutePath)
      }
    }
  }

  await visit(rootDirectory)
  return files
}

function frontmatterTags(data) {
  const rawTags = data.tags ?? data.tag ?? []
  const values = Array.isArray(rawTags) ? rawTags.flat(Infinity) : [rawTags]

  return new Set(
    values
      .flatMap((value) => String(value).split(/[\s,]+/))
      .map(normalizeTag)
      .filter(Boolean),
  )
}

function isDraft(data) {
  return data.draft === true || String(data.draft).trim().toLowerCase() === "true"
}

function extractAttachmentLinks(markdown) {
  const links = new Set()
  const obsidianEmbed = /!\[\[([^\]]+)\]\]/g
  const markdownLink = /!?\[[^\]]*\]\(([^)]+)\)/g

  for (const match of markdown.matchAll(obsidianEmbed)) links.add(match[1])
  for (const match of markdown.matchAll(markdownLink)) links.add(match[1])
  return links
}

function cleanLinkTarget(rawTarget) {
  let target = rawTarget.trim().replace(/^<|>$/g, "")
  target = target.split("|")[0].split("#")[0].split("?")[0].trim()
  target = target.match(/^(.*?)(?:\s+["'].*["'])?$/)?.[1] ?? target

  try {
    target = decodeURIComponent(target)
  } catch {
    // 路径包含非 URI 转义字符时保留原值。
  }

  return target
}

function resolveAttachment(rawTarget, notePath, vaultFiles, filesByBasename) {
  const target = cleanLinkTarget(rawTarget)
  if (!target || /^[a-z][a-z\d+.-]*:/i.test(target)) return undefined

  const candidates = target.startsWith("/")
    ? [path.resolve(OBSIDIAN_VAULT_PATH, `.${target}`)]
    : [path.resolve(path.dirname(notePath), target), path.resolve(OBSIDIAN_VAULT_PATH, target)]

  for (const candidate of candidates) {
    if (
      isInside(OBSIDIAN_VAULT_PATH, candidate) &&
      vaultFiles.has(candidate.toLowerCase()) &&
      path.extname(candidate).toLowerCase() !== ".md"
    ) {
      return candidate
    }
  }

  const basenameMatches = filesByBasename.get(path.basename(target).toLowerCase()) ?? []
  const attachmentMatches = basenameMatches.filter(
    (candidate) => path.extname(candidate).toLowerCase() !== ".md",
  )
  return attachmentMatches.length === 1 ? attachmentMatches[0] : undefined
}

function addCopy(copyPlan, source, destinationRelativePath) {
  const normalizedDestination = path.normalize(destinationRelativePath)
  if (
    normalizedDestination === "" ||
    normalizedDestination.startsWith("..") ||
    path.isAbsolute(normalizedDestination)
  ) {
    throw new Error(`拒绝写入 content/ 之外的路径：${destinationRelativePath}`)
  }

  const destination = path.resolve(contentDirectory, normalizedDestination)
  if (!isInside(contentDirectory, destination)) {
    throw new Error(`拒绝写入 content/ 之外的路径：${destination}`)
  }

  const key = destination.toLowerCase()
  const existing = copyPlan.get(key)
  if (existing && existing.source.toLowerCase() !== source.toLowerCase()) {
    throw new Error(`同步目标冲突：${existing.source} 与 ${source} 都将写入 ${destination}`)
  }

  copyPlan.set(key, { source, destination })
}

async function main() {
  if (OBSIDIAN_VAULT_PATH.includes("CHANGE_ME")) {
    throw new Error(
      "尚未配置 Obsidian 主库路径。请修改 scripts/sync-obsidian.mjs 顶部的 DEFAULT_OBSIDIAN_VAULT_PATH。",
    )
  }
  if (path.isAbsolute(PUBLISH_DIR)) {
    throw new Error("PUBLISH_DIR 必须是 Obsidian 主库内的相对路径。")
  }
  if (!isInside(OBSIDIAN_VAULT_PATH, publishDirectory)) {
    throw new Error(`发布目录必须位于 Obsidian 主库内：${publishDirectory}`)
  }
  if (isInside(OBSIDIAN_VAULT_PATH, contentDirectory)) {
    throw new Error("安全检查失败：Quartz content/ 不能位于 Obsidian 主库内部。")
  }

  await assertDirectory(OBSIDIAN_VAULT_PATH, "Obsidian 主库")
  await assertDirectory(publishDirectory, "Obsidian 发布目录")

  console.log(`Obsidian 主库：${OBSIDIAN_VAULT_PATH}`)
  console.log(`发布目录：${PUBLISH_DIR}`)
  console.log(`发布标签：${PUBLISH_TAG ? `#${PUBLISH_TAG}` : "未启用（仅同步发布目录）"}`)

  const publishFiles = await walkFiles(publishDirectory)
  const allVaultFiles = PUBLISH_TAG ? await walkFiles(OBSIDIAN_VAULT_PATH) : publishFiles
  const vaultFileSet = new Set(allVaultFiles.map((file) => file.toLowerCase()))
  const filesByBasename = new Map()

  for (const file of allVaultFiles) {
    const basename = path.basename(file).toLowerCase()
    const matches = filesByBasename.get(basename) ?? []
    matches.push(file)
    filesByBasename.set(basename, matches)
  }

  const copyPlan = new Map()
  const selectedNotes = []
  let draftCount = 0

  for (const source of allVaultFiles) {
    if (path.extname(source).toLowerCase() !== ".md") continue

    const insidePublishDirectory = isInside(publishDirectory, source)
    const markdown = await readFile(source, "utf8")
    const parsed = matter(markdown)
    const selectedByTag = Boolean(PUBLISH_TAG && frontmatterTags(parsed.data).has(PUBLISH_TAG))
    if (!insidePublishDirectory && !selectedByTag) continue

    if (isDraft(parsed.data)) {
      draftCount += 1
      continue
    }

    const destinationRelativePath = insidePublishDirectory
      ? path.relative(publishDirectory, source)
      : path.relative(OBSIDIAN_VAULT_PATH, source)

    addCopy(copyPlan, source, destinationRelativePath)
    selectedNotes.push({ source, markdown })
  }

  if (selectedNotes.length === 0) {
    throw new Error("没有找到可发布的 Markdown 笔记；为保护现有内容，本次未清空 content/。")
  }

  // 发布目录内的非 Markdown 文件按原目录结构镜像复制。
  for (const source of publishFiles) {
    if (path.extname(source).toLowerCase() === ".md") continue
    addCopy(copyPlan, source, path.relative(publishDirectory, source))
  }

  // 对发布目录外、通过标签选中的笔记，补充复制能够解析到的本地附件。
  for (const note of selectedNotes) {
    if (isInside(publishDirectory, note.source)) continue

    for (const rawTarget of extractAttachmentLinks(note.markdown)) {
      const attachment = resolveAttachment(rawTarget, note.source, vaultFileSet, filesByBasename)
      if (attachment) {
        addCopy(copyPlan, attachment, path.relative(OBSIDIAN_VAULT_PATH, attachment))
      }
    }
  }

  // 如果 Obsidian 本次没有提供根级 index.md，则在清空前暂存 Quartz 现有首页。
  // 只有 copyPlan 中明确存在目标为 content/index.md 的笔记时，才允许替换首页。
  const indexPath = path.join(contentDirectory, "index.md")
  const hasIncomingIndex = copyPlan.has(indexPath.toLowerCase())
  let preservedIndex

  if (!hasIncomingIndex) {
    try {
      preservedIndex = await readFile(indexPath)
    } catch (error) {
      if (error.code !== "ENOENT") throw error
    }
  }

  // 只有完成全部路径、frontmatter、冲突与首页保护检查后，才清空 content/。
  await rm(contentDirectory, { recursive: true, force: true })
  await mkdir(contentDirectory, { recursive: true })

  // 优先恢复首页，避免后续某个附件复制失败时留下缺少首页的 content/。
  if (preservedIndex) {
    await writeFile(indexPath, preservedIndex)
  }

  for (const { source, destination } of copyPlan.values()) {
    await mkdir(path.dirname(destination), { recursive: true })
    await cp(source, destination)
  }

  const attachmentCount = copyPlan.size - selectedNotes.length
  console.log(`已同步 ${selectedNotes.length} 篇笔记、${attachmentCount} 个附件/资源。`)
  console.log(`跳过 ${draftCount} 篇标记为 draft: true 的私密草稿。`)
  console.log(
    hasIncomingIndex
      ? "已使用 Obsidian 发布内容中的 index.md 更新站点首页。"
      : preservedIndex
        ? "已保留 Quartz 现有的 content/index.md。"
        : "未发现可保留或同步的 index.md。",
  )
  console.log(`同步目标：${contentDirectory}`)
}

main().catch((error) => {
  console.error(`同步失败：${error.message}`)
  process.exitCode = 1
})
