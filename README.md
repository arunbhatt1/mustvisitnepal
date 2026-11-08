# Must Visit Nepal

Authentic, lightweight static website for a locally owned Himalayan trekking agency based in Thamel, Kathmandu.

<!-- Screenshot placeholder -->
```
+-----------------------------------------------------------------------+
|  MUST VISIT NEPAL             Registered Himalayan Trekking Agency    |
|  Home | Who are we? | What we offer | Blogs | Connect with us         |
|-----------------------------------------------------------------------|
|  [ NATURALLY NEPAL - High Mountain Walking with Local Guides ]        |
|                                                                       |
|  Langtang Valley Trek (7d) | Annapurna Base Camp (10d) | EBC (14d)    |
+-----------------------------------------------------------------------+
```

## Live Demo
- **GitHub Pages:** [https://arunbhatt1.github.io/mustvisitnepal/](https://arunbhatt1.github.io/mustvisitnepal/) *(configured from branch `main` root)*

---

## Key Features

1. **Grounded Editorial Design:** Hand-crafted aesthetic reflecting an authentic Nepali trekking agency. Built with a strict warm palette, Bitter slab-serif headings, Source Sans 3 body copy, and Mukta for Nepali Devanagari text. Zero generic AI template patterns, zero gradients, and zero artificial glow.
2. **Vanilla Static Architecture:** Pure HTML5, modern CSS3, and vanilla ES6+ JavaScript. No build steps, no runtime frameworks, and no external CDNs required.
3. **Data-Driven Trek Pages:** Single dynamic template (`trek.html?slug=...`) powered by `data/treks.json` with comprehensive itineraries, high-altitude acclimatization stages, permit requirements, and inclusion breakdowns for Langtang, Annapurna, Everest, and Tilicho Lake.
4. **Accessible Forms & Shared Validation:** `js/forms.js` provides centralized, accessible client-side validation for reservations (`booking.html`), inquiries (`contact.html`), and newsletter subscriptions (`#newsletter-form`). Real-time error clearing on input, accessible `aria-invalid` and `aria-live` announcements, and inline confirmation states.
5. **Optimized Imagery:** Dual WebP and JPEG fallback via `<picture>` tags. All package photos compressed to under 120 KB and banner under 200 KB. Original high-resolution photos are preserved in `images/originals/` (gitignored).
6. **Mobile-First & Responsive:** CSS Grid layout supporting seamless viewing across 360px mobile, 768px tablet, and 1280px+ desktop viewports with a pure accessible hamburger navigation toggle.

---

## Directory Structure

```
.
├── index.html              # Homepage with hero banner, route grid, and agency rhythm
├── trek.html               # Dynamic single trek route template (?slug=langtang|annapurna|everest|tilicho)
├── booking.html            # Trekking reservation request form with ?package= prefill
├── contact.html            # Contact inquiry form and Thamel office map embed
├── about.html              # Who are we? Background, ethics, and field team
├── offers.html             # What we offer: services, package comparison, season guide
├── blog.html               # Field notes: Pikey Peak, Mohare Danda, regulations, December advice
├── favicon.svg             # Hand-crafted Himalayan mountain peak SVG favicon
├── data/
│   └── treks.json          # Structured route data, day-by-day itineraries, and permits
├── css/
│   └── style.css           # 7-color variable design tokens, responsive typography, and layout reset
├── js/
│   ├── main.js             # Partial injection, route rendering, active nav, and newsletter
│   └── forms.js            # Shared validation engine for booking, contact, and newsletter
├── partials/
│   ├── header.html         # Shared site header, accessible skip link, and navigation
│   └── footer.html         # Plain, dense 3-column footer with official Nepal government resources
├── fonts/                  # Self-hosted WOFF2 font subsets (Bitter, Source Sans 3, Mukta)
├── images/                 # Optimized WebP and JPG assets (<=120KB / <=200KB banner)
│   └── originals/          # Uncompressed source photos (gitignored)
├── CHANGELOG_AGENT.md      # Comprehensive audit report of all refactoring stages and commits
├── CONTENT_TODO.md         # Local price and municipal permit verification checklist
├── IMAGE_CREDITS.md        # Image source attributions and licensing documentation
├── .gitignore              # Ignores originals, dependencies, OS artifacts, and editor folders
└── README.md
```

---

## How to Run and View the Site Locally

Because modern web browsers restrict `fetch()` requests on the `file:///` protocol (CORS), run a lightweight local HTTP server to view dynamic partial injections and JSON data:

### Option 1: Using `npx serve` (recommended)
```powershell
npx serve .
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 2: Using Python 3
```powershell
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser.

### Option 3: VS Code Live Server
Right-click `index.html` inside VS Code and select **"Open with Live Server"**.

*(Note: Even if opened directly via `file://`, the site includes full semantic fallback content and navigation in every page).*

---

## Connecting Live Form Endpoints

Client-side validation validates inputs, clears errors dynamically, and renders inline success notifications without page reloads.

To forward inquiries and reservations to an email inbox:
1. Register a form on [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/platform/core/forms/).
2. Set the `action` attribute on `<form id="booking-form">` or `<form id="contact-form">`:
   ```html
   <form id="booking-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. In `js/forms.js` / inline handlers, submit via `fetch(form.action, { method: 'POST', body: new FormData(form) })` before displaying the inline success confirmation.

---

## GitHub Pages Deployment

To publish this website on GitHub Pages:
1. Merge the `revamp` branch into `main`.
2. Navigate to your GitHub repository **Settings** &rarr; **Pages**.
3. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: **main**, Folder: **/ (root)**
4. Click **Save**. Your site will be published at `https://<username>.github.io/<repo-name>/`.
