---
name: e2e-test
description: Run end-to-end tests against the real Crowdin or Crowdin Enterprise API using credentials from .env. Use when you want to verify new or changed endpoints work with actual API calls.
argument-hint: "endpoint or resource, e.g. listBranches or sourceFiles"
---

# E2E Test — Crowdin API Client

Test endpoints against the real API. Requires a `.env` file with a valid `TOKEN` (and `ORGANIZATION` for Enterprise accounts).

## Environment

!`[ -f .env ] && echo "✓ .env present" || echo "✗ .env missing — copy .env.example and fill in TOKEN"`
!`[ -f .env ] && grep -v '^#\|^$' .env | sed 's/\(TOKEN=\).*/\1[MASKED]/' || true`

## Recent changes to src/

!`git diff --name-only HEAD~1 HEAD -- 'src/**' 2>/dev/null || git diff --name-only HEAD -- 'src/**' 2>/dev/null | head -20`

## Steps

Follow these steps exactly:

**1. Validate credentials**

Read `.env`. If `TOKEN` is empty or the file is missing, stop and tell the user:
> Create `.env` from `.env.example` and fill in TOKEN. Set ORGANIZATION for Enterprise endpoints.

**2. Determine what to test**

- If `$ARGUMENTS` is set, test only that endpoint or resource.
- If `$ARGUMENTS` is empty, read the changed `src/` files listed above and extract every new or modified public method (look for lines added with `+` in `git diff HEAD~1 HEAD -- src/` or fall back to reading the files directly). Test each one.
- For each method, infer the API resource class from the file path (e.g. `src/sourceFiles/index.ts` → `api.sourceFilesApi`) and the required parameters from the method signature.

**3. Build**

Run `pnpm run build`. If it fails, stop and show the error — do not proceed.

**4. Write the test script**

Write a file `e2e-scratch.cjs`:

```js
const crowdin = require('./out/index.js').default;

const token = process.env.TOKEN;
const organization = process.env.ORGANIZATION || undefined;
const api = new crowdin({ token, organization });

async function run() {
  // one block per endpoint — print name, call it, print summary or error
}

run().catch(err => {
  const status = err?.response?.status;
  const msg = err?.response?.data?.error?.message ?? err.message;
  console.error(`✗ ${status ? `HTTP ${status}: ` : ''}${msg}`);
  process.exit(1);
});
```

For each method under test, add a block that:
- Prints what it is calling and with what arguments
- Calls the method with the minimal valid arguments (required params only; use sensible placeholders — `filter: 'test'` for string filters, `1` for numeric IDs)
- Prints `✓ OK — N items` for list responses or `✓ OK — id: X` for single-object responses
- Catches errors per-call (don't let one failure abort the rest) and prints `✗ HTTP STATUS: message`

If ORGANIZATION is not set and the method being tested is an Enterprise-only org-level endpoint (one that has no `projectId` parameter and targets a root-level collection such as `/branches`, `/directories`, `/files`, `/strings`, or `/translations`), prepend a warning: `⚠ ORGANIZATION not set — this endpoint is Enterprise-only and requires an organization subdomain`. Note: project-scoped endpoints (those taking a `projectId`) work with or without ORGANIZATION — setting it only changes the base domain.

**5. Run the script**

Source `.env` and execute:
```
export $(grep -v '^#\|^$' .env | xargs) && node e2e-scratch.cjs
```

Show all output verbatim.

**6. Clean up**

Delete `e2e-scratch.cjs` regardless of success or failure.

**7. Summarize**

List each endpoint tested with ✓ / ✗ and the HTTP status, and note any endpoints skipped due to missing credentials.
