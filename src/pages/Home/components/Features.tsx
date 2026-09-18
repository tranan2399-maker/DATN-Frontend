import { useEffect, useState } from 'react'
import { Feature } from './Feature'
import HashLoader from 'react-spinners/HashLoader'

const FEATURE_DATA = [
  {
    title: 'Trải nghiệm điện ảnh tuyệt vời',
    description:
      'Đắm chìm trong hình ảnh tuyệt đẹp và âm thanh trong trẻo, khi công nghệ IMAX tiên tiến của chúng tôi đưa bạn trực tiếp vào trung tâm của hành động. Với màn hình vượt ra ngoài tầm nhìn ngoại vi của bạn, mọi khung hình đều trở nên sống động với độ sáng rực rỡ vô song.',
    image_path: '/Images/features/food.webp'
  },
  {
    title: 'Tận hưởng Dolby Atmos',
    description:
      'Trải nghiệm âm thanh chưa từng có với Dolby Atmos, công nghệ âm thanh chuẩn mực đưa bạn vào một hành trình âm thanh đắm chìm. Với các vật thể âm thanh di chuyển liền mạch quanh rạp hát, bạn sẽ được hòa vào trung tâm của mọi cảnh quay, khiến bạn trở thành một phần không thể thiếu của câu chuyện.',
    image_path: '/Images/features/sound.webp'
  },
  {
    title: 'Đồ ăn ',
    description:
      'Tại rạp chiếu phim của chúng tôi, chúng tôi mang trải nghiệm xem phim của bạn ra ngoài màn hình bằng cách cung cấp một loạt các món ăn ngon tại quầy giảm giá của chúng tôi. Từ bỏng ngô tươi phết bơ, món nachos giòn với sốt phô mai thơm ngon, cho đến món hotdog sành điệu và nhiều loại đồ uống giải khát, quầy nhượng quyền của chúng tôi là thiên đường ẩm thực cho những người đam mê điện ảnh.',
    image_path: '/Images/features/food.webp'
  },
  {
    title: 'Lối thoát sang trọng',
    description:
      'Bước vào một thế giới sang trọng và thư giãn, được thiết kế để đáp ứng mọi nhu cầu của bạn trước và sau sự kiện chính. Phòng chờ Cao cấp của chúng tôi chào đón bạn với ghế ngồi bọc da sang trọng, lối trang trí trang nhã và bầu không khí tinh tế tạo tiền đề cho một hành trình xem phim khó quên.',
    image_path: '/Images/features/lounge.webp'
  }
]

export const Features = () => {
  const [featuresData, setFeaturesData] = useState<
    {
      title: string
      description: string
      image_path: string
    }[]
  >([])
  const override = {
    display: 'block',
    margin: '2.4rem auto'
  }
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setFeaturesData(FEATURE_DATA)
    setLoading(false)
  }, [])

  const featuresHtml = featuresData.map((feature, idx) => {
    return <Feature key={idx} {...feature} idx={idx} />
  })

  return (
    <section className="section-features bg-white py-10 shadow-xl dark:shadow-none dark:bg-background-main rounded-xl container">
      <h4 className="subheading text-primary-movieColor">Bạn sẽ nhận được gì?</h4>
      <h2 className="section-features-heading heading-secondary text-primary-locationMovie">
        Giải phóng sự kỳ diệu của bộ phim và khám phá những đặc điểm ngoạn mục của chúng tôi
      </h2>

      {loading ? (
        <HashLoader cssOverride={override} color="#eb3656" />
      ) : (
        <div className="feature-contents">{featuresHtml}</div>
      )}
    </section>
  )
}
