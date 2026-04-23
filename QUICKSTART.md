# 🚀 NEXTSEO Reddit Engine - Quick Start

## ⚡ 2-Minute Setup (Mock Mode - No Reddit Account Needed)

```bash
# 1. Install dependencies
npm install

# 2. Test all features (works without Reddit API)
npm run scan     # Find target subreddits
npm run post     # Generate stealth posts
npm run comment  # Simulate comment engagement

# 3. View results in console
```

**✅ You're done!** The engine works in mock mode for testing.

---

## 🔑 Production Setup (5 Minutes - Real Reddit Integration)

### Step 1: Get Reddit API Credentials
1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" → "script"
3. Fill out:
   - **Name:** `NEXTSEO Engine`
   - **Type:** `script`
   - **Redirect URI:** `http://localhost:8080` (not used)
4. Copy `client_id` (under app name) and `secret`

### Step 2: Configure Environment
```bash
# Copy template
cp .env.example .env

# Edit .env file with your credentials:
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_secret_here
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password
NEXTSEO_REFERRAL_URL=https://www.withnextseo.com/r/yourcode
```

### Step 3: Test Real Integration
```bash
# Test with real Reddit API
npm run scan     # Scan actual subreddits
npm run post     # Post to real Reddit
npm run comment  # Engage with real comments
```

---

## 📋 Available Commands

| Command | Description | Mock Mode | Real Mode |
|---------|-------------|-----------|-----------|
| `npm run scan` | Find high-value subreddits | ✅ Shows sample results | ✅ Scans real Reddit |
| `npm run post` | Create stealth posts | ✅ Shows post content | ✅ Posts to Reddit |
| `npm run comment` | Engage with comments | ✅ Shows replies | ✅ Comments on Reddit |

---

## ⚙️ Customization

### Change Target Keywords
Edit `src/config.ts`:
```typescript
searchKeywords: [
  'seo',           // Keep
  'ai marketing',  // Add
  'content',       // Add
],
```

### Change Posting Frequency
Edit `src/config.ts`:
```typescript
delays: {
  betweenSearches: 5 * 1000,    // 5 seconds
  betweenComments: 2 * 60 * 1000, // 2 minutes
},
```

---

## 🚀 Production Deployment

### Option 1: Local Machine
```bash
# Set up cron jobs (Linux/Mac)
crontab -e

# Add these lines:
0 9 * * * cd /path/to/project && npm run scan     # Daily at 9 AM
0 */4 * * * cd /path/to/project && npm run post   # Every 4 hours
0 */2 * * * cd /path/to/project && npm run comment # Every 2 hours
```

### Option 2: Cloud Server
- **Railway:** `railway up`
- **Render:** Connect GitHub repo
- **Vercel:** `vercel --prod`

---

## 📊 Monitoring & Earnings

- **Check logs** after each run
- **Monitor Reddit account** for activity
- **Track conversions** via NEXTSEO dashboard
- **Expected earnings:** $30/month per customer

---

## 🆘 Troubleshooting

**"Reddit API Error"**
- Check `.env` credentials
- Verify Reddit app is type "script"
- Wait 10 minutes after app creation

**"Command not found"**
- Run `npm install` first
- Use Node.js 18+

**"Rate limited"**
- Reddit allows 600 requests/hour
- Increase delays in config

---

## 📞 Support

- **Documentation:** https://github.com/furquankafil/nextseo-reddit-engine
- **Issues:** Open GitHub issue
- **NEXTSEO:** team@joinnextdev.com

---

**🎯 Ready to earn $30/month per customer? Let's automate!**</content>
<parameter name="filePath">c:\Users\admin\nextdev-projects\nextseo-reddit-engine\QUICKSTART.md