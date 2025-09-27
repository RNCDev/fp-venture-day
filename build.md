## Build and Deployment Guide (Eleventy + GitHub Pages)

Goals:
- Only edit `content.md` (human‑readable Markdown)
- Easy local preview with live reload
- Auto-build and deploy to `https://rncdev.github.io/fp-venture-day/` on push

This guide converts the repo to use Eleventy (11ty) to render `content.md` into `index.html`, with GitHub Actions handling deployment to Pages.


### 1) Prerequisites
- Node.js 18+ (LTS recommended)
- Git installed and GitHub repository access


### 2) One-time repository setup

1) Initialize Node and install Eleventy

```bash
npm init -y
npm install -D @11ty/eleventy
```

2) Add npm scripts to `package.json`

```json
{
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy"
  }
}
```

3) Tell Eleventy to render `content.md` as the site homepage

- Create `content.11tydata.json` alongside `content.md`:

```json
{
  "layout": "layouts/base.njk",
  "permalink": "index.html",
  "eleventyExcludeFromCollections": true
}
```

This makes Eleventy:
- Use `layouts/base.njk` to wrap `content.md`
- Output to `index.html` at the site root

4) Create the Eleventy layout

- Create `layouts/base.njk` and structure it like your current `index.html` shell (head, styles, header, footer). Where the page body should appear, insert `{{ content | safe }}`. Example minimal skeleton:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Venture Day Archives</title>
  <!-- Paste your existing <style> from index.html here -->
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="version">v2.6.0</div>
      <div class="supporters">
        <a href="https://blabscira.com/" target="_blank" class="supporter-link">B+LABS</a>
        <a href="https://www.wsgr.com/en/people/matthew-j-meyer.html" target="_blank" class="supporter-link">WILSON SONSINI</a>
      </div>
      <h1>Venture Day Archives</h1>
    </div>

    <div class="content">
      {{ content | safe }}
    </div>
  </div>

  <!-- Paste your existing <script> from index.html here if needed -->
</body>
</html>
```

Notes:
- You can copy your existing CSS and JS directly from `index.html` into this layout to preserve the look and feel.
- The `{{ content | safe }}` placeholder is where the Markdown from `content.md` is injected.

5) Keep editing only `content.md`

- No front matter required in `content.md` (the `.11tydata.json` file supplies layout and permalink).
- Continue writing normal Markdown. Eleventy converts it to HTML and injects into the layout.


### 3) Local development (preview and live reload)

```bash
npm run dev
```

- Open the local URL Eleventy prints (commonly `http://localhost:8080`).
- Save changes to `content.md` and the page will auto-reload.


### 4) GitHub Pages deployment (GitHub Actions)

1) Add workflow file

- Create `.github/workflows/pages.yml` with:

```yaml
name: Deploy Eleventy to GitHub Pages

on:
  push:
    branches: [ "main" ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci || npm install

      - name: Build site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: _site

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2) Enable GitHub Pages

- In the repository, go to: Settings → Pages
- Set Source to “GitHub Actions” (no branch selection needed with this workflow)

3) Push to deploy

- Commit and push your changes to `main`. The workflow builds with Eleventy and publishes the `_site` output to GitHub Pages.


### 5) Migrating the current HTML/CSS/JS into the layout

- Move the head `<style>…</style>` and the `<script>…</script>` from your existing `index.html` into `layouts/base.njk` so the site keeps its styling and behaviors.
- Ensure all asset paths are relative so the site works under `/fp-venture-day/`.
- After migration, you can delete the root `index.html` (Eleventy will generate a new one from `content.md`).


### 6) Optional: Preserve the “collapsible years” UI

The layout above injects plain Markdown. If you want to preserve the advanced card/accordion UI, use one of these options:

- Easiest: author HTML wrappers inside `content.md` (Markdown allows inline HTML). Example for one year section:

```html
<div class="year-section">
  <div class="year-header" onclick="toggleYear(this)">
    <span>2025</span>
    <span class="arrow">▶</span>
  </div>
  <div class="year-content">
    <div class="year-inner">

### 8:30am – 8:45am
**Opening Remarks**

### 8:45am – 9:15am
**Pranam Chatterjee**

    </div>
  </div>
</div>
```

- Advanced: create Eleventy shortcodes to render “session” blocks from concise Markdown. This keeps content readable but requires small additions in `.eleventy.js` and updating `content.md` to use the shortcodes.


### 7) Verification checklist
- `npm run dev` shows the site locally with your Markdown content
- Pushing to `main` runs the “Deploy Eleventy to GitHub Pages” workflow
- Pages settings are set to “GitHub Actions”
- Final site updates at `https://rncdev.github.io/fp-venture-day/`


### 8) Maintenance
- Day-to-day updates: edit `content.md` only
- Structural or style changes: edit `layouts/base.njk`
- No need to touch the workflow unless you change build tooling


