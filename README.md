# NEXTSEO Reddit Automation Engine

## What is NEXTSEO?

[NEXTSEO](https://www.withnextseo.com) is a fully automated AI blogging tool for businesses. For $99/mo, we set up and manage their entire blog — content generation, SEO optimization, and publishing. NEXTSEO helps businesses rank on Google, ChatGPT, Claude, and other AI search engines.

## Your Mission

Build a Reddit automation engine that sells NEXTSEO. You earn **$30/mo recurring commission** for each paying customer who signs up through your referral link.

- 10 customers = **$300/mo** in passive income
- 50 customers = **$1,500/mo** in passive income
- There is no cap on earnings

This isn't a one-time task — you're building a money-making machine that generates recurring revenue every month.

## Your Referral Link

You should have received an email with your unique referral link (format: `www.withnextseo.com/r/yourcode`).

We use **cookie-based tracking** — even if someone visits your link and comes back 2 weeks later, the sale is still attributed to you.

If you haven't received your link, email **team@joinnextdev.com**.

## Why Build Automation (Not Manual)?

- You're creating an asset that works for you 24/7
- NEXTSEO is doing **$10,000/mo** in sales, targeting **$100,000/mo** in 3 months
- Top affiliates will earn thousands monthly — this can become a full-time income
- You can reuse your automation engine for other affiliate products and clients

## Reddit Strategies

### Strategy 1 (Recommended): Stealth Posts

Post in relevant subreddits about how an AI blog tool gave you insane SEO results. **DO NOT name the tool in the post.** When people ask in the comments what tool it is, tell them to DM you. Drop your referral link in the DM.

This is the highest-converting method because it creates curiosity and demand. People who DM you are already interested — they convert at a much higher rate than cold traffic.

### Strategy 2: Comment Engagement

Find recent, relevant posts in subreddits where business owners discuss SEO, content marketing, blogging, or website traffic. Leave helpful comments that naturally mention NEXTSEO with your referral link. Focus on threads where people are actively asking for solutions.

## What to Build (3 Components)

### 1. Subreddit Scanner (`src/reddit/subredditScanner.ts`)

Find high-value subreddits where your target audience hangs out: SEO, SaaS, startups, small business, content marketing, blogging, entrepreneurship. Scan for post volume, engagement levels, and relevance.

### 2. Stealth Post Generator (`src/reddit/stealthPoster.ts`)

Create human-sounding posts about getting amazing SEO results from an AI blog tool — without naming it. Posts should read like genuine user experiences, not ads. Include compelling metrics (traffic growth, ranking improvements) that make people curious enough to ask what tool you used.

### 3. Comment Engager (`src/reddit/commentEngager.ts`)

Monitor relevant posts across target subreddits. Find threads where people ask about SEO tools, blogging solutions, or content marketing. Leave helpful, natural comments that include your referral link where appropriate.

## Technical Setup

### Reddit API

1. Go to https://www.reddit.com/prefs/apps
2. Click "create another app..." at the bottom
3. Select **"script"** as the app type
4. Set the redirect URI to `http://localhost:8080`
5. Note your **client ID** (under the app name) and **client secret**

### Getting Started

```bash
# Install dependencies
npm install

# Copy .env.example and fill in your credentials
cp .env.example .env

# Run the subreddit scanner
npx tsx src/index.ts scan

# Run the stealth poster
npx tsx src/index.ts post

# Run the comment engager
npx tsx src/index.ts comment
```

### Project Structure

```
src/
  index.ts              # Entry point — runs selected strategy
  config.ts             # Configuration (subreddits, keywords, settings)
  reddit/
    client.ts           # Reddit API client using snoowrap
    subredditScanner.ts # Strategy 0: Find high-value subreddits
    stealthPoster.ts    # Strategy 1: Generate stealth posts
    commentEngager.ts   # Strategy 2: Comment on relevant threads
```

You're free to use any language, framework, or approach — this scaffold is a starting point. Build on it, extend it, or rewrite it entirely.

## Tips for Success

- **Be genuine.** Reddit users can smell ads from a mile away. Your posts and comments should provide real value.
- **Vary your approach.** Don't post the same template repeatedly. Each post should feel unique.
- **Engage with replies.** When people comment on your posts, respond naturally. Build conversations.
- **Track what works.** Monitor which subreddits, post styles, and times of day generate the most DMs.
- **Respect subreddit rules.** Read the rules before posting. Getting banned defeats the purpose.
- **Think long-term.** Build karma and post history in your target subreddits before promoting anything.
