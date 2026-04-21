// 🎭 Mock Reddit Client for local testing
// This simulates Reddit API responses without needing real credentials

export const mockRedditClient = {
  // Mock subreddit search
  searchSubreddits: async (query: { query: string; limit: number }) => {
    console.log(`📦 [MOCK] Searching subreddits for: "${query.query}"\n`);
    
    return [
      {
        display_name: 'SEO',
        subscribers: 250000,
        active_user_count: 2500,
        public_description: 'Search Engine Optimization discussion and tips',
        fetch: async () => ({
          display_name: 'SEO',
          subscribers: 250000,
          active_user_count: 2500,
          public_description: 'Search Engine Optimization discussion and tips',
        }),
      },
      {
        display_name: 'smallbusiness',
        subscribers: 450000,
        active_user_count: 4500,
        public_description: 'Small business owners and entrepreneurs',
        fetch: async () => ({
          display_name: 'smallbusiness',
          subscribers: 450000,
          active_user_count: 4500,
          public_description: 'Small business owners and entrepreneurs',
        }),
      },
      {
        display_name: 'Entrepreneur',
        subscribers: 650000,
        active_user_count: 6500,
        public_description: 'Startup entrepreneurs and business builders',
        fetch: async () => ({
          display_name: 'Entrepreneur',
          subscribers: 650000,
          active_user_count: 6500,
          public_description: 'Startup entrepreneurs and business builders',
        }),
      },
    ];
  },

  // Mock get subreddit
  getSubreddit: (name: string) => {
    return {
      getNew: async () => {
        console.log(`📦 [MOCK] Getting new posts from r/${name}\n`);
        
        return [
          {
            title: 'How do I improve my SEO ranking?',
            author: { name: 'user123' },
            reply: async (text: string) => {
              console.log(`✅ [MOCK] Posted reply to r/${name}\n`);
              return { id: 'mock-reply-1' };
            },
          },
          {
            title: 'Best tools for content marketing?',
            author: { name: 'user456' },
            reply: async (text: string) => {
              console.log(`✅ [MOCK] Posted reply to r/${name}\n`);
              return { id: 'mock-reply-2' };
            },
          },
        ];
      },

      submitSelfpost: async (options: { title: string; text: string }) => {
        console.log(`✅ [MOCK] Posted to r/${name}\n`);
        console.log(`📌 Title: ${options.title}\n`);
        console.log(`📝 Body: ${options.text.substring(0, 100)}...\n`);
        
        return {
          id: 'mock-post-123',
          permalink: `/r/${name}/comments/mock123/mock_post/`,
        };
      },
    };
  },

  config: () => {
    console.log('⚙️ [MOCK] Reddit client configured\n');
  },
};

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms + Math.random() * 2000));
}
