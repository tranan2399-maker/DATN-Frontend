import React, { useState, ReactNode } from 'react'
import Header from '../components/Header/index'
import Sidebar from '../components/Sidebar/index'
// import './DefaultLayout.css'
import { useLocation } from 'react-router-dom'

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { pathname } = useLocation()

  // kiểm tra nếu đang ở trang admin thì reset html fontsize về 100%
  if (pathname.startsWith('/admin')) {
    document.documentElement.style.fontSize = '100%'
  }

  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="bg-whiten dark:bg-boxdark-2 dark:text-bodydark ">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Sidebar End ===== --> */}

        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  )
}

export default DefaultLayout
