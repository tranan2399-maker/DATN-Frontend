import { Outlet } from 'react-router-dom'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

function ClientLayout({ setMenuState }: any) {
  return (
    <div>
      <Navbar setMenuState={setMenuState} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default ClientLayout
