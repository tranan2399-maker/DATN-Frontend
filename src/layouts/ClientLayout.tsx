import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

function ClientLayout({ setMenuState }: any) {
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#e4e1e7] flex flex-col justify-between">
      <Navbar setMenuState={setMenuState} />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default ClientLayout;
