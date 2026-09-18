// import { useEffect, useState } from 'react'
// import axios from 'axios'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
// import HashLoader from 'react-spinners/HashLoader'

export const Footer = () => {
  return (
    <section className="footer ">
      <div>
        <HashLink className="hashlink-container" to="#headerTop">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="main-logo-icon"
            viewBox="0 0 512 512"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="main-logo-icon w-10"
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="32"
                d="M360 94.59V296M443.13 212.87L296 360M417.41 360H216M299.13 443.13l-144-144M152 416V216M68.87 299.13l144-144M94.59 152H288M212.87 68.87L360 216"
              />
            </svg>
          </svg>
          <h1 className="logo-text">Dream Cinema</h1>
        </HashLink>




        <div className="contact ml-3 mt-11" style={{ color: '#919598' }}>
          <div className='flex my-1.5 text-xl  '>
            <HashLink to='#headerTop' className=' mt-2'>
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512" className='w-7 ml-5.5'>
                <path fill="#9c9c9e" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
              </svg>

            </HashLink>
            <h1 className='ml-5 mt-2'>0363128962</h1>

          </div>
          <div className='flex my-1.5 text-xl mt-6'>
            <HashLink to=''>
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className='w-7 ml-5'>
                <path fill="#9c9c9e" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z" /></svg>
            </HashLink>
            <h1 className='ml-5 mt-1.5'>Dc@gmail.com</h1>
          </div>
        </div>
        <div className="footer-icon flex flex-wrap ml-3  mt-6" style={{ color: '#919598' }}>
          <div>
            <HashLink to='https://www.facebook.com/longthien.thanthien/?locale=vi_VN'>
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className='w-8 ml-5'>
                <path fill="#9c9c9e" d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z" /></svg>
            </HashLink>
          </div>
          <div>
            <HashLink to='https://www.linkedin.com/in/%C4%91%E1%BB%A9c-nguy%E1%BB%85n-88a2072a2/'>
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className='w-8 ml-5'>
                <path fill="#9c9c9e" d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" /></svg>
            </HashLink>
          </div>
          <div>
            <HashLink to='https://www.youtube.com/channel/UCrcEXy2YurzCrKN9Ys9XLhA'>
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className='w-8 ml-5'>
                <path fill="#9c9c9e" d="M282 256.2l-95.2-54.1V310.3L282 256.2zM384 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm14.4 136.1c7.6 28.6 7.6 88.2 7.6 88.2s0 59.6-7.6 88.1c-4.2 15.8-16.5 27.7-32.2 31.9C337.9 384 224 384 224 384s-113.9 0-142.2-7.6c-15.7-4.2-28-16.1-32.2-31.9C42 315.9 42 256.3 42 256.3s0-59.7 7.6-88.2c4.2-15.8 16.5-28.2 32.2-32.4C110.1 128 224 128 224 128s113.9 0 142.2 7.7c15.7 4.2 28 16.6 32.2 32.4z" /></svg>
            </HashLink>

          </div>
          <div>
            <HashLink to='https://redirect.zalo.me/v3/verifyv2/pc?token=Oc3mnjXqKmLj3_V7s1XJOsGDyRRS1rPyPGtoi34&continue=https%3A%2F%2Fmaps.app.goo.gl%2FzyQAGxP4YL6cykyV7'>
              <svg xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className='w-8 ml-5'>
                <path fill="#9c9c9e" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
            </HashLink>
          </div>
        </div>
      </div>
      <div className='ml-3 footer-company'>
        <h1 >CÔNG TY</h1>
        <div className="mt-11 text-xl" style={{ color: '#919598' }}>
          <span className='mt-6 block'>Về chúng tôi</span>
          <span className='mt-6 block'>Bài viết</span>
          <span className='mt-6 block'>Liên hệ</span>
        </div>
      </div>
      <div className='inf'>
        <h1>THÔNG TIN </h1>
        <div className="mt-11 text-xl " style={{ color: '#919598' }}>
          <span className='mt-6 block'>Sự kiện</span>
          <span className='mt-6 block'> website</span>
          <span className='mt-6 block'>Địa chỉ</span>
        </div>
      </div>
      <div>

        <h1>HỖ TRỢ</h1>
        <div className="mt-11 text-xl " style={{ color: '#919598' }}>
          <span className='mt-6 block '>Đặt vé </span>
          <span className='mt-6 block'> Giải đáp </span>
          <span className='mt-6 block'> Lỗi của hệ thống</span>
        </div>
      </div>

      <div className='feadback'>
        <h1>GÓP Ý </h1>
        <div className="mt-11 text-xl" style={{ color: '#919598' }}>
          <span className='mt-6 block '>Phim</span>
          <span className='mt-6 block'> Rạp chiếu </span>
          <span className='mt-6 block'>Nhân viên</span>
        </div>
      </div>

    </section >
  )
}

