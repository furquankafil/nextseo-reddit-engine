import { scanSubreddits } from './reddit/subredditScanner';
import { createStealthPost } from './reddit/stealthPoster';
import { engageWithComments } from './reddit/commentEngager';

const command = process.argv[2];

async function main() {
  switch (command) {
    case 'scan':
      await scanSubreddits();
      break;
    case 'post':
      await createStealthPost();
      break;
    case 'comment':
      await engageWithComments();
      break;
    default:
      console.log('NEXTSEO Reddit Automation Engine');
      console.log('================================\n');
      console.log('Usage:');
      console.log('  npx tsx src/index.ts scan      Find high-value subreddits');
      console.log('  npx tsx src/index.ts post      Generate stealth posts');
      console.log('  npx tsx src/index.ts comment   Find posts to comment on');
      console.log('');
      break;
  }
}

main().catch(console.error);
