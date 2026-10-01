const fs = require('fs');
const path = 'E:/my study/FPT Polytechnic/DATN/Graduation_Project_FE-main/Graduation_Project_FE-main/src/pages/Home/HomePage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import
content = content.replace(
  "import { PromotionCarousel } from './components/PromotionCarousel'",
  "import { PromotionCarousel } from './components/PromotionCarousel'\nimport { TopBoxOffice } from './components/TopBoxOffice'"
);

// Add component
content = content.replace(
  "<HomeCollection dataMovie={dataMovie} isLoading={isLoading} />",
  "<TopBoxOffice dataMovie={dataMovie} />\n      <HomeCollection dataMovie={dataMovie} isLoading={isLoading} />"
);

fs.writeFileSync(path, content, 'utf8');
