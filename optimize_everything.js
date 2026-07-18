const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const rootDir = 'E:/Geet';
const ignoreDirs = ['node_modules', '.git', 'Instagram_Originals'];

function getAllImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!ignoreDirs.includes(file)) {
        getAllImages(fullPath, fileList);
      }
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

async function optimizeAll() {
  const allImages = getAllImages(rootDir);
  console.log(`Found ${allImages.length} images to convert.`);
  
  for (const inputPath of allImages) {
    const parsedPath = path.parse(inputPath);
    const outputPath = path.join(parsedPath.dir, parsedPath.name + '.webp');
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
        
      fs.unlinkSync(inputPath);
      console.log(`Converted and deleted original: ${parsedPath.base}`);
    } catch (err) {
      console.error(`Failed on ${inputPath}:`, err);
    }
  }
  console.log('All image optimization complete!');
}

optimizeAll();
