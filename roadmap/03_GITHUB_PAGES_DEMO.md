# 03 — GitHub Pages Demo

Harness Card V3 is a static local HTML app, so GitHub Pages is the simplest free demo host.

## 1. Enable Pages

In the GitHub repo:

```text
Settings
→ Pages
→ Source: Deploy from a branch
→ Branch: main
→ Folder: /root
→ Save
```

GitHub should generate a link like:

```text
https://YOURUSERNAME.github.io/harness-card-v3/
```

## 2. Test the live demo

Open the live link and test:

- page loads
- Full Harness works
- Mini Harness works
- Direct Correction works
- clipboard parser accepts pasted text
- generated card can be copied
- dashboard loads seed data
- export works
- import works

## 3. If GitHub Pages does not work

Backup options:

- Netlify Free
- Vercel Hobby
- local `index.html` download only

Do not add a backend just to host the demo.

## 4. Demo warning

When sharing the live demo, remind users:

```text
Do not paste private, sensitive, confidential, legal, medical, financial, proprietary, or personal information into any public feedback report.
```

The app is local-first, but public issue reports are public.
