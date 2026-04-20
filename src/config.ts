import 'dotenv/config';

export const config = {
  reddit: {
    clientId: process.env.REDDIT_CLIENT_ID || '',
    clientSecret: process.env.REDDIT_CLIENT_SECRET || '',
    username: process.env.REDDIT_USERNAME || '',
    password: process.env.REDDIT_PASSWORD || '',
    userAgent: `nextseo-engine:v1.0.0 (by /u/${process.env.REDDIT_USERNAME || 'unknown'})`,
  },

  referralUrl: process.env.NEXTSEO_REFERRAL_URL || 'https://www.withnextseo.com',

  // Subreddits to target — add, remove, or reorder based on what works
  targetSubreddits: [
    'SEO',
    'bigseo',
    'smallbusiness',
    'Entrepreneur',
    'startups',
    'SaaS',
    'contentmarketing',
    'blogging',
    'juststart',
    'digital_marketing',
    'growmybusiness',
    'marketing',
    'webdev',
    'indiehackers',
  ],

  // Keywords to search for when finding relevant posts to comment on
  searchKeywords: [
    'SEO tool',
    'blog tool',
    'AI blog',
    'content marketing tool',
    'automated blog',
    'rank on Google',
    'organic traffic',
    'blog for business',
    'SEO strategy',
    'content strategy',
    'AI SEO',
    'blog writing tool',
  ],

  // Rate limiting — respect Reddit's API limits
  delays: {
    betweenPosts: 10 * 60 * 1000,    // 10 minutes between posts
    betweenComments: 2 * 60 * 1000,   // 2 minutes between comments
    betweenSearches: 5 * 1000,        // 5 seconds between search queries
  },
};
