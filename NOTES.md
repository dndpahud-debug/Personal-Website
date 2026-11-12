# Site notes

Where the personal site stands, the design decisions behind it, and what's next.

## What the site has now

A single page built with plain HTML, CSS, and JavaScript and no build step, ready for GitHub Pages. All text lives in `content.js`.

**Hero**
- "David Pahud" set huge across the full content width, with the headshot tucked between the two words as a tall rounded pill. "Pahud" is peach in dark mode.
- A bento grid below the name:
  - **Intro tile:** the one-line intro, the "View my work" and "Download resume" buttons, and email, LinkedIn, resume, and theme icons.
  - **Five shortcut tiles:** Experience (solid peach), About, Leadership, Ventures, and Contact. Each has a teaser line and an arrow, and scrolls smoothly to its section when clicked.
- A faint dot grid behind the hero.

**Body** (two columns on desktop)
- **Main column:**
  - About me: a story summary, with "Read more" opening the journey timeline from Los Baños to Thousand Oaks, plus languages and interests.
  - Experience: three roles, each with "Read more" for the resume bullets.
  - Leadership and campus involvement.
  - Education.
  - Ventures and achievements: REEF, ROLO, and the Philippines market entry, plus awards and certifications.
- **Sidebar:** skills chips, and a Highlights list that stays in view as you scroll.

**Footer and dock**
- **Reveal footer:** the page lifts away to uncover the contact footer. It has "Let's connect", an email field with copy and send buttons, section links, a Connect column, and a Based in column. A soccer ball bounces when the footer is uncovered.
- **Floating dock:** a small pill at the bottom center once you scroll past the hero. It holds email, LinkedIn, resume, the theme toggle, and back to top, and hides when the footer shows.

**Privacy**
- The page shows email and LinkedIn only. No phone number, home address, or visa status appears on the page.
- The downloadable resume PDF does include the phone number. That was approved.

## Design decisions

**Colors (60/30/10)**
- `#F7F9F8` off-white background (60%).
- `#0E2A2E` deep teal for text, dark surfaces, and the footer (30%).
- `#FFB38A` peach as the accent for buttons, highlights, and small details (10%).
- Peach is never used as text on the light background. Peach buttons get teal text, and on dark teal, peach can be text. That's why "Pahud" is teal in light mode.
- **Dark mode is the default.** It uses a deeper teal background (`#0A1F22`) with `#0E2A2E` and `#143539` surfaces. The site loads dark unless a visitor switches to light, and it remembers that choice.
- All text was checked for contrast. The lowest is about 4.7:1, which passes the accessibility standard.

**Font**
- Plus Jakarta Sans from Google Fonts, weights 400 to 800, for everything.
- Headings are tight and heavy at weight 800 with negative letter spacing.
- Section headings are sentence case with a small peach diamond in front. There are no small uppercase labels.

**Writing style**
- Plain, specific sentences. No "I turn X into Y" formulas.
- Details are written as short sentences, like "NoSongRequests.com, summer 2026.", never joined with middle dots.
- Nothing is invented. All facts come from the resume and the Personal Database.

**Effects** (all subtle, using spring easing through the CSS `linear()` curve)
- **Dot grid:** springs away from the cursor.
- **Letters:** each letter in the name does a small squash-and-stretch bounce on hover.
- **Magnetic buttons:** the hero buttons pull up to 10px toward a nearby cursor.
- **Tiles:** they lift and tilt up to about 2.5° toward the cursor.
- **Buttons:** a soft ripple spreads from the cursor on hover.
- **Read more:** expands with the bullets easing in one after another.
- **Scroll:** sections fade and rise in as you scroll.
- **Footer:** the page lifts to reveal it, and the ball bounces.
- **On phones and touch screens**, the dot grid and tilt are off and the hover effects don't apply.
- **With reduced motion turned on**, all motion is off.

**Layout**
- The arrangement follows joshwcomeau.com: a two-column feed with a sticky sidebar, entries that read like article excerpts with "Read more", and the same overall feel.
- Content width is 1100px. Below 900px the sidebar moves under the feed, with Highlights shown first.
- On phones:
  - The name sits on one line and the photo becomes a wide pill below it.
  - The tiles stack in one column, and the hero buttons go full width.

## Next changes

1. **Intro line.** Pick a replacement for the current "I turn market research and data into clear decisions" line:
   - **A:** "I'm a senior at Cal Lutheran studying business and global studies. Most of my recent work has been market research, reporting, and testing whether an idea is worth building."
   - **B (recommended):** "Senior at Cal Lutheran, graduating in 2027. This summer I sized the Philippine DJ market for a startup, and my research recommended holding off on expanding there."
   - **C:** "I grew up in the Philippines, played D1 soccer, and now study business at Cal Lutheran. These days I spend most of my time on market research, data reports, and campus events."
2. **Shortcut tile teasers.** Approve or edit the five draft teaser lines in `content.js` under `hero.shortcuts`.
3. **Optional detail under "Pahud".** A thin peach underline that draws in on page load was suggested, and it would also give light mode an accent. Not added yet.
4. **Interests.** Decide whether to keep "Forex trading" in the About section's interests.
5. **Go live.** Turn on GitHub Pages: Settings, then Pages, then deploy from the `main` branch at `/ (root)`. The site would be at https://dndpahud-debug.github.io/Personal-Website/.
6. **Reduced motion.** Test the site on a device with reduced motion turned on. It's handled in the code but hasn't been checked in a real browser.
