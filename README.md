# Owen & Lott website

Static landing page for Owen & Lott, a Shopify and e-commerce studio. Plain HTML, CSS and a small amount of JavaScript. No build step, no dependencies.

## Structure

```
.
├── index.html            Landing page (all sections)
├── 404.html              Not found page (absolute paths, needs a domain root)
├── privacy/index.html    Privacy policy template (served at /privacy/)
├── css/styles.css        All styles, design tokens at the top (:root)
├── js/main.js            Progressive enhancement for the forms only
├── assets/
│   ├── fonts/            Self-hosted DM Serif Display and DM Sans (woff2)
│   ├── favicon.svg       Favicon (+ favicon-32.png, apple-touch-icon.png)
│   ├── icon-192.png      Web app icons
│   ├── icon-512.png
│   └── og-image.png      Social sharing image, 1200x630
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── _headers              Security and cache headers (Netlify, Cloudflare Pages)
└── CLAUDE.md             Instructions for Claude Code
```

## Run locally

Any static server works. From this folder:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Open http://localhost:8080.

## Before launch

1. **Replace placeholders.** Everything unfinished is marked with the `ph` class and square brackets, shown with a yellow highlight. List them all:
   ```bash
   grep -rn 'class="ph"\|\[[A-Z][^]]*\]' --include=*.html .
   ```
   Remove the `ph` class from each element after filling it in.
2. **Domain.** Replace `https://owenandlott.com` if the real domain differs. It appears in `index.html` (canonical, Open Graph, JSON-LD), `privacy/index.html`, `robots.txt`, `sitemap.xml`.
3. **Contact form.** Both forms post to `https://formspree.io/f/YOUR_FORM_ID`. Create a form at formspree.io, copy its ID, and replace `YOUR_FORM_ID` in `index.html` (two places). Until then the forms show a clear "not connected" message. On Netlify you can use Netlify Forms instead: add `data-netlify="true"` and a `name` to each form, and remove the Formspree URL and the `_gotcha` field.
4. **Links marked TODO.** Calendar booking link, LinkedIn and Instagram profiles, founders' emails.
5. **Images.**
   - Client logos: `assets/clients/`, SVG preferred.
   - Case study screenshots: `assets/cases/`, WebP, set `width` and `height` to the real size.
   - Founder photos: `assets/team/`, WebP.
   Each placeholder has an `<img>` example in a comment next to it. Keep `loading="lazy"` and `decoding="async"` on everything below the first screen.
6. **Privacy policy.** Have it reviewed and completed by a lawyer.
7. **Prices and budget ranges.** The budget options in the contact form are illustrative (EUR). Adjust them.

## Deploy

| Host | Notes |
| --- | --- |
| Cloudflare Pages / Netlify | Connect the repo, no build command, publish directory `/`. `_headers` is applied automatically. |
| GitHub Pages | Works, but `_headers` is ignored and a project site (`user.github.io/repo/`) breaks the absolute paths in `404.html` and `site.webmanifest`. Use a custom domain at the root. |

## Performance and SEO decisions

- Fonts are self-hosted (no third-party requests), `font-display: swap`, split into latin and latin-ext with `unicode-range`, and the three critical files are preloaded.
- One CSS file and one deferred script. No frameworks, no inline styles, so a strict Content Security Policy is possible.
- Icons are an inline SVG sprite, the hero mockup is pure CSS. The page makes no image request above the fold.
- One `h1`, a logical heading order, landmarks (`header`, `nav`, `main`, `footer`), sections labelled with `aria-labelledby`.
- Skip link, visible focus ring, labelled form fields with `autocomplete`, form status announced through `role="status"`, `prefers-reduced-motion` respected.
- Title, description, canonical, Open Graph, Twitter card, JSON-LD (`WebSite`, `ProfessionalService`), `robots.txt`, `sitemap.xml`.

## Checks

```bash
npx html-validate index.html 404.html privacy/index.html
npx lighthouse http://localhost:8080 --view
```
