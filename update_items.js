const fs = require('fs');
const path = require('path');

const baseDir = 'E:/Geet/Instagram';
const folders = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

let items = [];

folders.forEach(folder => {
  const folderPath = path.join(baseDir, folder);
  const files = fs.readdirSync(folderPath).filter(f => f.toLowerCase().endsWith('.webp'));
  
  let main = files.find(f => f.toLowerCase() === 'main.webp');
  if (!main && files.length > 0) {
    if (folder === 'Fujitech Express') main = files.find(f => f === 'image 1.webp') || files[0];
    else if (folder === 'Mayur dairy & sweets') main = files.find(f => f === 'Mayur dairy posts 1.webp') || files[0];
    else main = files[0];
  }
  
  const gridImages = files.filter(f => f !== main).map(f => `Instagram/${folder}/${f}`);
  
  let name1 = folder;
  let name2 = '';
  if (folder === 'TQS') { name1 = 'The'; name2 = 'TQS'; }
  else if (folder === 'Fujitech Express') { name1 = 'Fujitech'; name2 = 'Express'; }
  else if (folder === 'Mayur dairy & sweets') { name1 = 'Mayur'; name2 = 'Dairy'; }
  else if (folder === 'BAS') { name1 = 'The'; name2 = 'BAS'; }

  items.push({
    id: folder.toLowerCase().replace(/\s+/g, '-'),
    img: `Instagram/${folder}/${main}`,
    name1,
    name2,
    description: `A showcase of brand aesthetics and visual identity for ${folder}.`,
    gridImages
  });
});

const appJsPath = 'E:/Geet/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

const startMarker = 'const items = [';
const endMarker = 'class Slider3D {';

const startIndex = appJs.indexOf(startMarker);
const endIndex = appJs.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newCode = `const items = ${JSON.stringify(items, null, 2)};\n\n`;
  appJs = appJs.substring(0, startIndex) + newCode + appJs.substring(endIndex);
  fs.writeFileSync(appJsPath, appJs);
  console.log('Successfully updated app.js with real items!');
} else {
  console.log('Could not find markers in app.js');
}
