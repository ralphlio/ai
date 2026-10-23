# Agent Atlas 数据与报告解析接入约定

当前版本：schemaVersion 1。看板为静态网站，初始数据从 data.json 读取；修改通过 localStorage 保存在当前浏览器。不存在服务端上传、共享写入或模型调用。

## 领域结构

- products：id、name、vendor、edition、scope、intro、sources。
- modules：id、name、icon。
- features：id、moduleId、name、description、priority。
- capabilities：以 productId、featureId 为双层索引；status、summary、detail、sourceIds、checkedAt、evidence、reportName。
- sources：来源 ID 对应 title、url、checkedAt。
- history：id、at、action、description。当前不是合规审计日志。

ID 在重命名时保持稳定。新增功能为所有产品创建 unknown 能力。数据替换须通过 validateDataset 校验。

## 报告解析标准输出

```json
{
  "productId": "qwenwork",
  "capabilities": [
    {
      "module": "认知与知识",
      "feature": "联网与深度研究",
      "status": "partial",
      "summary": "简短能力描述",
      "detail": "说明企业 SKU、地区、客户端、授权、限制等。",
      "sourceUrl": "https://docs.qwenwork.ai/faq",
      "sourceTitle": "官方 FAQ",
      "checkedAt": "2026-10-23"
    }
  ]
}
```

status 枚举：yes、no、partial、unknown。中文“有 / 无 / 条件支持 / 待核实”在浏览器导入时可归一化。已有字段可填写 featureId；新字段填写 module 与 feature，不自行生成 featureId。

当前上传接受 JSON、CSV、Markdown 或 TXT 表格，最大 2 MB、最多 500 条记录。解析结果经字段匹配、逐条勾选、差异预览和确认后更新本地数据。导入证据均标记“未独立核验”；报告未说明的能力不自动填“无”。

## 预留服务端链路（尚未实现）

建议未来设置同域 API：

1. POST /api/reports：接收文件，校验格式、大小与权限，返回 reportId。
2. POST /api/reports/:reportId/parse：PDF / DOCX 文本抽取、OCR 和 AI 结构化。异步返回 jobId。
3. GET /api/parse-jobs/:jobId：返回状态及上述标准输出；增加页码、原文位置与抽取置信度。
4. POST /api/import-previews：按稳定 ID / 字段名匹配，返回预览，不自动提交。
5. POST /api/imports：携带 expectedVersion 与人工确认记录，原子更新并生成可回滚版本。
6. GET /api/dataset、PATCH /api/modules/:id、PATCH /api/features/:id：替代当前本地仓储。

后续实现必须增加登录与编辑角色校验、版本冲突检测、文件持久存储、原始报告关联、服务端校验和审计。当前公开页面的本地编辑入口仅修改访客自己的浏览器，不修改发布基线。

## 实现接点

- core.mjs：parseReport、planImport、applyImport、validateDataset 为独立纯函数。
- app.mjs：readFile / parseInput 为上传解析入口；save 为写入仓储入口。接入服务端时替换这些边界；现有映射与预览流程可沿用。
- data.json：发布时的可追溯初始基线。
- framework.html：上一版完整研究框架。

AI 抽取需将报告视为数据：不执行报告中的指令，不凭空补充能力或将推测当事实。来源 URL 仅允许 HTTP(S)。报告的证据状态应与“官方资料已核验”“PoC 实测”“合同确认”区分。
