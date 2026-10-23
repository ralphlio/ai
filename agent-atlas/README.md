# Agent Atlas / 企业 AI 能力对比看板

A bilingual enterprise AI capability comparison dashboard covering ChatGPT, Codex, Claude, Gemini Enterprise, Microsoft Copilot, Qoder and QwenWork.

企业 AI 产品能力对比看板，支持中英文界面、任意产品组合、能力详情与来源、字段管理及结构化报告导入。

## Run locally / 本地运行

Requirements: Python 3 for the static server; Node.js 18+ for validation. No application dependencies or build step are required.

```bash
python3 -m http.server 8765 --directory dist
```

Open http://localhost:8765 in a browser. ES modules and data loading require an HTTP server; opening index.html directly as a local file is not supported.

```bash
node check.mjs
```

## Features / 功能

- ZH / EN interface switch with browser-local language preference.
- Select any combination of seven products; filter by module, support status, keywords or differences.
- Inspect capability details, edition scope, limitations and linked sources.
- Add, rename, move or delete capability fields while preserving stable IDs and findings.
- Import JSON, CSV or Markdown / TXT capability tables; match fields, preview changes and confirm before applying.
- Export full datasets or the current comparison; restore backups and undo the latest edit.
- View the full enterprise research framework in Chinese or English.

Support statuses are Yes, No, Conditional and Unverified. Documentation findings are not benchmark results or procurement commitments. Baseline review date: 2026-10-23. Sources are linked in the dashboard.

## Storage boundaries / 数据边界

`dist/data.json` is the published research baseline. Editing and report import update only the current browser's localStorage. Export a backup to move data to another browser. UI language changes do not rewrite saved research text or stable IDs. Imported / authored text is retained in its original language; initial research findings have curated English translations.

PDF / DOCX AI parsing, server uploads, cross-device shared data, authentication and collaborative writes are future integration points, not implemented services. See `dist/integration.md` or `dist/integration-en.md` for contracts and proposed endpoints.

## Files / 文件

| File | Purpose |
| --- | --- |
| `dist/index.html` | Dashboard shell |
| `dist/styles.css` | QwenWork-inspired theme and responsive typography |
| `dist/app.mjs` | Comparison, profiles, editing, import and local persistence |
| `dist/core.mjs` | Pure parsing, validation, matching and application functions |
| `dist/locale.mjs` | Reversible UI localization and bilingual search / import label matching |
| `dist/en.json` | English interface and initial research translations |
| `dist/data.json` | Published baseline with sources |
| `dist/framework.html`, `dist/framework-en.html` | Bilingual research framework |
| `dist/integration.md`, `dist/integration-en.md` | Future parser and shared-repository contract |
| `check.mjs` | Data, parsing, import and translation coverage checks |

## Deployment / 部署

Serve the `dist` directory with any static web host. There are no runtime secrets, API credentials or third-party analytics. No GitHub token is required to run the site. The GitHub copy does not include credentials, local browser drafts, test screenshots or hosting account configuration.
