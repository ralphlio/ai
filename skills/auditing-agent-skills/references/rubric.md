# Skill Audit Rubric

Use this rubric to evaluate Claude Agent Skills and Codex skills. Score each dimension from 0 to 100.

## 1. Metadata Compliance

Check:

- `SKILL.md` exists.
- YAML frontmatter exists at the top of `SKILL.md`.
- `name` is present, 64 characters or fewer, lowercase letters/numbers/hyphens only.
- `name` does not contain reserved words such as `anthropic` or `claude`.
- `description` is present, non-empty, 1024 characters or fewer, and free of XML tags.

Score guide:

- 90-100: Fully compliant and professionally named.
- 70-89: Minor naming or wording issue.
- 40-69: Present but weak, vague, or partially invalid.
- 0-39: Missing frontmatter or required fields.

## 2. Trigger Design

Check whether `description`:

- Uses third person rather than "I can" or "you can".
- States what the Skill does.
- States when to use it.
- Includes concrete triggers such as file types, task names, user intents, domains, or workflow contexts.
- Is specific enough to choose this Skill among many installed Skills.

Strong descriptions say both capability and trigger:

```yaml
description: Analyzes Excel spreadsheets, creates pivot tables, and generates charts. Use when working with .xlsx files, tabular data, spreadsheet analysis, or report generation.
```

Weak descriptions are vague:

```yaml
description: Helps with data.
```

## 3. Instruction Clarity

Check:

- The body is concise and avoids teaching obvious background.
- Steps are ordered and actionable.
- The Skill states expected inputs and outputs.
- Examples cover common and edge cases.
- Safety and confirmation rules are explicit where relevant.
- The Skill sets the right degree of freedom: flexible guidance for judgment tasks, exact commands/scripts for fragile tasks.

## 4. Progressive Disclosure

Check:

- `SKILL.md` stays lean and preferably under 500 lines.
- Detailed guides live in one-level reference files directly linked from `SKILL.md`.
- Templates live in `templates/` or `assets/`.
- Scripts live in `scripts/`.
- The Skill explains when to read each reference or use each script.
- References are not deeply nested.

Good package shape:

```text
skill-name/
├── SKILL.md
├── references/
│   ├── examples.md
│   └── api.md
├── templates/
│   └── report.md
└── scripts/
    └── validate.py
```

## 5. Execution Reliability

Check:

- Repetitive, deterministic, or fragile operations are scripted.
- Scripts have clear input, output, parameters, and failure handling.
- Commands that affect files, accounts, or production systems include confirmation or dry-run guidance.
- The Skill has been tested with realistic tasks and the target model/surface when possible.
- Outputs have a stable format.

## 6. Security Risk

Audit all files, not only `SKILL.md`.

High-risk patterns:

- Hardcoded secrets, tokens, passwords, API keys, or private URLs.
- Unexpected network calls, webhook posts, uploads, or data exfiltration.
- Dangerous shell commands such as `rm -rf`, `sudo`, `curl ... | sh`, hidden downloads, or broad file reads.
- Instructions to bypass system prompts, ignore policies, override permissions, or avoid user confirmation.
- Obfuscated code, dynamic evaluation, base64 payloads, or unexplained binaries.

Medium-risk patterns:

- External dependencies that are not pinned.
- Scripts without input/output documentation.
- Broad file access without stated purpose.
- Sensitive data handling without redaction or confirmation rules.

Low-risk patterns:

- Missing safety section for a low-impact Skill.
- Sparse examples.
- Ambiguous permission language.

## Maturity Bands

- 85-100: Mature Skill. Reusable, discoverable, efficient, and bounded.
- 70-84: Usable Skill. Needs refinement in examples, structure, testing, or safety.
- 50-69: Prompt-like draft. Useful ideas, but weak Skill packaging.
- 0-49: Not ready. Missing key structure or contains serious risk.
