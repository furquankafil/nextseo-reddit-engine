import { getRedditClient } from './client';
import { config } from '../config';

interface RelevantPost {
  id: string;
  subreddit: string;
  title: string;
  url: string;
  score: number;
  numComments: number;
  createdUtc: number;
}

export async function engageWithComments(): Promise<void> {
  const reddit = getRedditClient();

  console.log('Comment Engager');
  console.log('===============\n');
  console.log('Searching for relevant posts to comment on...\n');

  const relevantPosts: RelevantPost[] = [];

  for (const keyword of config.searchKeywords.slice(0, 5)) {
    try {
      console.log(`  Searching: "${keyword}"`);

      const results = await reddit.search({
        query: keyword,
        sort: 'new',
        time: 'week',
        limit: 10,
      });

      for (const post of results) {
        // Skip old posts and posts with too many comments (harder to stand out)
        const ageHours = (Date.now() / 1000 - post.created_utc) / 3600;
        if (ageHours > 48 || post.num_comments > 50) continue;

        relevantPosts.push({
          id: post.id,
          subreddit: post.subreddit.display_name,
          title: post.title,
          url: `https://reddit.com${post.permalink}`,
          score: post.score,
          numComments: post.num_comments,
          createdUtc: post.created_utc,
        });
      }

      await sleep(config.delays.betweenSearches);
    } catch (error) {
      console.log(`  Failed to search for "${keyword}"`);
    }
  }

  // Deduplicate by post ID
  const unique = [...new Map(relevantPosts.map(p => [p.id, p])).values()];

  // Sort by recency
  unique.sort((a, b) => b.createdUtc - a.createdUtc);

  console.log(`\nFound ${unique.length} relevant posts:\n`);

  for (const post of unique.slice(0, 15)) {
    const ageHours = Math.round((Date.now() / 1000 - post.createdUtc) / 3600);
    console.log(`  r/${post.subreddit} (${ageHours}h ago, ${post.numComments} comments)`);
    console.log(`    "${post.title}"`);
    console.log(`    ${post.url}\n`);
  }

  console.log('To leave a comment, implement the logic in this file.');
  console.log('Use reddit.getSubmission(id).reply(text) from snoowrap.\n');

  console.log('Tips for comments:');
  console.log('  - Be genuinely helpful first, promotional second');
  console.log('  - Answer their question, then mention the tool naturally');
  console.log('  - Keep it conversational, not sales-y');
  console.log(`  - Your referral link: ${config.referralUrl}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
