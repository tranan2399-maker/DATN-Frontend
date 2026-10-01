const fs = require('fs');
const path = 'E:/my study/FPT Polytechnic/DATN/Graduation_Project_FE-main/Graduation_Project_FE-main/src/pages/Home/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
content = content.replace(
  "import { MovieNews } from './components/MovieNews'",
  "import { MovieNews } from './components/MovieNews'\nimport { VIPBanner } from './components/VIPBanner'"
);

// Add component
content = content.replace(
  "<MovieNews />",
  "<MovieNews />\n      <VIPBanner />"
);

fs.writeFileSync(path, content, 'utf8');
