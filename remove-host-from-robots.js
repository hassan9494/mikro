const fs = require('fs');
const path = require('path');

const robotsPath = path.join(__dirname, 'public', 'robots.txt');
let content = fs.readFileSync(robotsPath, 'utf8');

// Remove all comment lines (lines starting with #) and Host: lines
content = content
  .split('\n')
  .filter(line => !line.trim().startsWith('#') && !line.trim().startsWith('Host:'))
  .join('\n');

fs.writeFileSync(robotsPath, content, 'utf8');
console.log('Comments and Host line removed from robots.txt'); 