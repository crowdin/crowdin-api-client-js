# AGENTS.md

TypeScript client for the Crowdin API v2 and Crowdin Enterprise API v2 (npm: `@crowdin/crowdin-api-client`), shipped for both Node.js and browsers.

pnpm only — the exact version is pinned via `packageManager` in `package.json` and CI installs with `--frozen-lockfile`, so commit `pnpm-lock.yaml` changes. Develop on Node 22+ (CI matrix: 22 and 24 across Linux/Windows/macOS).

## Layout

- `src/index.ts` — main entry: the default `Client` class plus re-exports of every resource
- `src/<resource>/index.ts` — one file per resource: the class `extends CrowdinApi` and its models in `export namespace <ClassName>Model` in the same file (models never get their own file)
- `src/core/` — `CrowdinApi` base class, the axios and fetch HTTP clients, retry, error handling
- `tests/<resource>/api.test.ts` — one test file per resource; HTTP mocked with nock

## Commands

- Install: `pnpm install`
- Build (type-checks; part of PR CI): `pnpm run build`
- Test (all): `pnpm test`; one file: `pnpm test tests/<resource>/api.test.ts`
- Lint + format fix: `pnpm run lint` — Prettier runs through ESLint; there is no standalone prettier command
- Lint check (what CI runs): `pnpm run lint-ci`

The husky pre-commit hook runs `pnpm run lint-ci && pnpm test`, so run `pnpm run lint` before committing — unformatted files block the commit rather than being fixed.

## Adding or changing an endpoint

Fetch the endpoint spec first (see Crowdin API reference below). Then:

1. Implement the method in `src/<resource>/index.ts`:
   - Build the URL from `` `${this.url}/...` ``; add query params only via `this.addQueryParam(url, name, value)`.
   - Call the inherited `this.get/post/put/patch/delete(url, body, this.defaultConfig())`; list endpoints call `this.getList(url, options.limit, options.offset)` so `withFetchAll()` works.
   - New methods with optional parameters must take a single options object (`options?`): list endpoints use an interface extending `PaginationOptions`; non-list endpoints use a dedicated options interface in the resource namespace. This keeps the public API backward-compatible — new optional fields are added to the interface without touching the function signature. Never add bare positional optional parameters. Older methods carry deprecated positional overloads — leave those in place and add none.
   - Give every function an explicit return type (`Promise<ResponseObject<T>>`, `Promise<ResponseList<T>>`, or `Promise<void>` for 204s); the lint rule demands this everywhere, arrow callbacks in tests included.
   - JSDoc each method with `@param` lines and a `@see` link to the developer.crowdin.com operation (typedoc publishes these).
2. For a new resource, create `src/<resource>/index.ts` and make four edits in `src/index.ts`: the import, `export * from './<resource>'`, a `readonly <resource>Api` field on `Client`, and its construction in the constructor. Nothing is auto-discovered.
3. Test in `tests/<resource>/api.test.ts` with nock: one chained `nock(api.url)` scope in `beforeAll` with `reqheaders: { Authorization: `Bearer ${api.token}` }`, one `it()` per endpoint, and `scope.done()` in `afterAll` — an interceptor no test consumes fails the suite.

A complete new resource touches exactly 3 files: `src/<resource>/index.ts`, `src/index.ts`, `tests/<resource>/api.test.ts`.

## Crowdin API reference

Before implementing or changing any endpoint, fetch its spec from the llms.txt indexes (pick by environment, then project type):

- https://support.crowdin.com/_llms-txt/api/crowdin/file-based.txt — Crowdin API, file-based projects (start here)
- https://support.crowdin.com/_llms-txt/api/crowdin/string-based.txt — Crowdin API, string-based projects
- https://support.crowdin.com/_llms-txt/api/enterprise/file-based.txt — Crowdin Enterprise API, file-based projects
- https://support.crowdin.com/_llms-txt/api/enterprise/string-based.txt — Crowdin Enterprise API, string-based projects

Each index links one spec file per route (e.g. `.../api.projects.strings.get.txt`) with the exact request and response shapes.

## Conventions

- Conventional Commits for commit messages and PR titles; CI lints PR titles.
- PRs target `master`.
- Keep the public API backward compatible. The build targets `es2019` with `@types/node` v12 — stay within those types (the fetch client pulls DOM types file-locally via a triple-slash reference).
- Both HTTP clients count: anything added to the `HttpClient` interface must be implemented in the axios provider and the fetch client.
- Never edit `version` in `package.json` — the Release workflow bumps it.

## PR checklist

A change is ready when:

1. `pnpm run build` compiles,
2. `pnpm run lint-ci` is clean,
3. `pnpm test` passes, and
4. every new or changed endpoint method has a nock-backed test and a `@see` doc link.
