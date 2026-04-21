import { getRedditClient, sleep } from './client';
import { config } from '../config';

interface PostTemplate {
  subreddit: string;
  title: string;
  body: string;
}

// 🔥 Better, more natural templates
const POST_TEMPLATES: PostTemplate[] = [
  {
    subreddit: 'Entrepreneur',
    title: 'We went from almost zero traffic to consistent organic growth in a few months',
    body: `I run a small online business and honestly ignored SEO for a long time.

A few months ago we started focusing on content properly. Instead of writing manually, we switched to a system that helps with topic research + content generation.

Results so far:
- steady increase in organic traffic
- starting to rank for long-tail keywords
- finally getting inbound leads

Still early, but definitely working better than what we were doing before.

Curious — what’s working for you guys right now?`,
  },
  {
    subreddit: 'smallbusiness',
    title: 'Content marketing finally started working for my business',
    body: `I used to think blogging was a waste of time.

Tried freelancers → expensive  
Tried writing myself → inconsistent  

Recently switched to a more automated approach for content and it actually started bringing results.

Not massive numbers yet, but at least now I see traffic coming in consistently.

Anyone else seeing results with content marketing lately?`,
  },
];

// 🎯 smarter random selection
function getRandomTemplate(): PostTemplate {
  return POST_TEMPLATES[Math.floor(Math.random() * POST_TEMPLATES.length)];
}

export async function createStealthPost(): Promise<void> {
  const reddit = getRedditClient();

  console.log('📝 Starting stealth posting...\n');

  const template = getRandomTemplate();

  console.log(`🎯 Target subreddit: r/${template.subreddit}`);
  console.log(`📌 Title: ${template.title}\n`);

  try {
    // ⏱️ random delay (30–60 sec)
    await sleep(30000 + Math.random() * 30000);

    await reddit.getSubreddit(template.subreddit).submitSelfpost({
      title: template.title,
      text: template.body,
    });

    console.log('✅ Post submitted successfully\n');
  } catch (err) {
    console.error('❌ Error posting:', err);
  }

  console.log('⚠️ Next steps:');
  console.log('- Do NOT post again immediately');
  console.log('- Reply to comments manually');
  console.log(`- Share your link in DM: ${config.referralUrl}`);
}