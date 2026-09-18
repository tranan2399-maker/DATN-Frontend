// import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export const HeroSection = () => {
  // const navigate = useNavigate()

  return (
    <section className="section-hero">
      <div className="container hero bg-white shadow-md dark:shadow-none dark:bg-background-main p-10 rounded-xl py-16">
        <div className="hero-text">
          <h1 className="heading-primary text-primary-locationMovie">
            Mở khóa cánh cổng dẫn đến bộ phim ma thuật đầy mê hoặc
          </h1>

          <p className="hero-description text-primary-textUnderTitle">
            Đắm chìm trong sức hấp dẫn quyến rũ của điện ảnh khi bạn bước đi
            vào điểm đến tuyệt vời của chúng tôi, được thiết kế để nâng tầm bạn
            trải nghiệm xem phim lên một tầm cao mới.
          </p>
          <div className="hero-btn-container">
            <button className="btn btn-full bg-primary-movieColor text-primary-locationMovie">
            Mua vé
            </button>
            <HashLink
              to="#nowShowing"
              className="btn btn-outline bg-background-main border-2 border-border-calendarBorder shadow"
            >
              Tìm hiểu thêm &darr;
            </HashLink>
          </div>

          <div className="hero-review-section">
            <div className="customers-img">
              <img
                src="/Images/customers/customer-1.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-2.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-3.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-4.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-5.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
              <img
                src="/Images/customers/customer-6.jpg"
                className="customer-img"
                alt="Customer Photo"
              />
            </div>

            <p className="hero-review-text text-primary-locationMovie">
              <span className="text-primary-movieColor">100,000+</span> vé
              đã bán năm ngoái
            </p>
          </div>
        </div>

        <div className="hero-img-box">
          <img
            className="hero-img"
            src="/Images/hero-img.webp"
            alt="Hero Image"
          />
        </div>
      </div>
    </section>
  )
}
