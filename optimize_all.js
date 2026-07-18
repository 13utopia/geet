const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDirs = [
  'E:/Geet/website',
  'E:/Geet/Packaging/frames'
];

async function optimizeImages() {
  for (const dir of targetDirs) {
    if (!fs.existsSync(dir)) {
      console.warn(`Directory not found: ${dir}`);
      continue;
    }

    const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg'));
    console.log(`Processing ${files.length} images in ${dir}...`);
    
    for (const file of files) {
      const inputPath = path.join(dir, file);
      const parsedPath = path.parse(file);
      const outputFilename = parsedPath.name + '.webp';
      const outputPath = path.join(dir, outputFilename);
      
      try {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        // Delete original file to save space (tracked by git anyway)
        fs.unlinkSync(inputPath);
        console.log(`Optimized: ${file} -> ${outputFilename}`);
      } catch (err) {
        console.error(`Failed to process ${file}:`, err);
      }
    }
  }
  
  // Delete unused portraits
  const baseDir = 'E:/Geet';
  const rootFiles = fs.readdirSync(baseDir);
  const portraitFiles = rootFiles.filter(f => f.startsWith('portrait_') && f.endsWith('.png'));
  for (const file of portraitFiles) {
    fs.unlinkSync(path.join(baseDir, file));
    console.log(`Deleted unused file: ${file}`);
  }

  console.log('All image optimization complete!');
}

optimizeImages();
