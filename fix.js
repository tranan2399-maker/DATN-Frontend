const fs = require('fs');
const file = 'E:/my study/FPT Polytechnic/DATN/Graduation_Project_FE-main/Graduation_Project_FE-main/src/components/CollectionCard.tsx';
let content = fs.readFileSync(file, 'utf8');
content = content.replace(/className=\{\home-movie-card \$\{className \|\| '\}\\}/g, 'className={home-movie-card }');
fs.writeFileSync(file, content);
