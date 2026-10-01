const fs = require('fs');
const path = 'E:/my study/FPT Polytechnic/DATN/Graduation_Project_FE-main/Graduation_Project_FE-main/src/pages/Home/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
content = content.replace(
  "import { TopBoxOffice } from './components/TopBoxOffice'",
  "import { TopBoxOffice } from './components/TopBoxOffice'\nimport { MovieNews } from './components/MovieNews'"
);

// Add component
content = content.replace(
  "<Features />",
  "<Features />\n      <MovieNews />"
);

fs.writeFileSync(path, content, 'utf8');
