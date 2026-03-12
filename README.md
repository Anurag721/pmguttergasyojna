# 🚽 प्रधानमंत्री Gutter Gas योजना

**pmguttergasyojna.com** — A satirical website on India's energy policy failures.

> In 2018, PM Modi told Indians they could cook using gas from gutters.  
> In 2026, Indians can't cook at all.  
> Connect the dots.

---

## 🚀 Deploy to Vercel (Quickest Method)

### Option A: One-Click via GitHub
1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → "New Project"
3. Import the GitHub repo
4. Vercel auto-detects Vite — just click **Deploy**
5. Once deployed, go to **Settings → Domains** → Add `pmguttergasyojna.com`
6. Update your domain's DNS:
   - Add an **A record** pointing to `76.76.21.21`
   - Or add a **CNAME record** pointing to `cname.vercel-dns.com`

### Option B: Vercel CLI
```bash
npm install -g vercel
cd pmguttergasyojna-deploy
vercel
# Follow the prompts. Then:
vercel --prod
```

---

## 🖼️ OG Image (Social Media Preview)

Social platforms need a PNG image for link previews. To generate yours:

1. Open `public/og-image-generator.html` in Chrome
2. Set browser window to **1200×630px** (use DevTools → responsive mode)
3. Take a screenshot
4. Save as `public/og-image.png`
5. Redeploy

Or use an online tool like [htmlcsstoimage.com](https://htmlcsstoimage.com) to convert the HTML to PNG.

---

## 🛠️ Local Development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`

---

## 📁 Project Structure

```
├── index.html              # Entry point with OG meta tags + SEO
├── package.json            # Vite + React dependencies
├── vite.config.js          # Vite configuration
├── vercel.json             # Vercel deployment config
├── public/
│   ├── og-image.svg        # OG image (SVG version)
│   └── og-image-generator.html  # Screenshot this for PNG OG image
└── src/
    ├── main.jsx            # React entry point
    └── App.jsx             # Full website component
```

---

## ⚖️ Legal

This is **political satire** protected under **Article 19(1)(a)** of the Indian Constitution — the fundamental right to freedom of speech and expression.

All factual claims are sourced from verified news reports: CNBC, The Week, Business Today, ANI, Zee News, Newslaundry, Al Jazeera, Scroll.in, and official government press releases.

---

## 🇮🇳 Share

Because the government has been censoring social media posts about the LPG crisis.  
Share this website while you still can.

**pmguttergasyojna.com** — हर नाले से, हर घर तक
