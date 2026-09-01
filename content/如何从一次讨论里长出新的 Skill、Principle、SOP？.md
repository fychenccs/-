首先推荐的心智模型：
```
ChatGPT
= 思考、研究、讨论、复盘、设计方法论

Codex
= 真正修改和整理 Repository

Dashboard
= 阅读、审核、验证、Commit、Push

GitHub + CI
= 远程事实源和独立验证
```

推荐具体操作流程：
```
你和 ChatGPT 深入讨论
        ↓
发现值得长期保存的东西
        ↓
ChatGPT 输出：
Source / Handoff / Codex Prompt / Artifact Candidates
        ↓
Codex 读取当前 Repository
        ↓
Codex 查重、分类、规范化
        ↓
创建 / 修改：
Skill
Principle
SOP
ADR
Tests
Examples
...
        ↓
Dashboard
        ↓
阅读实际内容 + Prepare Sync
        ↓
看 Diff / Tests / Human Gate
        ↓
Confirm Commit & Push
        ↓
GitHub Actions
```

最稳的“新对话恢复上下文”方式：
```
阅读我的 `personal-ai-methodology-system` Repository，按照 `AI_BOOTSTRAP.md` 进入系统，然后继续讨论 XXX。
```

这已经接近一个模型可替换、上下文可恢复的 Personal AI Operating Environment
```
短期：
当前聊天

中期：
ChatGPT Memory / Previous Chats

长期：
Personal_AI_Methodology_System

事实源：
Canonical Artifact

历史：
Git

证据：
Sources

执行：
Codex

审核与发布：
Dashboard
```

可进一步优化的流程（未实现）：
```
ChatGPT 给你 .md
↓
文件进入本地 Repository 的 sources/... 或工作区
↓
告诉 Codex：
“处理这个 source”
```