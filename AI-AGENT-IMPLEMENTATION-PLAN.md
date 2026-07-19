# Implementation Plan — Jeans Landing Page

## 1. Project Overview
A single landing page for an e-commerce store selling jeans. The page is built section by section, based on Figma designs provided by the project owner (one link per section). The stack is **Next.js + Tailwind CSS**.

## 2. Non-negotiable Rules for the AI Agent

1. **Pixel-perfect first.** Every section must visually match the provided Figma link as closely as possible: spacing, font sizes, font weights, alignment, border-radius, shadows, breakpoints — everything.
2. **Colors: use only `globals.css`.**
   - Never hardcode a hex/rgb color in a component.
   - Every color must come from the CSS variables / Tailwind theme tokens already defined in `globals.css`.
   - If a needed color is genuinely missing from `globals.css`, stop and ask instead of inventing one.
3. **Images & Icons: never fetch or generate them.**
   - If a section needs an image or icon, do not source, generate, or download it.
   - Instead, list exactly what's needed (e.g. "hero image 1920x800", "cart icon", "size-guide illustration") and leave a placeholder (`<div>` with a comment, or a placeholder `src`), then ask the user to provide the asset.
4. **Reusability is mandatory.**
   - Before building anything, check the existing `/components` folder.
   - If a component already exists (Button, Input, Card, Badge, Accordion, etc.), reuse it — do not rebuild a similar version.
   - Only create a new reusable component if nothing existing fits. Keep it generic (props-driven), not hardcoded to one section.
5. **Responsiveness is mandatory** for every section: mobile, tablet, desktop — matching Figma breakpoints if provided, otherwise standard Tailwind breakpoints (`sm`, `md`, `lg`, `xl`).
6. **Bilingual support (English / Arabic) is mandatory for every section:**
   - Use `next-intl` (or the i18n setup already present in the project — check first before adding a new library).
   - No hardcoded UI text in components; all text comes from translation files (`en.json` / `ar.json`).
   - Support full **RTL** layout for Arabic (use `dir="rtl"` logic, logical Tailwind classes like `ps-*`/`pe-*`/`ms-*`/`me-*` instead of `pl-*`/`pr-*`/`ml-*`/`mr-*` where direction matters).
   - Numbers, prices, and currency formatting should respect locale.
7. **Packages:** free to use common/standard packages as needed. But if the user names a specific package for a task (e.g. "use `react-hook-form` for this form"), that exact package must be used — don't substitute it with an alternative.
8. **Scope discipline:** work only on the section/task being described in the current message. Do not refactor, "improve", or touch unrelated sections/files unless asked.
9. **Token efficiency:** don't re-explain these rules back to the user, don't over-narrate reasoning — just implement, and ask only when something is truly missing (color token, asset, or ambiguous spec).

## 3. Per-Section Workflow
For every new section the user sends a Figma link for:

1. Read the Figma design for that section only.
2. Check `/components` for anything reusable before writing new markup.
3. Build the section as a component under `/components/sections/[section-name].tsx` (or the existing project convention — check first).
4. Wire up text via the translation files (`en.json` / `ar.json`) — add new keys, don't hardcode strings.
5. Apply colors strictly from `globals.css` tokens.
6. Make it responsive across breakpoints.
7. Verify RTL behavior (mirror spacing/icons/alignment correctly for Arabic).
8. List any missing images/icons/assets needed, and ask for them — do not fetch or fake them.
9. Add the section into the page composition (e.g. `app/page.tsx`) in the correct order once confirmed.

## 4. Definition of Done (per section)
- [ ] Matches Figma pixel-for-pixel (spacing, typography, colors, radius, states)
- [ ] Fully responsive (mobile / tablet / desktop)
- [ ] All colors sourced from `globals.css`, none hardcoded
- [ ] All text pulled from `en.json` / `ar.json`, works correctly in both LTR and RTL
- [ ] Reuses existing components where applicable; any new component is generic/reusable
- [ ] No images/icons invented or fetched — missing assets clearly listed instead
- [ ] No unrelated files/sections modified
- [ ] Only approved/specified packages used

## 5. Notes
- If a Figma link is missing details (e.g. hover/active states, exact spacing at a breakpoint not shown), make the closest reasonable match to the nearest breakpoint shown and flag the assumption briefly — don't block on it.
- If uncertain whether something is "reusable component territory" vs "one-off," default to making it a component under `/components/ui/` if it's a simple visual element (button, badge, input, tag), or `/components/sections/` if it's page-structure specific.