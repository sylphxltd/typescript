// @ts-check
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function build() {
  const srcDir = path.join(__dirname, 'src');
  const distDir = path.join(__dirname, 'dist');

  // Ensure dist directory exists
  await fs.mkdir(distDir, { recursive: true });

  // Read all JSON files from src
  const files = await fs.readdir(srcDir);
  const jsonFiles = files.filter(file => file.endsWith('.json'));

  // Process each JSON file
  for (const file of jsonFiles) {
    const srcPath = path.join(srcDir, file);
    const distPath = path.join(distDir, file);

    // Read and parse the source file
    const content = await fs.readFile(srcPath, 'utf8');
    const config = JSON.parse(content);

    // Process extends references to use dist paths
    if (config.extends && typeof config.extends === 'string' && config.extends.startsWith('./')) {
      config.extends = config.extends.replace('./', '../dist/');
    }

    // Write processed file to dist
    await fs.writeFile(distPath, JSON.stringify(config, null, 2));
    console.log(`Processed ${file}`);
  }

  console.log('Build completed successfully!');
}

build().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});