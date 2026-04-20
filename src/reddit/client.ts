import Snoowrap from 'snoowrap';
import { config } from '../config';

let client: Snoowrap | null = null;

export function getRedditClient(): Snoowrap {
  if (client) return client;

  if (!config.reddit.clientId || !config.reddit.clientSecret) {
    throw new Error(
      'Missing Reddit API credentials. Copy .env.example to .env and fill in your credentials.\n' +
      'Get them at: https://www.reddit.com/prefs/apps'
    );
  }

  client = new Snoowrap({
    userAgent: config.reddit.userAgent,
    clientId: config.reddit.clientId,
    clientSecret: config.reddit.clientSecret,
    username: config.reddit.username,
    password: config.reddit.password,
  });

  // Configure rate limiting
  client.config({
    requestDelay: 1000,
    continueAfterRatelimitError: true,
    warnings: false,
  });

  return client;
}
