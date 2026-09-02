---
title: 从一次性 AI 对话到 Personal AI Methodology System：一套个人方法论系统的形成过程
date: 2026-09-01
tags:
  - AI
  - 方法论
  - 元学习
  - 知识管理
  - Obsidian
  - Codex
  - GitHub
  - Personal-AI-Methodology-System
status: revised
---

# 从一次性 AI 对话到 Personal AI Methodology System：一套个人方法论系统的形成过程

和 AI 讨论出来的好东西，如果聊完就散掉，实在有些可惜。

毕竟，学习方法、项目决策、软件设计、知识管理、语言学习、元学习……很多高质量讨论都会留下值得复用的判断、结构和流程。但聊天记录天然适合“当时使用”，并不适合长期维护。过一段时间再回看，往往要重新定位、重新阅读、重新判断；同一类问题隔几个月又会从头讨论。

因此，最早的需求并不宏大。我想做的，只是让一次性的 AI 智力劳动留下来，并在下一次派上用场。

这个需求后来不断向外延伸：怎样算可复用？什么值得沉淀？Skill、SOP、Workflow、Agent 应怎样区分？AI 的记忆能承担多少长期责任？方法论的事实源应该放在哪里？修改权限如何划分？怎样测试、版本化、追溯，又怎样让不同 AI 在未来重新读懂这套系统？

Personal AI Methodology System 就是在这些问题中逐渐长出来的。

---

## 一、从“保存聊天”到“保存可复用能力”

最初想到的办法很直接：把长期有价值的内容从聊天里提取出来。

例如：

- 稳定的学习方法，可以沉淀为 Skill 或 SOP；
- 项目决策过程，可以整理成可重复执行的流程；
- 固定输出结构，可以做成 Template；
- 对话中出现的最小知识点，可以进入 Obsidian，必要时进一步转成 Anki 卡片；
- 反复出现的机械操作，可以逐步交给自动化。

核心问题随之变得清楚：

> 如何把一次性的 AI 智力劳动，转化成下次可以直接调用的资产？

这也是整个系统最早的驱动力。

项目决策可以形成类似这样的流程：

```text
Idea
↓
需求澄清
↓
竞品研究
↓
专业最佳实践
↓
个人判断与创新空间
↓
方案比较
↓
MVP
↓
Human Decision
```

学习任务也可以拆成：

```text
前置知识
↓
最小知识块
↓
理解
↓
联系
↓
练习
↓
迁移
↓
长期记忆
```

AI 的作用由回答单个问题，逐渐延伸到按照一套稳定方法处理一类问题。

---

## 二、Skill 需要边界

随着沉淀内容越来越多，我很快发现，“什么都封装成 Skill”会带来新的混乱。类型一旦失去边界，后续检索、调用、测试和维护都会变得混乱。

因此，系统开始建立更明确的本体分类。

| 类型 | 主要回答的问题 |
|---|---|
| Theory | 为什么某种现象会发生 |
| Conceptual Model | 用什么结构描述这种现象 |
| Principle | 一般情况下应遵循什么方向 |
| Policy | 哪些规则必须遵守，哪些行为应禁止 |
| SOP | 一类重复任务的标准流程 |
| Workflow | 某一次具体任务如何实际运行 |
| Playbook | 不同情境下分别采用什么处理方式 |
| Skill | 可独立调用、可复用、可测试的能力单元 |
| Protocol | 模块之间如何交接 |
| Template | 输出需要呈现成什么样 |
| Schema | 数据必须满足什么结构 |
| Checklist | 如何降低漏项概率 |
| Test | 如何验证行为符合预期 |
| Decision Record | 为什么当时做出某项选择 |

AI 执行系统中的几个概念也需要分清：

| 概念 | 职责 |
|---|---|
| AI Model | 提供生成、推理、多模态等基础能力 |
| Agent | 带着目标、规则、上下文和状态执行任务 |
| Skill | Agent 可调用的具体能力 |
| Tool | 执行搜索、写文件、运行代码等实际操作 |
| Router | 判断应该调用谁、调用什么 |
| Orchestrator | 协调多个执行者之间的工作 |
| Harness / Runtime | 让上述组件实际运行的环境 |

