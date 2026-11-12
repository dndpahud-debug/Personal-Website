# Personal Website

David Pahud's personal site. It's plain HTML, CSS, and JavaScript, with no build step, and it's hosted free on GitHub Pages.

## Editing the content

**All text lives in [`content.js`](content.js).** Open it, change the words between the quotes, and save. You don't need to touch the HTML, CSS, or JS.

- **Add an item** (a job, a leadership role, a venture, an award): copy one whole `{ ... }` block, paste it after a comma, and edit it.
- **Remove an item:** delete its `{ ... }` block and the comma after it.
- **Swap the photo:** replace `assets/headshot.jpg`. A square image about 640px wide works best.
- **Update the resume:** replace `assets/David-Pahud-Resume.pdf` and keep the same file name.

## Previewing locally

Double-click `index.html`, or run a tiny local server:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Publishing changes

```bash
git add . && git commit -m "Update site" && git push
```

GitHub Pages updates the live site within a minute or two.

## Turning on GitHub Pages (one time)

In the repo on GitHub, go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then pick `main` and `/ (root)`, and click Save. The site will be live at:

https://dndpahud-debug.github.io/Personal-Website/

## Files

| File | What it is |
|---|---|
| `content.js` | All site text: **edit this** |
| `index.html` | Page structure |
| `styles.css` | Colors, layout, animations, light and dark themes |
| `main.js` | Builds the page from `content.js` and handles the interactions |
| `assets/` | Headshot, resume PDF, favicon |
