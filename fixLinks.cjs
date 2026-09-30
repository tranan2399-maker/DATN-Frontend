const fs = require('fs');
const navbarPath = 'E:/my study/FPT Polytechnic/DATN/Graduation_Project_FE-main/Graduation_Project_FE-main/src/components/Navbar.tsx';
let navbarContent = fs.readFileSync(navbarPath, 'utf8');
navbarContent = navbarContent.replace(/<HashLink className="logo-container" to="#headerTop">/g, '<Link className="logo-container" to="/">');
navbarContent = navbarContent.replace(/<\/HashLink>/g, '</Link>');
fs.writeFileSync(navbarPath, navbarContent);

const footerPath = 'E:/my study/FPT Polytechnic/DATN/Graduation_Project_FE-main/Graduation_Project_FE-main/src/components/Footer.tsx';
let footerContent = fs.readFileSync(footerPath, 'utf8');
footerContent = footerContent.replace(/<HashLink className="hashlink-container" to="#headerTop">/g, '<Link className="hashlink-container" to="/">');
footerContent = footerContent.replace(/<HashLink to='#headerTop' className=' mt-2'>/g, '<Link to="/" className=" mt-2">');
// Since Footer uses both HashLink and Link (maybe), let's just make sure closing tags are correct.
// Actually, Footer might have other HashLinks. Let's check how many HashLinks are in Footer.
