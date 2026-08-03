const fs = require('fs');
const path = require('path');

console.log('📦 Building EduVerse frontend...');

// Create public directory if it doesn't exist
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Create images directory
const imagesDir = path.join(publicDir, 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create a simple index.html for the frontend
const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>EduVerse - Complete Educational Platform</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 50px;
      max-width: 800px;
      width: 100%;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      text-align: center;
    }
    h1 {
      color: #2d3436;
      font-size: 3rem;
      margin-bottom: 10px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .subtitle {
      color: #636e72;
      font-size: 1.2rem;
      margin-bottom: 30px;
    }
    .features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 20px;
      margin: 30px 0;
    }
    .feature {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 12px;
      transition: transform 0.3s;
    }
    .feature:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 20px rgba(0,0,0,0.1);
    }
    .feature h3 {
      color: #2d3436;
      font-size: 0.9rem;
      margin-top: 8px;
    }
    .emoji {
      font-size: 2rem;
    }
    .boards {
      display: flex;
      gap: 10px;
      justify-content: center;
      flex-wrap: wrap;
      margin: 20px 0;
    }
    .board {
      background: #e9ecef;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      color: #495057;
    }
    .status {
      margin-top: 30px;
      padding: 15px;
      background: #d4edda;
      border-radius: 10px;
      color: #155724;
    }
    .status .dot {
      display: inline-block;
      width: 10px;
      height: 10px;
      background: #28a745;
      border-radius: 50%;
      margin-right: 10px;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
    .api-link {
      margin-top: 20px;
      color: #667eea;
      text-decoration: none;
      display: inline-block;
      border: 2px solid #667eea;
      padding: 10px 30px;
      border-radius: 30px;
      transition: all 0.3s;
    }
    .api-link:hover {
      background: #667eea;
      color: white;
    }
    .footer {
      margin-top: 30px;
      color: #b2bec3;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📚 EduVerse</h1>
    <p class="subtitle">Complete Educational Platform for Board Exams</p>
    
    <div class="features">
      <div class="feature">
        <div class="emoji">📝</div>
        <h3>Previous Year Questions</h3>
      </div>
      <div class="feature">
        <div class="emoji">📖</div>
        <h3>Study Notes</h3>
      </div>
      <div class="feature">
        <div class="emoji">📗</div>
        <h3>Book Solutions</h3>
      </div>
      <div class="feature">
        <div class="emoji">🔍</div>
        <h3>Advanced Filtering</h3>
      </div>
    </div>

    <div class="boards">
      <span class="board">🎓 WBBSE</span>
      <span class="board">🎓 WBCHSE</span>
      <span class="board">🎓 ISC</span>
      <span class="board">🎓 ICSE</span>
      <span class="board">🎓 CBSE</span>
    </div>

    <div class="status">
      <span class="dot"></span>
      Server is running successfully!
    </div>

    <a href="/api/content/WBBSE/mathematics/pyq" class="api-link">
      🔗 Try API
    </a>

    <div class="footer">
      Powered by Express.js • Built with ❤️ for Students
    </div>
  </div>
</body>
</html>`;

// Write index.html to public directory
fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);
console.log('✅ Frontend HTML created successfully!');

console.log('📁 Directory structure:');
console.log('  📁 public/');
console.log('    📄 index.html');
console.log('    📁 images/');
console.log('  📁 src/');
console.log('  📁 server/');
console.log('  📄 package.json');

console.log('\n🚀 To start the server:');
console.log('   npm start');
console.log('\n✨ EduVerse is ready for deployment!');
