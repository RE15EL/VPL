# AGENTS.md

Repository guidance for coding agents working in `pruebas_tecnicas`.

## Mandatory Skill Usage

- Use `$group-changes-and-commit` before analyzing, grouping, staging, or committing repository changes when the user asks to create one or more commits.

## Project Snapshot

- Stack: React 19 + TypeScript + Vite + React Router + Tailwind CSS v4 + shadcn/ui.
- Package manager: `npm` (lockfile: `package-lock.json`).
- Source alias: `@/* -> src/*`.
- Main architecture: app shell + typed catalog + feature-per-practice modules.
- Language in UI copy is mostly Spanish; preserve language consistency in touched files.

## Working Directories

- App source: `src/`
- Routing: `src/app/router/index.tsx`
- Practice catalog contract: `src/app/catalog/types.ts`
- Practice registry: `src/app/catalog/practices.ts`
- Features: `src/features/<category>/<slug>/`
- Shared UI primitives: `src/components/ui/`

## Build / Lint / Test Commands

### Install

- `npm install`

### Run locally

- `npm run dev` - start Vite dev server.
- `npm run preview` - serve production build output.

### Build and type-check

- `npm run build` - runs `tsc -b && vite build`.
- `npx tsc -b` - type-check only (faster when you do not need a bundle).

### Lint

- `npm run lint` - lint entire repository.
- `npx eslint src/path/to/file.tsx` - lint a single file.
- `npx eslint src --ext .ts,.tsx` - lint TypeScript files under `src`.

### Tests (current status)

- There is currently **no configured test script** in `package.json`.
- No `*.test.*` or `*.spec.*` files were found at repo scan time.
- `npm run test` will fail unless a test script is added.

### Single-test execution (when test runner is added)

- Preferred script pattern to add: `"test": "vitest"` and `"test:watch": "vitest --watch"`.
- Then run one file: `npm run test -- src/path/to/file.test.ts`.
- Then run one test by name: `npm run test -- -t "test name"`.
- If a different runner is introduced, update this section immediately.

## Mandatory Rule Sources Check

- `.cursor/rules/`: not found.
- `.cursorrules`: not found.
- `.github/copilot-instructions.md`: not found.
- Action for agents: if any of these files appear later, treat them as high-priority instructions and sync this document.

## Architecture and Extension Rules

- Keep the catalog-driven routing model intact.
- Add new practices as isolated features under `src/features/<category>/<slug>/`.
- Export each practice definition from feature `index.ts` using `satisfies PracticeDefinition`.
- Register new practices only in `src/app/catalog/practices.ts`.
- Do not hardcode per-practice routes in router when they can be generated from `practiceDefinitions`.
- Reuse shared contracts in `src/app/catalog/types.ts` for consistency.

## Code Style Guidelines

### Imports

- Order imports in groups:
  1) third-party packages,
  2) blank line,
  3) internal `@/...` imports,
  4) blank line,
  5) relative imports.
- Prefer `import type { ... }` for type-only imports.
- Use alias imports (`@/...`) for cross-feature/shared modules.
- Use relative imports for same-folder modules (`./...`).
- Avoid deep relative paths like `../../../` when `@` alias is clearer.

### Formatting

- Follow ESLint config (`eslint.config.js`) and TypeScript strictness.
- Preserve the local style of the file you are editing; this repo currently has minor quote/semicolon variation.
- Do not mass-reformat unrelated files.
- Use trailing commas in multiline arrays/objects/arguments.
- Keep JSX readable: break long props/children across lines.
- Keep utility class lists stable and intentionally ordered (layout -> spacing -> typography -> color/effects).

### TypeScript and Types

- `strict` mode is enabled; do not bypass with `any` unless unavoidable.
- Prefer explicit domain types (for payloads, practice metadata, component props).
- Prefer `type` aliases for object contracts (existing project convention).
- Use `satisfies` to validate object literals against contracts without widening.
- Keep helpers generic when it improves reuse (example: `fetchWithRetry<T>`).
- Avoid unused locals/parameters (`noUnusedLocals`, `noUnusedParameters` are enabled).

### Naming Conventions

- React components: `PascalCase` (e.g., `CatalogHomePage`).
- Hooks: `camelCase` starting with `use` (e.g., `useIsMobile`).
- Variables/functions: `camelCase`.
- Type aliases: `PascalCase`.
- File names: `kebab-case` for feature/page/helper files.
- Practice `category` and `slug`: `kebab-case` strings.
- Route/status literal values should match shared types exactly.

### React and UI Patterns

- Prefer function components and named exports for feature modules.
- Keep side effects in `useEffect` with proper cleanup (abort controllers, listeners, intervals).
- Use UI primitives from `src/components/ui/` before creating new base controls.
- Merge class names via `cn` from `src/lib/utils.ts`.
- Preserve accessibility basics: meaningful text, `aria-*` where needed, keyboard-safe controls.
- Respect reduced-motion handling where animation exists.

### Error Handling and Async Flows

- For network calls, check `response.ok` and throw explicit errors for non-2xx status.
- Handle cancellation separately (`AbortError`) and rethrow/ignore intentionally.
- In UI layers, convert technical errors into user-facing messages.
- Reset loading/error states predictably before each async attempt.
- Never swallow errors silently; return early only for intentional control-flow cases.

### Routing and Navigation

- Generate navigable practice routes from catalog metadata.
- Build hrefs using `getPracticeHref` instead of manual string duplication.
- Keep `NotFoundPage` route fallback in place.
- Maintain stable route shape: `/:category/:slug`.

### File Organization

- Keep feature-local helpers/types inside the feature folder unless reused elsewhere.
- Shared utilities belong in `src/lib/` or `src/components/ui/`.
- Avoid circular dependencies between `app/*` and `features/*`.
- Keep assets in `src/assets/` unless public-path behavior is explicitly required.

## Agent Workflow Expectations

- Before finalizing, run at least `npm run lint` and `npx tsc -b` for non-trivial code changes.
- If build-affecting changes were made, also run `npm run build`.
- If you add testing infrastructure, update `package.json` scripts and this file with exact single-test commands.
- Keep PR/commit scope focused; avoid unrelated refactors.

## Commit Workflow

- Keep commit-specific instructions compact in this file and store the detailed grouping/staging workflow in the `$group-changes-and-commit` skill.
- When the user asks to create commits, follow that skill before running `git commit`.
- Prefer Conventional Commits format when appropriate: `type(scope): summary`.

## Quick Checklist for Agents

- Confirm instructions from this file + any future Cursor/Copilot rule files.
- Respect catalog-driven architecture.
- Follow import/type/naming conventions.
- Run lint/type-check/build as applicable.
- Update AGENTS.md when conventions or commands change.