类型边界建立以后，系统才真正摆脱“技巧收藏夹”的状态。每一类资产开始有自己的职责，也有了相应的维护方式。

---

## 三、从文件整理到方法论资产

单纯建立一堆 Markdown 文件，并不能解决长期维护问题。

```text
最终版.md
最终版2.md
最终最终版.md
```

这种命名方式只能说明“曾经保存过几个版本”，无法回答更重要的问题：当前有效版本是哪一个？为什么修改？谁改的？能否回滚？结构是否符合规范？修改有没有破坏其他依赖？

因此，系统开始引入软件工程中已经被验证过的机制：

```text
Stable ID
Semantic Versioning
Git History
Changelog
Schema
Validation
Tests
Decision Record
```

一个正式 Artifact 逐渐拥有了稳定身份，例如：

```yaml
id: freshness-verification
type: skill
version: 0.1.0
status: active
maturity: prototype
canonical: true
```

这里最关键的变化，是把“文件”与“资产身份”分开处理。文件名、显示名称和 Dashboard 分类都可以调整，Stable ID 则承担长期引用职责。

从这一刻起，方法论开始具备软件资产的基本属性：可识别、可追踪、可版本化、可验证。

---

## 四、Source 与 Canonical Truth

AI 对话非常适合作为原始材料，却不适合直接承担正式事实源的职责。

一段对话里常常混合着：

- 明确表达过的观点；
- 暂时接受的判断；
- AI 给出的建议；
- AI 的推断；
- 尚未验证的假设；
- 后来已经被推翻的方案；
- 真实事件记录；
- 临时上下文。

保存原始对话，只能证明这些内容曾经出现过。它们是否值得长期采用，还需要另一套流程来判断。

于是形成了这样的生命周期：

```text
Raw Source
↓
Extraction
↓
Classification
↓
Candidate / Hypothesis
↓
Evidence / Human Gate
↓
Canonical Artifact
```

`sources/` 可以保存 AI 对话、附件、参考资料、Incident、Conversation Handoff 等原始材料，并统一采用：

```yaml
canonical: false
```

正式方法论资产则需要经过提炼、分类、去重、验证和确认。

这种设计解决了一个很实际的问题：来源可以尽量完整地保留，正式系统仍然保持干净。原始材料负责可追溯，Canonical Artifact 负责当前有效结论。

---

## 五、AI Memory 的位置

系统逐渐变大以后，另一个风险开始显现：如果关键方法都依赖某个聊天平台“记得”，模型切换、对话重开、上下文压缩都可能造成断层。

因此，需要给不同信息源安排清晰的优先级。

```text
Current Canonical Repository
>
Generated Registry
>
Source / Handoff
>
Platform Memory
>
旧聊天中的模糊记忆
```

Platform Memory 很适合保存长期偏好、沟通习惯和稳定背景信息；Repository 负责方法论当前状态。

这带来了两个重要目标：

```text
Model-replaceable
Context-recoverable
```

未来更换模型时，只要新的执行者能够读取系统入口、Registry 和相关 Artifact，就应当能够重新进入工作状态。长期资产由 Repository 承担，模型负责在当前任务中理解和执行。

---

## 六、Git 与 GitHub 成为长期底座

当 Repository 被确定为方法论事实源后，版本、历史、回滚、远程备份和自动验证都成了必须解决的问题。

Git 很自然地进入这套系统：

```text
Local Repository
↓
Git
↓
GitHub Private Repository
```

其中：

```text
Git
= history / diff / commit / branch / rollback

GitHub
= remote copy / backup / Actions / future collaboration
```

过去常见的“最终版、最新版本”逐渐被下面这组结构取代：

```text
Canonical Artifact
+
Semantic Version
+
Git History
```

知识管理也从此和软件工程真正接上了轨道。

---

