# Ahmed Layouni · Portfolio

Personal portfolio website (English / French), plain HTML, CSS and JavaScript. No build step.

## Files

| File | What it is |
|---|---|
| `index.html` | All the content, in English |
| `i18n.js` | French translations (same keys as the `data-i18n` attributes in `index.html`) |
| `styles.css` | Design |
| `script.js` | Language switch, mobile menu, animations, certificate viewer |
| `*.jpg`, `*.pdf`, `favicon.svg` | Photo, certificates, CV, favicon (everything sits in one folder, no subfolders) |

## Common edits

- **CVs:** the English page links to `Ahmed_Layouni_CV_EN.pdf`, the French page to `Ahmed_Layouni_CV_FR.pdf`. To update one, upload a new file with exactly the same name. If the French CV is missing, the French page falls back to the English one.
- **Change a sentence:** edit it in `index.html` (English) and in `i18n.js` (French) under the same key.
- **Add a certificate:** put the image next to `index.html`, then copy one `<button class="cert">…</button>` block in `index.html`.
- **Force a language in a link:** `https://your-site.vercel.app/?lang=fr`

## Run locally

Open `index.html` in a browser, or run `python -m http.server` in this folder and go to http://localhost:8000.

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. On vercel.com → **Add New… → Project** → import the repository.
3. Framework preset: **Other**. Leave build command and output directory empty.
4. Click **Deploy**. Every new push to `main` redeploys automatically.
