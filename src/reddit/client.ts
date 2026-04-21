import Snoowrap from 'snoowrap';
import { config } from '../config';
import { mockRedditClient } from './mockClient';

let client: Snoowrap | null = null;
let useMock = false;

export function getRedditClient() {
  if (client) return client;

  // 🔐 Check credentials
  const hasMissingCredentials =
    !config.reddit.clientId ||
    !config.reddit.clientSecret ||
    !config.reddit.username ||
    !config.reddit.password;

  if (hasMissingCredentials) {
    console.log('⚠️  No Reddit credentials found. Using MOCK mode for testing.\n');
    console.log('💡 When ready, fill .env with real credentials:\n');
    console.log('   REDDIT_CLIENT_ID=...');
    console.log('   REDDIT_CLIENT_SECRET=...');
    console.log('   REDDIT_USERNAME=...');
    console.log('   REDDIT_PASSWORD=...\n');
    useMock = true;
    return mockRedditClient as any;
  }

  console.log('🔐 Initializing Reddit client...\n');

  client = new Snoowrap({
    userAgent: config.reddit.userAgent,
    clientId: config.reddit.clientId,
    clientSecret: config.reddit.clientSecret,
    username: config.reddit.username,
    password: config.reddit.password,
  });

  // ⚙️ Better rate limit config
  client.config({
    requestDelay: 1500, // safer than 1000
    continueAfterRatelimitError: true,
    retryErrorCodes: [502, 503, 504, 522],
    maxRetryAttempts: 3,
    warnings: true,
  });

  console.log('✅ Reddit client ready\n');

  return client;
}

// ⏱️ Smart sleep with jitter (anti-bot detection)
export function sleep(ms: number): Promise<void> {
  const jitter = Math.floor(Math.random() * 2000); // add randomness
  return new Promise((resolve) => setTimeout(resolve, ms + jitter));
}