## 七、ChatGPT、Codex 与 Human Owner 的分工

项目推进过程中，我遇到过一个很现实的问题：如果需求分析、方案比较和技术决策已经讨论清楚，Codex 还应该负责什么？

最后形成的分工如下：

```text
Human Owner
= Methodology Owner
= 最终价值判断、核心决策、重大治理权

ChatGPT / Gemini / 其他推理 AI
= 讨论、研究、挑战、候选方案设计

Codex
= Repository Maintainer
= Architect / Engineer / Migration / Refactor / Tests

Dashboard
= Human Review + Repository Control

Git / GitHub
= Version History + Remote Source

CI
= Independent Validation
```

Codex 可以负责修改文件、规范化 Artifact、查重、补 Schema、补 Test、重构、运行验证、生成 Registry、维护 Dashboard 等工程工作。

涉及核心 Theory、Principle、Policy、稳定 ID、重大架构变化等内容时，仍需要显式的人类决策。

这套边界的意义并不在于限制 AI，而在于让每一类决策都有明确责任人。系统越自动化，责任边界越需要提前写清楚。

---

## 八、Human Gate 与自动化边界

早期对自动化的想象很容易走向全自动：

```text
AI 自动整理
AI 自动分类
AI 自动更新
AI 自动同步
```

真正进入工程实现后，才发现自动化的价值主要集中在低风险、重复性高、判断成本低的部分。越接近核心方法论和系统治理，越需要保留人工确认。

以下操作应进入 Human Gate：

- 修改核心 Theory；
- 修改高影响 Principle；
- 创建或改变高影响 Policy；
- 删除正式 Artifact；
- 修改 Stable ID；
- Major Version bump；
- 大规模 ontology migration；
- 强制推送；
- 自动解决高影响冲突。

可以把这一原则概括为：

> AI 处理提取、整理和工程劳动；高价值判断保留人工确认。

这样既能降低操作成本，又不会把责任一起交出去。

---

## 九、Obsidian 与 Repository 的分工

Obsidian 依然非常适合个人知识工作：记笔记、写想法、做研究、建立双链、整理学习材料、准备发布内容。

Repository 则承担另一类任务：正式保存、版本化、验证和供 AI 调用的方法论资产。

```text
Obsidian
= Thinking / Research / Reading / Personal Notes / Publishing

Personal AI Methodology Repository
= Canonical / Versioned / Testable Methodology Source
```

未来两者可以互相引用、同步部分内容，甚至共享某些文件。但在治理层面，需要明确哪一边负责“当前正式版本”，避免形成两个同时自称最新版的中心。

这条边界让 PKM 和方法论工程各自保持优势，也降低了同步时的认知负担。

---

## 十、Bootstrap：让架构进入真实运行

抽象设计积累到一定程度后，继续画架构图已经不会带来同等价值。真正的检验只能来自实际运行。

这里也逐渐形成了一条对我影响很大的原则：

> 任何脱离实践的系统方法都很容易停在纸面。尽早用真实案例跑起来，才能知道设计是否成立。

Bootstrap 之后，Repository 逐步形成了下面的结构：

```text
AI_BOOTSTRAP.md
SYSTEM-ONTOLOGY.md
CONVENTIONS.md
AGENTS.md

personal/
theories/
principles/
policies/
sops/
workflows/
playbooks/
skills/
protocols/
agents/
templates/
schemas/
tests/
benchmarks/
examples/
decisions/
sources/
registry/
dashboard/
scripts/
.github/workflows/
```

同时加入 Schema、Validator、Generated Registry、Dashboard、GitHub Actions、ADR 和 Tests。

系统由此从概念设计进入可运行状态：可以被读取、验证、修改，也可以留下历史。

---

## 十一、第一个成熟能力：Freshness Verification

最早拿出来做真实能力验证的是：

```text
Freshness Verification
强时效信息核验
```

它解决的是一个很具体的问题：模型很容易把训练数据中的旧信息继续当作当前现实。

流程逐渐稳定为：

