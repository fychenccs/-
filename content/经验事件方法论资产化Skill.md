---
id: experience-to-methodology-extraction
type: skill
name: Experience-to-Methodology Extraction
name_zh: 经验事件方法论资产化
version: 0.1.0
status: active
maturity: prototype

domains:
  - methodology
  - knowledge-management
  - ai-system

tags:
  - extraction
  - retrospective
  - classification
  - assetization
  - reuse

created: 2026-09-01
updated: 2026-09-01

depends_on:
  - system-ontology

related:
  - reusable-over-one-off
  - practice-validates-methodology
  - specification-delivery-integrity

owners:
  - human

maintainers:
  - codex

canonical: true
---
# Experience-to-Methodology Extraction

# 经验事件方法论资产化

## Purpose

把一次事件、失败、成功实践、高价值对话或项目经验，从：

> “发生过的一件事”

转化为：

> “可以进入 Personal AI Methodology System 的候选方法论资产”。

这个 Skill 的重点不是普通的“总结”或“复盘”。

它需要进一步回答：

- 这件事情实际上发生了什么？
- 为什么会发生？
- 哪些部分只是偶然现象？
- 哪些机制具有可复用性？
- 应该沉淀成什么类型？
- 是否已经存在类似 Artifact？
- 有多少现实证据？
- 能否形成测试？
- 哪些结论仍需要 Human Gate？
- 最终应该怎样进入 Repository？

同时避免：

> “只要发现有价值的东西，就全部做成 Skill。”

---

# Trigger Conditions

当出现以下任一情况时触发：

- 用户说“总结这次事件”；
- 用户说“复盘一下”；
- 用户问“有什么可复用经验”；
- 用户要求“把这个沉淀进我的方法论系统”；
- 用户问“这个应该是什么类型”；
- 用户问“这个能不能做成 Skill”；
- 一次真实失败产生了明确 root cause；
- 一次工作流经过真实实践证明有效；
- 一场高价值 AI 对话形成了值得长期保存的结论；
- 一个项目出现值得抽象的成功经验；
- 一个 Debug / Bug 暴露出系统性问题；
- 某种操作开始重复出现，值得资产化；
- 现有方法论被现实案例证实、反驳或修正。

---

# Non-trigger Conditions

以下情况通常不需要直接创建 Methodology Artifact：

- 只是一次普通聊天；
- 只是一个临时事实；
- 只是没有复用价值的单次操作；
- 尚未形成明确机制；
- 只是一个模糊灵感；
- 只有 AI 建议，没有用户接受或现实证据；
- 可以简单作为 Note / Source 保存即可。

原则：

> 发现价值 ≠ 必须立刻 canonicalize。

---

# Inputs

至少考虑：

- 原始事件或对话材料；
- 实际发生的操作；
- 错误信息 / Debug 日志；
- 成功或失败结果；
- 当前 Repository ontology；
- 当前 CONVENTIONS；
- 已有相关 Artifact；
- 用户已经明确确认的结论；
- AI 提出的候选解释；
- 实际测试和使用记录；
- 当前项目 / 系统上下文。

---

# Outputs

建议输出结构：

```text
incident_summary

facts

interpretations

root_causes

reusable_lessons

candidate_artifacts

type_rationale

duplicates_or_related

evidence_level

maturity_recommendation

tests_or_examples

human_gates

integration_plan

deferred_candidates
```

---

# Procedure

## Step 1 — Preserve the event as Source

首先保留事件本身。

区分：

```text
Raw / Derived Source
≠
Canonical Methodology
```

事件记录负责回答：

> 当时到底发生了什么？

而不是：

> 以后所有事情应该怎么做？

如果来源是 AI 对话，可以生成：

```text
Conversation Handoff
```

或：

```text
Incident Source
```

并保持：

```yaml
canonical: false
```

---

## Step 2 — Separate Facts from Interpretation

必须把：

```text
事实
```

与：

```text
解释
```

分开。

例如：

### Fact

点击 Prepare Sync 后浏览器显示：

```text
Failed to fetch
```

### Interpretation

可能是：

```text
git fetch 失败
```

这只是 hypothesis。

进一步调查发现：

