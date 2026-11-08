const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- Assembling React Native Engineering & Architecture Handbook ---');

const styles = require('./styles');
const headerToc = require('./header_toc');
const sec1 = require('./section1');
const sec2 = require('./section2');
const sec3 = require('./section3');
const sec4 = require('./section4');
const sec5 = require('./section5');
const sec6 = require('./section6');
const sec7 = require('./section7');
const sec8 = require('./section8');
const sec9 = require('./section9');
const sec10 = require('./section10');
const sec11 = require('./section11');
const sec12 = require('./section12');

const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>React Native Engineering &amp; Architecture Master Reference</title>
  ${styles}
</head>
<body>
  ${headerToc}
  ${sec1}
  ${sec2}
  ${sec3}
  ${sec4}
  ${sec5}
  ${sec6}
  ${sec7}
  ${sec8}
  ${sec9}
  ${sec10}
  ${sec11}
  ${sec12}
</body>
</html>
`;

// Validation
console.log('Validating assembled HTML...');

// 1. Check Questions
const qMatches = [...fullHtml.matchAll(/<span class="qa-badge">Q(\d+)<\/span>/g)].map(m => parseInt(m[1], 10));
console.log(`Total questions detected: ${qMatches.length}`);
console.log(`First question: Q${qMatches[0]}, Last question: Q${qMatches[qMatches.length - 1]}`);

let missing = [];
for (let i = 1; i <= qMatches.length; i++) {
  if (!qMatches.includes(i)) {
    missing.push(i);
  }
}
if (missing.length > 0) {
  console.error('ERROR: Missing questions:', missing);
} else {
  console.log('SUCCESS: All questions Q1 to Q' + qMatches.length + ' are strictly sequential and complete!');
}

// 2. Write HTML file
const targetHtmlPath = 'd:/Live Repos/c7corp/react-native-handbook.html';
fs.writeFileSync(targetHtmlPath, fullHtml, 'utf8');
console.log(`Wrote ${fullHtml.length} characters to ${targetHtmlPath}`);

// 3. Generate PDF using Edge or Chrome Headless
const targetPdfPath = 'd:/Live Repos/c7corp/react-native-handbook.pdf';
console.log('Converting HTML to PDF via Headless browser...');

let pdfGenerated = false;
const edgePath = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

let browserPath = null;
if (fs.existsSync(edgePath)) {
  browserPath = edgePath;
} else if (fs.existsSync(chromePath)) {
  browserPath = chromePath;
}

if (browserPath) {
  try {
    const cmd = `"${browserPath}" --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${targetPdfPath}" --no-pdf-header-footer "file:///${path.resolve(targetHtmlPath).replace(/\\\\/g, '/')}"`;
    console.log(`Executing: ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
    if (fs.existsSync(targetPdfPath)) {
      const stats = fs.statSync(targetPdfPath);
      console.log(`SUCCESS: Generated PDF at ${targetPdfPath} (${stats.size} bytes)`);
      pdfGenerated = true;
    }
  } catch (err) {
    console.error('Failed to run browser headless print-to-pdf:', err.message);
  }
} else {
  console.warn('Neither Edge nor Chrome found at default paths.');
}

console.log('--- Handbook Build Complete ---');
