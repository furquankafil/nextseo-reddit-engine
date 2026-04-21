import { getRedditClient, sleep } from './client';
import { config } from '../config';

interface SubredditInfo {
  name: string;
  subscribers: number;
  activeUsers: number;
  description: string;
  relevanceScore: number;
}

function calculateRelevance(info: SubredditInfo): number {
  let score = 0;

  const name = info.name.toLowerCase();
  const desc = info.description.toLowerCase();

  // 🎯 Keyword relevance (IMPORTANT)
  for (const keyword of config.searchKeywords) {
    const k = keyword.toLowerCase();
    if (name.includes(k) || desc.includes(k)) {
      score += 3;
    }
  }

  // 👥 Subscriber size (sweet spot)
  if (info.subscribers > 10000 && info.subscribers < 300000) {
    score += 3;
  } else if (info.subscribers >= 300000) {
    score += 1;
  }

  // ⚡ Activity ratio
  const activeRatio = info.activeUsers / info.subscribers;
  if (activeRatio > 0.01) score += 3;
  else if (activeRatio > 0.005) score += 2;

  return score;
}

export async function scanSubreddits() {
  console.log("🔍 Scanning for high-value subreddits...\n");

  const client = getRedditClient();
  const results: SubredditInfo[] = [];

  // Search for subreddits using keywords
  for (const keyword of config.searchKeywords) {
    try {
      const searchResults = await client.searchSubreddits({
        query: keyword,
        limit: 10
      });

      for (const subreddit of searchResults) {
        const info = await subreddit.fetch();
        const subredditInfo: SubredditInfo = {
          name: info.display_name,
          subscribers: info.subscribers,
          activeUsers: info.active_user_count || 0,
          description: info.public_description || '',
          relevanceScore: calculateRelevance({
            name: info.display_name,
            subscribers: info.subscribers,
            activeUsers: info.active_user_count || 0,
            description: info.public_description || '',
            relevanceScore: 0
          })
        };

        results.push(subredditInfo);
        await sleep(config.delays.betweenSearches);
      }
    } catch (error) {
      console.error(`Error searching for "${keyword}":`, error);
    }
  }

  // Sort by relevance score
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Display top results
  console.log("🏆 Top subreddits found:\n");
  for (let i = 0; i < Math.min(10, results.length); i++) {
    const sub = results[i];
    console.log(`${i + 1}. r/${sub.name}`);
    console.log(`   Subscribers: ${sub.subscribers.toLocaleString()}`);
    console.log(`   Active users: ${sub.activeUsers}`);
    console.log(`   Relevance score: ${sub.relevanceScore}/10`);
    console.log(`   Description: ${sub.description.slice(0, 100)}...`);
    console.log('');
  }
}