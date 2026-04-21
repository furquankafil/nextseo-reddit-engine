import { getRedditClient, sleep } from "./client";
import { config } from "../config";

const KEYWORDS = ["seo", "blog", "traffic", "ranking", "content"];
const MAX_REPLIES = 3;

export async function engageWithComments() {
  console.log("💬 Starting comment engine...\n");

  const reddit = getRedditClient();
  let replyCount = 0;

  for (const subreddit of config.targetSubreddits) {
    console.log(`\n🔎 Checking r/${subreddit}...`);

    const posts = await reddit.getSubreddit(subreddit).getNew({ limit: 10 });

    for (const post of posts) {
      if (replyCount >= MAX_REPLIES) {
        console.log("⛔ Reply limit reached");
        return;
      }

      const title = post.title.toLowerCase();

      if (!KEYWORDS.some((k) => title.includes(k))) continue;

      if (post.author?.name === config.reddit.username) continue;

      console.log("🎯 Found:", post.title);

      const replies = [
        `I had a similar issue. What helped me was using an AI blogging tool to scale content faster. It improved my rankings over time. You can check it here: ${config.referralUrl}`,

        `SEO can be slow, but I started using an AI content tool and it made things easier. Helped me stay consistent. Sharing in case it helps: ${config.referralUrl}`,

        `I struggled with this too initially. I switched to an AI blogging tool and saw better results after a few weeks. You can check it here: ${config.referralUrl}`,
      ];

      const reply = replies[Math.floor(Math.random() * replies.length)];

      await sleep(config.delays.betweenComments + Math.random() * 30000);

      try {
        await post.reply(reply);
        console.log("✅ Replied successfully\n");

        replyCount++;
      } catch (err) {
        console.error("❌ Error replying:", err);
      }
    }
  }

  console.log(`🎉 Total replies: ${replyCount}`);
}