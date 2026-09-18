import { ContextMain } from '@/context/Context'
import { LoginModal } from '@/pages/modals/LoginModal'
import ModalPortal from '@/pages/modals/ModalPortal'
import { SignupModal } from '@/pages/modals/SignupModal'
import { CSSProperties, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
interface MobileNav {
  menuState: boolean
  menuStyle: CSSProperties
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  setMenuState: (state: any) => void
}

const MobileNav = ({ menuState, menuStyle, setMenuState }: MobileNav) => {
  const { userDetail } = useContext(ContextMain)
  const navigate = useNavigate()
  const [showSignup, setShowSignup] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const toggleShowFormSignIn = () => {
    setShowSignIn((pre) => !pre)
  }
  const toggleShowForm = () => {
    console.log(showSignup)
    setShowSignup((pre) => !pre)
  }
  return (
    <>
      <div className="mobile-nav-menu z-50" style={menuState ? menuStyle : {}}>
        <button
          className="btn-menu-close"
          onClick={() => setMenuState((state: boolean) => !state)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="menu-icon"
            viewBox="0 0 512 512"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M368 368L144 144M368 144L144 368"
            />
          </svg>
        </button>

        <ul className="mobile-nav-items">
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
                navigate('/')
              }}
            >
              Trang chủ
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
                navigate('/showtimes')
              }}
            >
              Lịch chiếu
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
                navigate('/movies')
              }}
            >
              Phim
            </button>
          </li>
          <li className="mobile-nav-list-item">
            <button
              className="mobile-nav-item"
              onClick={() => {
                setMenuState((prev: boolean) => !prev)
                navigate('/policy')
              }}
            >
              Quy định
            </button>
          </li>
          {!userDetail ? (
            <li className="mobile-nav-list-item">
              <button
                className="mobile-nav-item"
                onClick={toggleShowFormSignIn}
              >
                Đăng nhập
              </button>
            </li>
          ) : (
            ''
          )}
          {!userDetail ? (
            <li className="mobile-nav-list-item">
              <button className="mobile-nav-item" onClick={toggleShowForm}>
                Đăng ký
              </button>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
      {showSignup && (
        <ModalPortal>
          <SignupModal />
        </ModalPortal>
      )}

      {showSignIn && (
        <ModalPortal>
          <LoginModal />
        </ModalPortal>
      )}
    </>
  )
}
export default MobileNav