```text
识别时效性
↓
确定当前日期
↓
优先第一方来源
↓
检查发布日期 / 更新时间
↓
必要时交叉验证
↓
检测模型记忆锚定
↓
旧知识与当前证据冲突时，以当前证据为准
↓
输出 as-of date 和不确定性
```

其中一条重要规则是：

> Absence from model memory is not evidence of absence from reality.

这个案例验证了 Skill 应具备的一些基本条件：明确 Trigger、Input、Output、Procedure；能够配 Test；能够被 Agent 重复调用；能够通过真实案例积累 maturity。

Skill 到这里才真正具有“能力单元”的含义。

---

## 十二、Registry、Dashboard 与 Repository Control

Repository 逐渐变大后，只靠目录浏览很难掌握全貌，于是增加了 Generated Registry 和 Methodology Atlas。

```text
Canonical Markdown / YAML
↓
Generated Registry
↓
Methodology Atlas
```

三者职责不同：

| 层级 | 作用 |
|---|---|
| Canonical Markdown / YAML | 当前正式事实源 |
| Registry | 机器可读索引 |
| Dashboard | 面向人的可视化视图 |

Dashboard 最初用于查看 Artifact 数量、类型、领域、maturity、更新时间、Signature Principles 和详情。

很快又出现新的摩擦：看得到状态，却仍需要回命令行处理 Git。于是 Dashboard 继续扩展为本地 Repository Control Plane：

```text
start-dashboard.bat
↓
build Registry
↓
build Dashboard
↓
localhost-only Control Server
↓
Methodology Atlas
↓
Repository Control
```

逐步提供：

```text
Refresh
Rebuild Atlas
Check Remote
Prepare Sync
Confirm Push
Confirm Commit & Push
```

真正的同步流程也被设计成受控链路：

```text
Prepare Sync
↓
查看文件
↓
Diff
↓
Validation
↓
Tests
↓
Registry consistency
↓
Dashboard build
↓
Secret scan
↓
Human Confirm
↓
Commit / Push
```

遇到 remote ahead、diverged、conflict、secret、test failure、ontology change、governance change、detached HEAD 等情况时，流程会停在 `Human Review Required`。

自动化在这里表现出更成熟的形态：正常路径尽量顺滑，风险路径明确刹车。

---

## 十三、Dogfooding 暴露出来的问题

Dashboard Control 已经拥有几十项测试后，第一次真实点击 `Prepare Sync` 仍然出现了：

```text
Failed to fetch
```

这次故障很重要，因为它揭示了自动化测试覆盖不到的一层现实：浏览器、真实本地服务、Repository 状态和操作顺序会共同产生新的失败模式。

最终定位出的链路是：

```text
旧 session token
↓
POST 被拒绝
↓
旧 handler 没有正确消费 request body
↓
Windows connection reset
↓
Browser Fetch API
↓
Failed to fetch
```

修复之后：

- stale token 返回结构化 403；
- handler exception 返回结构化 500；
- UI 能区分 API unreachable、auth、validation、test、fetch 等错误；
- 新增 regression tests；
- 完整测试提升到 45 项。

这次经历强化了 `Practice Validates Methodology`：设计完整度、单元测试数量和真实可用性属于不同层面的证据。成熟度最终还要靠实际工作流验证。

随后又完成了第一次真正的 Dogfooding：给 Dashboard 首页增加使用说明，再通过 Dashboard 自己完成 `Prepare Sync → Review Diff → Checks Passed → Confirm Commit & Push → GitHub → CI Passed`。

系统第一次承担起了维护自身的工作。

---

## 十四、从“看元数据”到“读内容”

Dashboard 能看到 Version、Status、Maturity、Domains、Dependencies 和 Canonical path 后，又暴露出一个很直观的问题：知道某个 Skill 存在，并不等于能够在工作台里真正阅读它。

因此增加了 `Canonical Content Preview`，Artifact Detail 逐步设计成：

```text
Artifact Detail

[Overview]
[Content]
[Files]
```

例如 Skill 可以继续查看：

