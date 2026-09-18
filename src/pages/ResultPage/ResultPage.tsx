import { Link } from 'react-router-dom'
import { AnimatedPage } from '@/components/AnimatedPage'
import {
  Armchair,
  CalendarDays,
  Check,
  CreditCard,
  Popcorn
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

function ResultPage() {
  const [isNavi, setIsNavi] = useState(false)
  useEffect(() => {
    return () => {
      setIsNavi(true)
      // localStorage.removeItem('resultToken')
      if (isNavi) {
        localStorage.removeItem('resultToken')
      }
    }
  }, [isNavi])

  return (
    <AnimatedPage>
      <section className="section-purchase mt-20">
        <div className="result-container container max-w-[132rem] md:px-16 xl:px-5 ">
          <div className="purchase-section-left w-full">
            <div className="purchase-heading mt-20"></div>
            <div className="flex w-full bg-background-secondary px-7  ps-10 py-10 rounded-xl lg:flex-row  xs:flex-col-reverse">
              <div className="flex flex-col lg:basis-7/12 xs:basis-full">
                <h3 className="text-5xl">Thanh toán thành công </h3>
                <h6 className="text-2xl  mt-4 mb-10">
                  Cảm ơn bạn đã chọn DreamCinema. Thông tin vé đã được gửi cho email của bạn. Chúc bạn xem phim vui vẻ
                </h6>
                <div className="stepper-wrapper  xs:ms-[-9vw] sm:ms-[-10vw] md:ms-[-11vw] lg:ms-[-6vw] ">
                  <div className="stepper-item completed  ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <CalendarDays />
                    </div>
                  </div>
                  <div className="stepper-item completed ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <Armchair />
                    </div>
                  </div>
                  <div className="stepper-item completed ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <Popcorn />
                    </div>
                  </div>
                  <div className="stepper-item completed ">
                    <div className="step-counter lg:w-16 lg:h-16 xs:w-12 xs:h-12">
                      <Check size={16} />
                    </div>
                    <div className="step-name">
                      <CreditCard />
                    </div>
                  </div>
                </div>
                <div className="flex mt-4 gap-7">
                  <Button className="bg-[#4bb543] text-white text-3xl px-8 py-4 rounded-2xl">
                    <Link to={'/profile/bill'}>Sang trang lịch sử mua</Link>
                  </Button>
                  <Button className="border-[#4bb543] text-[#4bb543] border text-3xl px-8 py-4 rounded-2xl">
                    <Link to={'/'}>Quay về trang chủ</Link>
                  </Button>
                </div>
              </div>
              <div className="flex lg:basis-5/12 xs:basis-full">
                <img
                  className="object-cover"
                  src="/Images/customers/successfull-payment.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AnimatedPage>
  )
}

export default ResultPage
