const fs = require('fs');
const footerPath = 'E:/my study/FPT Polytechnic/DATN/Graduation_Project_FE-main/Graduation_Project_FE-main/src/components/Footer.tsx';
let footerContent = fs.readFileSync(footerPath, 'utf8');
// Fix closing tags for HashLink that were converted to Link
footerContent = footerContent.replace(/<Link className="hashlink-container" to="\/">([\s\S]*?)<\/HashLink>/, '<Link className="hashlink-container" to="/">\</Link>');
footerContent = footerContent.replace(/<Link to="\/" className=" mt-2">([\s\S]*?)<\/HashLink>/, '<Link to="/" className=" mt-2">\</Link>');
fs.writeFileSync(footerPath, footerContent);
