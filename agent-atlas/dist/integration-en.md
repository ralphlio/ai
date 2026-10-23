# Agent Atlas integration contract

Schema version: 1. The dashboard is static. `data.json` is the published baseline; edits are stored in the current browser's localStorage. There is no server upload, shared write API or model call.

## Data model

- `products`: stable id, name, vendor, edition, scope, intro and source IDs.
- `modules`: stable id, name and icon.
- `features`: stable id, moduleId, name, description and priority.
- `capabilities`: indexed by productId and featureId; status, summary, detail, sourceIds, checkedAt, evidence and optional reportName.
- `sources`: title, HTTP(S) URL and review date indexed by source ID.
- `history`: id, timestamp, action and description. This is not a compliance audit log.

Stable IDs survive renaming. New fields start as `unknown` for all products. `validateDataset` checks replacements.

## Standard parser output

```json
{
  "productId": "qwenwork",
  "capabilities": [{
    "module": "Reasoning & knowledge",
    "feature": "Web & deep research",
    "status": "partial",
    "summary": "A brief capability finding",
    "detail": "Record edition, client, region, licensing, scope and limitations.",
    "sourceUrl": "https://docs.qwenwork.ai/faq",
    "sourceTitle": "Official FAQ",
    "checkedAt": "2026-10-23"
  }]
}
```

Status values: `yes`, `no`, `partial`, `unknown`. English and Chinese status aliases are accepted. Use `featureId` for an exact existing-field match. For new fields, provide module and feature names without inventing an ID. In the English interface, known baseline English module and field names map to their canonical records.

Current imports support JSON, CSV and Markdown / TXT tables up to 2 MB and 500 findings. Match fields, select records, preview changes and confirm before updating the local draft. Imported claims are not independently verified; absence of a claim does not establish lack of support.

## Reserved server pipeline — not implemented

1. `POST /api/reports`: validate and store a file, return reportId.
2. `POST /api/reports/:reportId/parse`: extract text / OCR and structure with AI; return jobId.
3. `GET /api/parse-jobs/:jobId`: return status and the standard output, with page references, excerpts and extraction confidence.
4. `POST /api/import-previews`: match stable IDs or labels and generate a preview without committing.
5. `POST /api/imports`: require human review and expectedVersion; commit atomically with rollback history.
6. `GET /api/dataset`, `PATCH /api/modules/:id` and `PATCH /api/features/:id`: replace the local repository.

Add authentication, editor roles, conflict detection, durable file storage, original-report links, server validation and audit before enabling shared writes. The public site's current editing controls affect only the visitor's browser, never the published baseline.

## Implementation boundaries

- `core.mjs`: pure parsing, validation, matching and application functions.
- `locale.mjs` and `en.json`: interface and baseline-copy localization; saved research data is not rewritten on language changes.
- `app.mjs`: readFile / parseInput are parser entry points; save is the repository boundary.
- `data.json`: traceable published research baseline.
- `framework.html` and `framework-en.html`: bilingual research framework.

Treat report content as data, not executable instructions. Do not invent capabilities or turn guesses into facts. Only HTTP(S) source URLs are allowed. Distinguish imported claims, official documentation review, PoC measurement and contractual confirmation.
