# Owen & Lott website

Static marketing site for a Shopify and e-commerce studio. Plain HTML, CSS and vanilla JS. No build step. Keep it that way unless asked.

## Rules

- Semantic HTML first: landmarks, one `h1`, headings in order, `button` for actions and `a` for navigation.
- Accessibility is a requirement: every form control has a visible `label`, images have meaningful `alt` (or `alt=""` if decorative), focus styles stay visible, colour contrast meets WCAG AA, content works without JavaScript.
- Performance budget: no third-party scripts, fonts or CSS. No inline `style` attributes or inline scripts (the CSP in `_headers` forbids them). Images below the fold use `loading="lazy"`, all images have `width` and `height`.
- SEO: keep the `title`, `description`, canonical and Open Graph tags in sync when copy changes. Add new pages to `sitemap.xml`.
- Styling lives in `css/styles.css`. Use the tokens in `:root` instead of hard-coded colours.
- Copy is in English, plain and specific. No invented client names, numbers or testimonials: use `<span class="ph">[Placeholder]</span>` until real data exists.
- Do not use em dashes in copy.

## Brand

- Colours: green `#17432F`, deep green `#0F2F20`, cream `#F7F8F5`, gold `#D4A72C`.
- Fonts: DM Serif Display for headings and the wordmark (gold italic ampersand), DM Sans for everything else.
- Logo: a striped gold and green shop awning in a circle. The mark is defined once as `<symbol id="logo-mark">` in each page and reused with `<use>`.

## Verify before committing

```bash
python3 -m http.server 8080 &
npx html-validate index.html 404.html privacy/index.html
npx lighthouse http://localhost:8080 --only-categories=performance,accessibility,seo,best-practices
```

Find unfinished content: `grep -rn 'class="ph"' --include=*.html .`