```text
SKILL.md
CHANGELOG
tests/
examples/
```

文件阅读也按类型提供不同视图：

```text
Markdown → Rendered / Source
JSON → Pretty / Source
YAML → Source / Pretty
TXT → Plain Text
```

到这里，Dashboard 才从索引浏览器逐渐接近真正的方法论工作台。

---

## 十五、专业术语理解也进入系统

使用 Dashboard 和 Git 的过程中会不断遇到：

```text
commit
push
fetch
registry
canonical
runtime
schema
artifact
branch
staged
```

只知道中文翻译并不足以支撑真正理解。技术词汇往往借用了普通语言中的旧词义，再在专业领域里建立新的隐喻关系。

因此又出现了一个新的方向：

```text
Multilingual Technical Terminology Knowledge Base
```

它计划记录：

```text
原语言普通含义
↓
普通中文解释
↓
Semantic Bridge
↓
技术领域含义
↓
中文规范技术术语
```

并进一步补充 IPA、en-US / en-GB 发音、词性差异、initialism / acronym、technical domain、source、verification status、related terms、confused terms、repository context，以及未来的日语、法语等语言版本。

例如 `branch` 原本表示树枝或从主干分出的部分。Git 沿用了“从共同主干分出另一条路径”的隐喻，因此把独立开发线称为 branch。这样的 Semantic Bridge 能让术语从“记翻译”变成“理解概念形成过程”。

这一模块也把语言学习、技术学习和方法论系统连接到了一起。

---

## 十六、一次 Prompt Packaging Incident 带来的新资产

后来发生过一次很典型的交付错误。

一份很长的 Codex 指令被放进单个 Markdown 代码块，外层和内部都使用了相同长度的 fenced code block。内部 fence 提前结束了外层代码块，导致原本预期“一次复制”的内容被截断。

问题表面上只是 Markdown 格式出错，继续追下去后，可以拆成三个层面：

```text
Content Correctness
Packaging Correctness
Delivery Correctness
```

内容本身可以完全正确，封装方式仍可能破坏它；封装正确以后，最终交付介质也可能继续引入新的错误。

由此沉淀出一条 Principle：

```text
Delivery Medium Is Part of Correctness
交付介质是正确性的一部分
```

以及一个 Skill：

```text
Specification Delivery Integrity
规格交付完整性保障
```

交付策略也变得更具体：

```text
短、结构简单
→ Chat code block

长、嵌套结构多
→ 独立 .md 文件

多个规格文件
→ Manifest + numbered files
```

这类 Incident 的价值也因此发生变化。修复当前错误只是第一层收益；进一步提炼 Root Cause、Rule、Regression Test 和适用条件，才能让同类问题以后更少重复发生。

---

## 十七、Experience-to-Methodology Extraction

随着 Incident 逐渐积累，又出现了一个更“元”的问题：如果每次都要人工临时总结“这次学到了什么”，这个总结动作本身是否也能形成稳定流程？

于是有了：

```text
Experience-to-Methodology Extraction
经验事件方法论资产化
```

它大致按照下面的顺序工作：

```text
Incident / Conversation
↓
Preserve Source
↓
Facts vs Interpretation
↓
Root Cause
↓
Reusable Mechanism
↓
Ontology Classification
↓
Duplicate Check
↓
Evidence / Maturity
↓
Tests
↓
Human Gate
↓
Repository Integration
```

这一层让系统有了从实践中继续生长的机制。

真实经历先成为 Source；经过事实整理、根因分析和抽象后，再决定是否形成 Skill、Principle、Test、ADR 或其他 Artifact。系统的更新由实际经验触发，方法论也因此持续获得新的证据。

---

## 十八、整个过程中发生的认知变化

把这一段建设过程压缩后，大致可以整理成下面的演化路径：

