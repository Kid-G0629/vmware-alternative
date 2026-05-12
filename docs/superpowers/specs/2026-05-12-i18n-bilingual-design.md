# i18n Bilingual Support — vmalternatives.org

## Overview
Add English/Chinese bilingual support to the site, with English as the default language, a language switcher in the sidebar navigation, and automatic language detection via browser preferences.

## URL Structure
- `/` — English homepage (default locale, no prefix)
- `/zh/` — Chinese homepage
- `/news/` — English weekly list
- `/zh/news/` — Chinese weekly list
- `/news/:slug/` — English weekly article
- `/zh/news/:slug/` — Chinese weekly article
- `/blog/` — English blog list
- `/zh/blog/` — Chinese blog list
- `/blog/:slug/` — English blog post
- `/zh/blog/:slug/` — Chinese blog post

## Routing
- Use Astro's built-in i18n support: `defaultLocale: "en"`, `locales: ["en", "zh"]`, `prefixDefaultLocale: false`
- Restructure pages under `src/pages/[locale]/` using dynamic routing
- Each page returns both locale paths via `getStaticPaths()`

## Content Organization
```
src/content/news/en/*.md   — English weekly newsletters (created from original English sources)
src/content/news/zh/*.md   — Existing Chinese weekly newsletters
src/content/blog/en/**/*.md  — English blog posts
src/content/blog/zh/**/*.md  — Chinese blog posts
```

## i18n Strings
- Create `src/i18n/en.ts` and `src/i18n/zh.ts` for UI text
- Export `t(locale, key)` function for use in Astro components

## Layout Changes
- Both `Layout.astro` and `SidebarLayout.astro` need locale-aware navigation
- Language switcher in sidebar: flags + "English | 中文"
- Sidebar nav items and footer text localized

## Language Detection
- Client-side JavaScript on page load
- Check `navigator.language` and `localStorage` preference
- Show non-intrusive banner on English page for zh-preference users: "中文版本可用 →"
- Store choice in localStorage on manual switch
- IP-based detection is a stretch goal (requires external API, may add latency)

## Content Strategy for English
- Weekly newsletters: written from original English sources referenced in each issue
  - Keep the same structure (sections, editorial opinions)
  - Write for North American IT audience
  - No Chinese→English translation — write fresh in English
- Blog posts: similar approach, producing English versions based on original content
- Sidebar/UI text: direct translation matching the Chinese originals

## Astro Configuration
```js
i18n: {
  defaultLocale: "en",
  locales: ["en", "zh"],
  routing: { prefixDefaultLocale: false }
}
```

## Implementation Order
1. Restructure pages to `[locale]/` dynamic routing
2. Create `src/i18n/` translation system
3. Convert SidebarLayout.astro to use i18n + language switcher
4. Convert all pages to locale-aware versions
5. Create English weekly newsletter content (first 1-2 issues as pilot)
6. Test and verify both language versions
7. Add language detection JavaScript