```text
stale session token
→ POST 被拒绝
→ request body 未正确消费
→ Windows connection reset
→ Fetch API 显示 Failed to fetch
```

这才接近 verified root cause。

因此：

> 不允许把第一直觉直接升级成方法论结论。

---

## Step 3 — Identify the Root Cause

不要只记录：

> 哪里出错了？

继续追问：

> 为什么这种错误能够发生？

建议使用：

```text
Observed failure
↓
Immediate cause
↓
Underlying mechanism
↓
System condition
↓
Generalizable mechanism
```

例如：

```text
Codex Prompt 少了一部分
↓
Markdown outer fence 提前结束
↓
内部和外部使用相同长度 fence
↓
复杂 payload 使用了不安全的交付介质
↓
没有进行 Delivery Integrity Validation
```

真正值得抽象的是最后两层。

---

## Step 4 — Extract the Minimum Reusable Lesson

不要直接从：

```text
一次具体 Bug
```

跳到：

```text
宏大原则
```

应该找到最小但可以跨场景复用的机制。

例如：

具体规则：

> 外层 Markdown fence 应比内部 fence 更长。

进一步抽象：

> 复杂结构内容需要匹配安全的封装方式。

再进一步：

> 交付介质是最终正确性的一部分。

不同抽象层可能分别成为：

- Test
- Skill rule
- Principle

---

# Step 5 — Classify with the Repository Ontology

按照对象回答的问题进行分类。

## Theory

如果它主要回答：

> 为什么某类现象会发生？

考虑：

```text
Theory
```

---

## Conceptual Model

如果它主要提供：

> 一个结构化模型描述现象。

考虑：

```text
Conceptual Model
```

---

## Principle

如果结论是：

> 一般情况下，应该怎样做？

考虑：

```text
Principle
```

例如：

> 交付介质也是正确性的一部分。

---

## Policy

如果结论是：

> 必须这样做 / 禁止这样做。

考虑：

```text
Policy
```

但 Policy 的门槛应明显高于 Principle。

一个单一失败案例通常不足以让 AI 自动创建 Repository-wide Policy。

---

## SOP

如果对象回答：

> 这一类重复任务，从开始到结束标准应该怎么跑？

考虑：

```text
SOP
```

---

## Workflow

如果对象描述：

> 这一次任务实际怎么运行？

考虑：

```text
Workflow
```

---

## Playbook

如果对象主要回答：

> 遇到不同异常情况分别怎么处理？

考虑：

```text
Playbook
```

---

## Skill

如果对象回答：

> 某一个可复用步骤应该怎样稳定做好？

并且满足：

```text
Reusable
Independent
Composable
Testable
Explicit Inputs
Explicit Outputs
Clear Trigger
Clear Failure Behavior
```

考虑：

```text
Skill
```

---

## Protocol

如果对象主要规定：

> 两个 Agent / 模块 / 系统应该怎样交接？

考虑：

```text
Protocol
```

---

## Template

如果对象规定：

> 输出应该长什么样？

考虑：

```text
Template
```

---

## Schema

如果对象规定：

> 数据必须满足什么结构？

考虑：

```text
Schema
```

---

## Checklist

如果对象主要用于：

> 防止遗漏。

考虑：

```text
Checklist
```

---

## Test

如果对象主要用于：

> 验证某种行为是不是正确。

考虑：

```text
Test
```

真实失败事件通常应该产生：

```text
Regression Test
```

---

## Benchmark

如果对象用于：

> 系统性比较多个实现、版本、Agent 或模型。

考虑：

```text
Benchmark
```

---

## Decision Record

如果它主要记录：

> 为什么本项目最终选择方案 A 而不是 B？

考虑：

```text
Decision Record / ADR
```

---

## Example / Case

如果它主要用于：

> 展示一个正式方法在现实中的实际案例。

考虑：

```text
Example / Case
```

---

## Source

如果它只是：

> 对现实事件、原始对话、附件或证据的记录。

它应该保持：

```text
Source
```

而不是直接成为 canonical methodology。

---

# Step 6 — Check for Duplication

在创建新 Artifact 前：

必须检查：

- 当前 Registry；
- 同类型 Artifact；
- related Artifact；
- 相似名称；
- 相似目的；
- 相同 Trigger；
- 相同 Procedure。