| 阶段 | 当时遇到的问题 | 后来形成的处理方式 |
|---|---|---|
| 1 | AI 对话聊完后难以复用 | 评估并沉淀高价值讨论 |
| 2 | 所有内容都想封装成 Skill | 建立 Artifact 类型边界 |
| 3 | 文件越来越多 | 引入 Stable ID、Version、Schema、Test |
| 4 | 对话能否直接作为知识库 | 将 Source 与 Canonical 分层 |
| 5 | AI 能否长期记住系统 | Repository 承担长期事实源 |
| 6 | Codex 应负责哪些工作 | 拆分推理、工程和所有权职责 |
| 7 | 自动化应该做到什么程度 | 低风险任务自动化，高影响操作进入 Human Gate |
| 8 | Obsidian 与 Repository 如何共存 | 分离思考空间与正式事实源 |
| 9 | 架构是否要先设计完整 | 尽早 Bootstrap，用真实工作流驱动迭代 |
| 10 | Tests 通过是否足够 | 加入 Dogfooding 与 Regression |
| 11 | Dashboard 能看元数据是否够用 | 增加 Canonical Content Reader |
| 12 | 技术词汇只做翻译是否够用 | 建立 Semantic Bridge 和术语知识库 |
| 13 | Bug 修复后如何继续利用 | 抽取 Root Cause、Rule、ADR、Regression Test |
| 14 | 如何持续产生方法论 | 建立 Experience-to-Methodology Extraction |

如果再压缩一层，可以看到关注点发生了三次变化：

```text
最初：
让 AI 更高效地帮助当前任务

后来：
设计 AI 的组织方式、边界、验证机制和替换能力

继续往后：
让新的实践经验能够反过来更新整套方法论系统
```

这个变化也解释了为什么项目最终会超出“Prompt 管理”或“Skill Library”的范围。

---

## 十九、专业理解与阶段适配

这套系统还有一个很容易出现的风险：太早按照终局标准建设所有东西。

直接研究专业最佳实践很有价值，它能减少低水平重复造轮子，也能帮助提前看见未来会遇到的问题。但如果实现深度脱离当前阶段，系统会迅速膨胀，维护成本先于收益到来。

后来逐渐形成的原则是：

```text
Professional Understanding
+
Stage-Appropriate Implementation
```

可以提前理解专业终局，同时只实现当前真实工作流中已经出现、并且值得解决的下一层需求。

实际迭代更接近：

```text
理解专业终局
↓
做最小可运行版本
↓
真实使用
↓
记录摩擦
↓
根据真实摩擦继续设计
```

Dashboard 的成长过程就是一个清楚的例子：先能看，再增加 Sync；真实使用暴露 session bug 后补修复和 Regression；随后又因为阅读需求增加 Canonical Content Preview。

功能增长开始由实际工作流推动，想象中的完整产品清单则退到了次要位置。

---

## 二十、当前的工作模型

目前整套系统可以简化为：

```text
                    Human Owner
                        │
                        ▼
                  思考 / 研究 / 判断
                        │
          ┌─────────────┴─────────────┐
          ▼                           ▼
      ChatGPT                     Other AI
   讨论 / 提炼 / 研究                挑战 / 补充
          │
          ▼
Source / Handoff / Candidate
          │
          ▼
        Codex
Repository Engineering / Normalize / Test
          │
          ▼
Canonical Markdown / YAML
          │
          ├───────────────┐
          ▼               ▼
       Registry        Git History
          │               │
          ▼               ▼
 Methodology Atlas      GitHub
          │               │
          ▼               ▼
   Human Review       GitHub Actions
          │
          ▼
     Prepare Sync
          │
          ▼
 Human Gate / Confirm
```

Obsidian 主要承担：

```text
Thinking
Research
Personal Notes
Learning
Publishing
```

Repository 主要承担正式方法论资产的治理和执行入口。两边可以互相连接，但职责保持清晰。

---

## 二十一、日常使用方式

理想状态下，系统维护本身应该越来越“隐身”。日常注意力最好集中在问题、方法和判断上，文件移动、Git 命令、索引生成等机械操作逐渐交给工具。

一套较自然的日常流程是：

### 普通思考

```text
Obsidian / ChatGPT
```

