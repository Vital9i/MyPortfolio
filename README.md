# Vitalik Doyniak — Personal Landing Page

A high-converting, fully functional personal landing page for a digital marketing specialist. Built for lead generation, project showcasing, and client acquisition.

## Features

- **Hero** — Compelling headline, CTAs, animated background
- **About** — Bio, photo, scroll-in animation
- **Services** — Website Dev, Ads Setup, Video Content with hover effects
- **Projects** — 6 project cards with filter (Web / Ads / Video)
- **YouTube** — 3 embedded videos + 2 thumbnail links (expandable)
- **Testimonials** — Client quotes with results
- **Contact** — Form + WhatsApp, Telegram, Email buttons
- **SEO** — Meta tags, schema markup, semantic HTML
- **Responsive** — Mobile-first, smooth touch interactions

## Quick Start

1. Open `index.html` in a browser or deploy to any static host.
2. No build step required — pure HTML, CSS, JS.

## Customization Checklist

### Required Updates

| Item | Location | Notes |
|------|----------|-------|
| **Photo** | `#about .about-photo img` `src` | Replace placeholder with your photo URL |
| **YouTube Video IDs** | `#videos` section | Replace `VIDEO_ID_1`, `VIDEO_ID_2`, etc. with real IDs (e.g. `dQw4w9WgXcQ`) |
| **Project links** | `.project-link` `href` | Add real project URLs |
| **Project images** | `.project-image img` `src` | Replace placeholders with real screenshots |
| **WhatsApp number** | `.messenger-btn.whatsapp` `href` | Replace `1234567890` in `wa.me/1234567890` |
| **Telegram** | `.messenger-btn.telegram` `href` | Update `t.me/yourusername` |
| **Email** | `mailto:` and footer | Update email address |
| **Social links** | Footer and schema | LinkedIn, Telegram, YouTube URLs |
| **Domain** | Meta tags, canonical, schema | Replace `vitalikdoyniak.com` with your domain |

### Optional

- **Meta description** — Refine for your niche
- **Accent color** — Change `--color-primary` in `styles.css`
- **Form backend** — Connect form to Formspree, Netlify Forms, or your API

## YouTube Integration

- **Embeds:** Replace `VIDEO_ID_1`, `VIDEO_ID_2`, `VIDEO_ID_3` in the iframe `src` attributes.
- **Thumbnails:** For video cards, use `https://img.youtube.com/vi/YOUR_VIDEO_ID/mqdefault.jpg` as the image `src`.

## Deployment

Upload these files to any static host:

- `index.html`
- `styles.css`
- `script.js`

**Suggested hosts:** Netlify, Vercel, GitHub Pages, Cloudflare Pages.

## File Structure

```
Portfolio 2.0/
├── index.html    # Main page
├── styles.css    # All styles
├── script.js     # Interactions & form validation
└── README.md     # This file
```

## License

Private use. Replace placeholder content before publishing.
# MyPortfolio