优先考虑：

```text
Update existing
```

或：

```text
Relate existing artifacts
```

而不是：

```text
Create duplicate
```

---

# Step 7 — Determine the Evidence Level

区分：

```text
AI Proposed

User Accepted

Single Real Incident

Multiple Real Incidents

Repeated Successful Usage

Regression Evidence

Stable Long-term Evidence
```

单次真实事件足以支持：

```text
prototype
draft
regression test
```

通常不足以支持：

```text
stable
core
```

---

# Step 8 — Determine Maturity Conservatively

不要因为：

> “这个文档现在已经写得非常完整。”

就提升 maturity。

成熟度由现实证据决定。

推荐思路：

```text
idea
→ 有概念

draft
→ 有结构

prototype
→ 已经可以使用

tested
→ 有多次真实测试

stable
→ 多场景长期稳定

core
→ 成为系统基础能力
```

---

# Step 9 — Generate Tests from the Incident

真实失败事件至少应考虑创建：

```text
Regression Test
```

例如：

输入：

> 长 Codex Prompt 内部包含大量三反引号 fenced blocks。

期望：

> 不允许再使用不安全的相同长度外层 fence。

再例如：

输入：

> 页面持有 stale session token。

期望：

> 返回结构化 403 JSON，而不是 socket reset + Failed to fetch。

原则：

> 一个真实 Bug 最有价值的资产之一，就是它可以成为以后永远防止同类 Bug 回归的 Test。

---

# Step 10 — Extract Examples

真实案例也可以成为：

```text
Example / Case
```

但必须注意：

```text
Source
≠
Example
```

Source 是事件证据。

Example 是为解释某个已经正式存在的方法而组织的教学案例。

同一件现实事件可以：

```text
Source
→ 支撑 Skill

同时被加工为：
Example
→ 演示 Skill
```

但二者身份不同。

---

# Step 11 — Identify Human Gates

以下候选通常必须经过 Human Gate：

- 创建或修改核心 Theory；
- 创建高影响 Policy；
- 修改 Signature Principle；
- 稳定 Artifact ID 变化；
- 删除正式 Artifact；
- 合并稳定 Artifact；
- ontology 修改；
- major migration；
- Major version bump；
- 高影响自动化规则。

AI 可以：

```text
propose
prepare
draft
test
show diff
```

但不应静默 canonicalize。

---

# Step 12 — Decide What NOT to Create

资产化的目标不是让 Repository 无限膨胀。

必须明确回答：

> 哪些东西不值得创建？

例如一次事件可能产生：

```text
1 Source
1 Skill
1 Principle
1 ADR
1 Regression Test
```

但不一定还需要：

```text
Policy
SOP
Playbook
Checklist
Theory
Protocol
```

如果这些类型没有独立职责：

不要创建。

---

# Step 13 — Prepare Repository Integration

对每一个 candidate 指定：

```text
id

type

suggested path

version

status

maturity

depends_on

related

source evidence

tests

Human Gate
```

然后交给 Repository Maintainer / Codex：

```text
Source
↓
Normalization
↓
Schema Validation
↓
Repository Integration
↓
Registry Generation
↓
Dashboard Review
↓
Human Confirm
↓
Commit / Push
```

---

# Step 14 — Preserve Deferred Candidates

如果某个观点：

- 看起来有价值；
- 但证据还不够；
- 类型还不确定；
- 或现在实现成本太高；

不要强行 canonicalize。

保存为：

```text
Candidate
Hypothesis
Backlog
Source note
```

等待更多证据。

---

# Classification Heuristics

## Skill vs SOP

如果问题是：

> “这一步怎么稳定做好？”

优先：

```text
Skill
```

如果问题是：

> “这一类任务从开始到结束标准怎么跑？”

优先：

```text
SOP
```

---

## Principle vs Policy

如果结论是：

> “通常这样更好。”

优先：

```text
Principle
```

只有当违反它具有：

- 明确风险；
- 稳定证据；
- 系统治理必要性；
- Human Gate 确认；

才考虑：

```text
Policy
```

---

## Source vs Example

### Source

保存：

> 现实发生了什么。

### Example

展示：

> 某个正式方法如何应用。

---

## Theory vs Principle

### Theory

回答：