### 高价值讨论

```text
ChatGPT
↓
Source / Handoff
```

### 方法论资产化

```text
Experience-to-Methodology Extraction
↓
Candidate Artifacts
```

### 正式工程化

```text
Codex
```

### 阅读和审核

```text
Methodology Atlas
```

### 提交

```text
Prepare Sync
↓
Confirm Commit & Push
```

### 独立验证

```text
GitHub Actions
```

这样一来，真正需要持续投入认知资源的问题会逐渐收敛到：这个方法是否成立？证据够不够？是否值得长期保留？什么时候应该修改？

自动化节省下来的价值，最终体现在这些判断上。

---

## 二十二、可复用的几条经验

### 1. 高价值 AI 输出需要经过资产化判断

大多数聊天内容都没有长期保存的必要。反复出现、跨场景有效、未来很可能再次使用的内容，才值得进入候选资产流程。

### 2. 先确定类型，再决定怎样封装

“有价值”只说明值得关注，还不能直接决定它应成为 Skill。Theory、Principle、Policy、SOP、ADR、Test 等类型承担着完全不同的职责。

### 3. Source 与 Canonical 要分层

来源负责保留证据和上下文，Canonical 负责表达当前采用的正式结论。两者分层后，系统既能追溯，也能保持清晰。

### 4. 自动化优先处理机械劳动

整理、生成索引、校验格式、运行测试、准备 Diff 等工作很适合自动化。高影响决策保留 Human Gate，可以在提高效率的同时维持责任边界。

### 5. Tests、Dogfooding 与 Regression 共同提供成熟度证据

自动化测试验证预期行为；Dogfooding 检查真实工作流；Regression 把已经发生过的问题固定成长期防线。三者关注的层级不同。

### 6. Bug 应留下可复用的痕迹

一次故障如果只留下修复后的代码，后续很容易忘记它为什么发生。Root Cause、Decision Record、Rule 和 Regression Test 都可以把一次性经验转成长期资产。

### 7. 交付介质属于正确性的一部分

长 Prompt、嵌套 Markdown、多个规格文件等场景，需要同时检查内容、封装和最终交付形式。很多“内容明明没错”的失败，实际发生在后两个环节。

### 8. 系统需要支持模型替换

关键方法和事实源放在可读取、可验证的 Repository 中，能够降低对单一平台记忆和单一模型能力的依赖。

### 9. 专业标准可以提前研究，实现深度跟随当前阶段

提前理解成熟系统的设计逻辑很有价值。真正落地时，优先解决已经在真实工作流里出现的摩擦，能减少过度设计。

### 10. 方法论系统需要从实践中继续生长

理想的循环可以写成：

```text
真实实践
↓
成功 / 失败 / 摩擦
↓
Experience-to-Methodology Extraction
↓
新的 Skill / Principle / Test / ADR
↓
下一次实践
```

这样积累下来的内容会越来越接近经过实践检验的方法，静态收藏的成分也会逐渐降低。

---

## 结语：从知识库到个人方法论操作环境

回头看，我已经很难再用“知识库”或“Skill Library”概括 Personal AI Methodology System。

它更接近一个围绕学习、研究、项目和 AI 协作方式持续生长的个人方法论操作环境：

- 保存方法，也保留方法从哪里来；
- 允许 AI 执行大量工程和整理工作，同时保留清晰的治理边界；
- 采用专业标准，也要求尽早进入真实实践；
- 记录成功经验，也把失败沉淀成 Regression；
- 让 AI 能越来越快地理解当前工作环境，同时把长期认知资产放在可迁移的 Repository 中。

最初的问题只是“怎样避免有价值的 AI 对话白白消失”。

现在更关心的是：

> 怎样建立一个能够持续吸收经验、验证方法、调用能力、保留历史，并能让未来不同 AI 快速重新进入上下文的个人方法论系统？

这个问题还会继续变化。好在系统已经具备了一套更可靠的方式，把之后发生的成功、失败和摩擦继续留下来。
