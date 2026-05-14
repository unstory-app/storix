import fs from 'fs';
import path from 'path';

// Need to use ts-node or bun to run this
// So we can import typescript files.
import { getAllLongStories } from '../src/longstories/index.js';

const main = () => {
  const stories = getAllLongStories();
  const outputPath = path.join(process.cwd(), 'src', 'stories', 'longstories.json');
  fs.writeFileSync(outputPath, JSON.stringify(stories, null, 2));
  console.log('✅ Generated longstories.json successfully');
};

main();
