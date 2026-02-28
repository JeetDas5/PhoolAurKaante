# 🌸 Phool Aur Kaante

A fun compatibility analyzer for KIIT Fest 9.0! 💕

## What's This About?

**Phool Aur Kaante** lets you check romantic compatibility based on your birth dates. Just enter your KIITFest ID and both birthdays, and we'll analyze your personality traits and send you a detailed compatibility report via email!

It's a Valentine's Day experience built for KIIT Fest participants by Konnexions.

## ✨ Features

- ✅ **Verify Your KFID** - Makes sure you're a registered KIIT Fest participant
- 💗 **Personality Analysis** - Shows your personality archetype and traits
- 💑 **Compatibility Score** - Tells you how well you match with your partner
- 📧 **Email Results** - Get a beautiful report sent to your inbox
- 🎨 **Beautiful Design** - Animated background with floating hearts
- 📱 **Mobile Friendly** - Works great on phones and computers

## 🚀 Quick Start

### For Users (Running the App)

1. **Open the app** in your browser
2. **Enter your KFID** (your KIITFest participant ID)
3. **Enter both birthdays** in YYYY-MM-DD format (like 2000-12-25)
4. **Check your email** for your compatibility report!

That's it! 🎉

### For Developers (Setting Up)

**Prerequisites:**
- Node.js 18+ ([Get it here](https://nodejs.org))
- npm or yarn

**Installation:**
```bash
git clone https://github.com/JeetDas5/PhoolAurKaante.git
cd phoolaurkaante
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're ready to go!

## 📁 Project Overview

```
phoolaurkaante/
├── app/
│   ├── page.js          ← Main app (UI, forms, animations)
│   ├── actions.js       ← Backend logic (validation, emails)
│   ├── layout.js        ← Basic setup
│   └── globals.css      ← Styling & animations
├── mail/
│   └── zepto.js         ← Email templates
└── public/              ← Images & logos
```

**That's pretty much it!** The app is simple and focused on one job.

## 🤔 How It Works

1. You enter your KFID → We check with KIIT Fest (takes 1-2 seconds)
2. You enter your birthdays → We fetch compatibility analysis (takes 5-10 seconds)
3. System sends you an email with results → Check your inbox!

## 📖 Development

### Making Changes

**Change the UI?** → Edit `app/page.js`
**Change the styling?** → Edit `app/globals.css`
**Change email template?** → Edit `mail/zepto.js`

Changes auto-reload when you save (that's hot reload magic ✨).

### Testing

You can mock KFID validation for testing:

```javascript
// In app/actions.js, temporarily change validateKFID():
export async function validateKFID(kfid) {
  return {
    success: true,
    name: "Test User",
    email: "test@example.com"
  };
}
```

Then fill in birthdays and test the flow!

## 🆘 Common Issues

**"Invalid KFID"**
- Check your KFID is correct
- Make sure you've registered and paid for KIIT Fest

**"Not receiving email?"**
- Check your spam/junk folder
- Try a different email address to test

**Development not working?**
```bash
# Clear cache and reinstall:
rm -rf node_modules .next
npm install
npm run dev
```

**Environment variables needed?**
- Copy `.env.example` to `.env.local` (if it exists)
- Add any API keys you have

## 🚀 Deploy It

### On Vercel (Easiest)

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Connect your GitHub repo
4. Click "Deploy"
5. Done! 🎉

### DIY Hosting

```bash
npm run build
npm start
```

Server runs on port 3000.

## 📚 Tech Stack

- **Next.js 16** - Web framework
- **React 19** - UI library
- **TailwindCSS** - Styling
- **ZeptoMail** - Email service

## 🤝 Contributing

Found a bug? Want to add a feature? 

```bash
git checkout -b feature/your-idea
# Make your changes
git commit -m "Added something cool"
git push origin feature/your-idea
```

Then open a pull request!

Made with ❤️ by [Konnexions](https://www.konnexions.dev)

---

**Need Help?** Check [kiitfest.org](https://kiitfest.org) or contact the Web & Tech Team.
