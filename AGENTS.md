# AGENTS.md

## Project

- TypeScript/JavaScript client library for Crowdin API.
- Main source: `src/`
- Tests: `tests/`

## Setup

This project uses [pnpm](https://pnpm.io) v11 as its package manager (Node.js 22+ required for development).

- Install dependencies: `pnpm install`
- Build: `pnpm run build`

## Quality Checks

- Lint (auto-fix): `pnpm run lint`
- Lint (CI mode): `pnpm run lint-ci`
- Tests: `pnpm test`

## Notes For API Details

Always use Crowdin/Crowdin Enterprise `llms.txt` index files for API method details. Choose the correct index by environment first, then project type.

Use these URLs:

- https://support.crowdin.com/_llms-txt/api/crowdin/file-based.txt - Crowdin API (file-based projects, preferred first)
- https://support.crowdin.com/_llms-txt/api/crowdin/string-based.txt - Crowdin API (string-based projects)
- https://support.crowdin.com/_llms-txt/api/enterprise/file-based.txt - Crowdin Enterprise API (file-based projects)
- https://support.crowdin.com/_llms-txt/api/enterprise/string-based.txt - Crowdin Enterprise API (string-based projects)

Each index contains a list of links to the API method details (e.g. https://support.crowdin.com/_llms-txt/api/enterprise/file-based/api.projects.strings.get.txt).

## Pull Requests And Commits

- Target branch: `master`.
- Use Conventional Commits for commit messages and PR titles.
- Before opening a PR, run tests and formatting checks locally.
