# 2026 AI 模型与 Agent 工作演进观察

[在线阅读](https://ralphlio.github.io/ai/ai-agent-research-2026/)

面向专业商业记者与技术转化人员的中文交互调研。事实截至 **2026-11-02**，页面修订于 **2026-11-03**。

网页包含年度要闻与指标、模型多选横向年表、Agent 月度功能年表、架构与 Harness、从发布到部署的证据链、行业深案、效率实证与成本、方法与来源八个章节。事件、规格、案例与指标保留原始来源及口径限制。

`index.html` 内嵌数据、样式和脚本，本地直接打开也无需服务器。`data.json` 提供结构化研究数据。客户自报收益与独立实验分别说明，未来月份不计入已发生事实。

## 更新与复现

源代码和七份独立研究章节位于 `source/`。研究方法见 [RESEARCH-PRINCIPLES.md](source/RESEARCH-PRINCIPLES.md)。

```sh
node source/build.mjs
```

生成文件位于 `source/dist/`。更新发布内容时，将其中的 `index.html` 与 `data.json` 复制到本目录并推送 `main` 分支，现有 GitHub Pages 将自动部署。

原始资料的权益属于相应来源。引用时请保留适用日期、分母与证据属性。
