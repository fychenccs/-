export interface NotePropertiesOptions {
  title: string
  showOnAllPages: boolean
  defaultCollapsed: boolean
  excludedProperties: string[]
  preferredOrder: string[]
  structuredProperties: string[]
}

export const defaultNotePropertiesOptions: NotePropertiesOptions = {
  title: "笔记属性",
  showOnAllPages: false,
  defaultCollapsed: true,
  excludedProperties: ["title", "description", "aliases", "draft"],
  preferredOrder: [
    "type",
    "version",
    "status",
    "maturity",
    "domains",
    "tags",
    "created",
    "updated",
    "id",
    "name",
    "name_zh",
    "depends_on",
    "related",
    "owners",
    "maintainers",
    "canonical",
  ],
  structuredProperties: ["id", "type", "version", "maturity", "canonical"],
}

export type NoteProperty = {
  key: string
  value: unknown
}

export function isEmptyPropertyValue(value: unknown): boolean {
  if (value === undefined || value === null) return true
  if (typeof value === "string") return value.trim() === ""
  if (Array.isArray(value)) return value.length === 0 || value.every(isEmptyPropertyValue)
  if (value instanceof Date) return Number.isNaN(value.getTime())
  if (typeof value === "object") return Object.keys(value).length === 0
  return false
}

function normalizeForStableJson(value: unknown, seen: WeakSet<object>): unknown {
  if (
    value === null ||
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "number"
  ) {
    return value
  }

  if (typeof value === "bigint" || typeof value === "symbol" || typeof value === "function") {
    return String(value)
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "Invalid Date" : value.toISOString()
  }

  if (typeof value === "object") {
    if (seen.has(value)) return "[Circular]"
    seen.add(value)

    if (Array.isArray(value)) {
      return value.map((item) => normalizeForStableJson(item, seen))
    }

    const normalized: Record<string, unknown> = {}
    for (const key of Object.keys(value).sort()) {
      try {
        normalized[key] = normalizeForStableJson((value as Record<string, unknown>)[key], seen)
      } catch {
        normalized[key] = "[Unreadable value]"
      }
    }
    return normalized
  }

  return String(value)
}

export function stringifyPropertyValue(value: unknown): string {
  if (typeof value === "string") return value
  if (typeof value === "boolean" || typeof value === "number" || typeof value === "bigint") {
    return String(value)
  }
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? "Invalid Date" : value.toISOString()
  }

  try {
    return JSON.stringify(normalizeForStableJson(value, new WeakSet<object>()))
  } catch {
    return "[Unserializable value]"
  }
}

export function shouldShowNoteProperties(
  frontmatter: Record<string, unknown>,
  options: NotePropertiesOptions,
): boolean {
  return (
    options.showOnAllPages ||
    options.structuredProperties.some((key) => !isEmptyPropertyValue(frontmatter[key]))
  )
}

export function getVisibleProperties(
  frontmatter: Record<string, unknown>,
  options: NotePropertiesOptions,
): NoteProperty[] {
  const excluded = new Set(options.excludedProperties)
  const preferredRank = new Map(options.preferredOrder.map((key, index) => [key, index]))

  return Object.entries(frontmatter)
    .filter(([key, value]) => !excluded.has(key) && !isEmptyPropertyValue(value))
    .sort(([leftKey], [rightKey]) => {
      const leftRank = preferredRank.get(leftKey) ?? Number.POSITIVE_INFINITY
      const rightRank = preferredRank.get(rightKey) ?? Number.POSITIVE_INFINITY
      if (leftRank !== rightRank) return leftRank - rightRank
      return leftKey.localeCompare(rightKey)
    })
    .map(([key, value]) => ({ key, value }))
}
