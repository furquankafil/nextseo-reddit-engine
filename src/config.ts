import Snoowrap from 'snoowrap';

export const config = {
  reddit: {
    clientId: process.env.REDDIT_CLIENT_ID || '',
    clientSecret: process.env.REDDIT_CLIENT_SECRET || '',
    username: process.env.REDDIT_USERNAME || '',
    password: process.env.REDDIT_PASSWORD || '',
    userAgent: `nextseo-engine:v1.0.0 (by /u/${process.env.REDDIT_USERNAME || 'unknown'})`,
  },
  searchKeywords: [
    'seo',
    'content marketing',
    'blogging',
    'traffic',
    'ranking',
    'small business',
    'entrepreneur',
    'startup',
    'saas',
  ],
  targetSubreddits: [
    'SEO',
    'smallbusiness',
    'Entrepreneur',
    'startups',
    'content_marketing',
    'Blogging',
  ],
  referralUrl: process.env.NEXTSEO_REFERRAL_URL || 'https://www.withnextseo.com/r/demo',
  delays: {
    betweenSearches: 5 * 1000,
    betweenComments: 2 * 60 * 1000,
  },
};

// ✅ Reddit client (IMPORTANT FIX)
export const reddit = new Snoowrap({
  userAgent: config.reddit.userAgent,
  clientId: config.reddit.clientId,
  clientSecret: config.reddit.clientSecret,
  username: config.reddit.username,
  password: config.reddit.password,
});