> 为什么？

### Principle

回答：

> 所以一般应该怎么做？

---

## Skill vs Checklist

### Skill

回答：

> 怎么完成这个能力？

### Checklist

回答：

> 有没有漏东西？

---

# Anti-patterns

禁止以下退化：

## 1. 所有内容都做成 Skill

```text
Everything
→ Skill
```

错误。

---

## 2. 一次事件产生十几个正式 Artifact

过度资产化会让 Repository 失去可维护性。

---

## 3. AI 自己升级 Policy

AI 可以提出：

```text
Policy Candidate
```

但不应未经 Human Gate 直接确认为高影响 Policy。

---

## 4. 不检查已有 Artifact

结果：

```text
同义 Principle
近义 Skill
重复 SOP
```

不断增加。

---

## 5. 只写 Lesson Learned

例如：

> “以后要注意代码块。”

这不是足够可复用的方法论。

应该继续找：

```text
Trigger
Mechanism
Procedure
Failure Behavior
Test
```

---

## 6. 不保留 Source

如果只剩高度抽象的方法论结论：

以后很难知道：

> 这个结论为什么存在？

应该保留 source evidence。

---

## 7. 一次成功就标 Stable

```text
Worked once
≠
Stable
```

---

## 8. Bug 修完但没有 Regression Test

这样未来很可能再次犯同一错误。

---

## 9. 把 AI 建议当成用户观点

必须区分：

```text
User Explicit
User Accepted
AI Proposed
Inference
Hypothesis
```

---

# Exit Criteria

完成本 Skill 后，至少确认：

- [ ] 原事件 / 对话已经被保留为 Source 或可追溯 evidence
- [ ] 事实与解释已经分离
- [ ] Root Cause 已明确
- [ ] 找到了可以跨当前事件复用的机制
- [ ] 每个 candidate 都有明确 Artifact type
- [ ] 每个 type 都有 classification rationale
- [ ] 已检查 Repository 中是否存在重复资产
- [ ] maturity 与现实证据匹配
- [ ] 至少考虑了 regression test
- [ ] Human Gate 已明确
- [ ] 不值得创建的 Artifact 已主动排除
- [ ] deferred ideas 没有被强行 canonicalize
- [ ] Repository integration plan 已明确

---

# Example

## Prompt Packaging Integrity Incident

### Incident

长 Codex Prompt 被放进一个三反引号 Markdown code block。

Prompt 内部又存在：

```text
```yaml
...
```
```

等相同长度的 fenced code block。

导致外层 copy container 提前结束。

用户复制到的内容不完整。

---

### Root Cause

```text
复杂 Payload
+
错误交付介质
+
缺少 Delivery Integrity Validation
```

---

### Extracted Principle

```text
Delivery Medium Is Part of Correctness
交付介质是正确性的一部分
```

---

### Extracted Skill

```text
Specification Delivery Integrity
规格交付完整性保障
```

---

### Extracted Meta-Skill

```text
Experience-to-Methodology Extraction
经验事件方法论资产化
```

---

### Extracted ADR

```text
Long structured specifications
should prefer
real file-based delivery
```

---

### Regression Test

输入：

> 一个包含多组三反引号代码示例的长 Codex Prompt。

期望：

> 不允许使用危险的同长度外层 fenced block。

---

### Not Created

没有立即创建：

```text
Repository-wide Policy
```

原因：

目前只有一次明确真实事故。

也没有创建：

```text
SOP
```

因为当前“安全交付规格”更符合一个独立可复用能力，而不是完整端到端业务流程。

---

# Maturity Note

当前：

```yaml
status: active
maturity: prototype
```

原因：

本 Skill 是从一次真实的：

> 事件 → Root Cause → 可复用经验 → Artifact 分类 → Repository Integration

需求中直接抽取出来。

已经具有真实实践基础，但还需要在其他类型事件中继续验证，例如：

- AI factual failure；
- 项目决策失败；
- 学习方法实验；
- Codex architecture bug；
- Agent handoff failure；
- SOP 实际运行偏差；
- 产品设计复盘。

只有当它在多个不同领域中都能稳定地产生合理分类结果后，才适合提升为：

```text
tested
```

进一步长期稳定后才考虑：

```text
stable
```