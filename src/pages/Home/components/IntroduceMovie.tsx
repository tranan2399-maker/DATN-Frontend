import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import '@/styles/introduce.css'
import { TicketCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import imgBg from '/Images/movies/money_heist-bg.jpg'
import { Link } from 'react-router-dom'

function IntroduceMovie() {
  return (
    <div className="relative">
      <div className="">
        <section className="netflix-home-video">
          <div className="top"></div>
          <div className="bottom"></div>
          <img className="img-background" src={imgBg} alt="money_heist" />
          <div className="content xs:w-[55%] sm:w-[50%] md:w-[45%] lg:w-[38%] xl:w-[35%]">
            <section className="left xs:ms-10 sm:ms-12 flex flex-col justify-center h-full">
              <img
                className="lg:w-[90%] md:w-[80%] sm:w-[80%] xs:w-[80%]"
                src="https://res.cloudinary.com/dsmy4ogdj/image/upload/v1708832547/money-heist-title-la-casa-de-pap-removebg-preview_qgqeco.png"
                alt=""
              />

              <div className="flex mt-5">
                <Link to={'/movie/money-heist'}>
                  <Button variant="home_btn" className="btn btn-light m-2">
                    <TicketCheck size={20} /> Nhận vé
                  </Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="home_outline"
                      className="ms-5 btn btn-secondary text-white m-2 "
                    >
                      <i className="bi bi-info-circle p-0"></i> Đoạn phim giới
                      thiệu
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="p-0 w-fit">
                    <iframe
                      className="xl:w-[917px] xl:h-[516px] md:w-[517px] md:h-[316px] xs:w-[320px] xs:h-[186px]"
                      src="https://www.youtube.com/embed/_InqQJRqGW4?si=7jJpOKRk9LZYswtd"
                      title="Trình phát video YouTube"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="mt-10 ms-2 xs:hidden sm:block xs:text-xl sm:text-2xl md:text-2xl lg:text-3xl text-white leading-loose ">
                Money Heist (La Casa de Papel) là loạt phim nổi tiếng của
                Netflix về một nhóm cướp có tên giả. Giáo sư là kẻ chủ mưu đằng
                sau các vụ cướp và có một cốt truyện bi thảm thúc đẩy hành động
                của mình. Chương trình quy tụ dàn diễn viên đa dạng nhân vật
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

export default IntroduceMovie
