import { getRedditClient } from './client';
import { config } from '../config';

// Example post templates — make these your own
// The key: talk about RESULTS, never name the tool
const POST_TEMPLATES = [
  {
    subreddit: 'SEO',
    title: 'Our blog went from 0 to 12K organic visits/mo in 3 months — here is what we did',
    body: `I run a small B2B SaaS and we had zero blog presence. No content, no organic traffic, nothing.

3 months ago we started using an AI blogging tool that handles everything — topic research, writing, SEO optimization, publishing. We literally just set it up and let it run.

Results so far:
- 0 to 12,000 organic visits/month
- Ranking for 47 keywords on page 1
- 3 inbound leads directly from blog posts
- We spend maybe 10 minutes/month reviewing what it publishes

The craziest part is we started showing up in AI search results too (ChatGPT, Claude). Not just Google.

Happy to share more details about our setup if anyone is interested.`,
  },
  {
    subreddit: 'smallbusiness',
    title: 'Finally found a way to do content marketing without hiring a writer',
    body: `I have been putting off blogging for my business for over a year. Tried hiring freelance writers — expensive and the quality was hit or miss. Tried writing myself — gave up after 2 posts.

Found an AI tool that fully automates it. Not ChatGPT (tried that, the output needs too much editing). This is a managed service — they set up your blog, generate SEO-optimized posts automatically, and publish them on your domain.

Been using it for about 2 months now. Already seeing organic traffic come in for the first time ever. It costs way less than a freelance writer and the output is honestly better than what I was getting from humans.

If anyone wants to know what I am using, drop a comment or DM me.`,
  },
];

export async function createStealthPost(): Promise<void> {
  const reddit = getRedditClient();

  console.log('Stealth Post Generator');
  console.log('======================\n');

  // TODO: Implement your posting logic here
  // Ideas:
  // - Rotate through templates
  // - Use AI to generate unique variations
  // - Track which subreddits you have posted to recently
  // - Schedule posts for optimal times

  console.log('Available post templates:\n');
  for (let i = 0; i < POST_TEMPLATES.length; i++) {
    const template = POST_TEMPLATES[i];
    console.log(`  [${i}] r/${template.subreddit}: "${template.title}"`);
  }

  console.log('\nTo submit a post, implement the logic in this file.');
  console.log('Use reddit.getSubreddit(name).submitSelfpost({ title, text }) from snoowrap.\n');

  console.log('Remember:');
  console.log('  - NEVER name the tool in the post');
  console.log('  - Make it sound like a genuine experience');
  console.log('  - When people ask what tool, tell them to DM you');
  console.log('  - Drop your referral link in the DM');
  console.log(`  - Your referral link: ${config.referralUrl}`);
}
