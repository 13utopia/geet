const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const baseDir = 'E:/Geet/Instagram';
const backupBase = 'E:/Geet/Instagram_Originals';

if (!fs.existsSync(backupBase)) {
  fs.mkdirSync(backupBase);
}

const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

async function optimizeImages() {
  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    const backupFolder = path.join(backupBase, folder);
    
    if (!fs.existsSync(backupFolder)) {
      fs.mkdirSync(backupFolder);
    }
    
    const files = fs.readdirSync(folderPath).filter(f => f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg'));
    
    console.log(`Processing ${files.length} images in ${folder}...`);
    
    for (const file of files) {
      const inputPath = path.join(folderPath, file);
      // Construct output path by changing extension to .webp
      const parsedPath = path.parse(file);
      const outputFilename = parsedPath.name + '.webp';
      const outputPath = path.join(folderPath, outputFilename);
      const backupPath = path.join(backupFolder, file);
      
      try {
        await sharp(inputPath)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        // Move original to backup
        fs.renameSync(inputPath, backupPath);
        console.log(`Optimized and backed up: ${file} -> ${outputFilename}`);
      } catch (err) {
        console.error(`Failed to process ${file}:`, err);
      }
    }
  }
  console.log('All images optimized!');
}

optimizeImages();
