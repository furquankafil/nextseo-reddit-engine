import { getRedditClient } from './client';
import { config } from '../config';

interface SubredditInfo {
  name: string;
  subscribers: number;
  activeUsers: number;
  description: string;
  relevanceScore: number;
}

export async function scanSubreddits(): Promise<void> {
  const reddit = getRedditClient();

  console.log('Scanning subreddits for high-value targets...\n');

  const results: SubredditInfo[] = [];

  for (const subredditName of config.targetSubreddits) {
    try {
      const subreddit = await reddit.getSubreddit(subredditName).fetch();

      const info: SubredditInfo = {
        name: subreddit.display_name,
        subscribers: subreddit.subscribers,
        activeUsers: subreddit.accounts_active,
        description: subreddit.public_description?.slice(0, 100) || '',
        relevanceScore: 0,
      };

      // Simple relevance scoring — customize this
      info.relevanceScore = calculateRelevance(info);
      results.push(info);

      console.log(`  r/${info.name} — ${info.subscribers.toLocaleString()} subscribers, ${info.activeUsers.toLocaleString()} active`);

      await sleep(config.delays.betweenSearches);
    } catch (error) {
      console.log(`  r/${subredditName} — failed to fetch`);
    }
  }

  // Sort by relevance
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  console.log('\n--- Top Subreddits by Relevance ---\n');
  for (const sub of results) {
    console.log(`  [${sub.relevanceScore}] r/${sub.name} (${sub.subscribers.toLocaleString()} subs, ${sub.activeUsers.toLocaleString()} active)`);
  }

  // TODO: Save results, find related subreddits, analyze post patterns
}

function calculateRelevance(info: SubredditInfo): number {
  let score = 0;

  // Prefer subreddits with moderate size (not too small, not too huge)
  if (info.subscribers > 10000 && info.subscribers < 500000) score += 3;
  else if (info.subscribers >= 500000) score += 1;

  // Active user ratio
  const activeRatio = info.activeUsers / info.subscribers;
  if (activeRatio > 0.005) score += 2;

  return score;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
