import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { addCommasToNumber } from '@/utils'
import useStatistic from '@/hooks/useStatistic'
interface TopMovieType {
  movieDetails?: { name: string; image: string }[]
  _id?: { name: string; image: string }
  profit: number
  totalSold: number
  priceFood: number
  priceMovie: number
  count: number
}
interface TopUserType {
  userDetails: { name: string; avatar: string; email: string }[]
  count: number
  totalSold: number
}
interface TopFoodType {
  name: string
  image: string
  price: number
  ticketId: number
  count: number
}
// const brandData: BRAND[] = [
//   {
//     logo: BrandOne,
//     name: 'Google',
//     visitors: 3.5,
//     revenues: '5,768',
//     sales: 590,
//     conversion: 4.8
//   },
//   {
//     logo: BrandTwo,
//     name: 'Twitter',
//     visitors: 2.2,
//     revenues: '4,635',
//     sales: 467,
//     conversion: 4.3
//   },
//   {
//     logo: BrandThree,
//     name: 'Github',
//     visitors: 2.1,
//     revenues: '4,290',
//     sales: 420,
//     conversion: 3.7
//   },
//   {
//     logo: BrandFour,
//     name: 'Vimeo',
//     visitors: 1.5,
//     revenues: '3,580',
//     sales: 389,
//     conversion: 2.5
//   },
//   {
//     logo: BrandFive,
//     name: 'Facebook',
//     visitors: 3.5,
//     revenues: '6,768',
//     sales: 390,
//     conversion: 4.2
//   }
// ]

const TableOne = ({ title, action }: { title: string; action: string }) => {
  const { data: dataTop = {}, isLoading: loadingdataTop } = useStatistic(action)

  if (loadingdataTop) {
    return <div>loading</div>
  }
  if (action === 'TOP_USER') {
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 my-5">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên người dùng
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5 sm:block hidden">
              <h5 className=" text-sm font-medium  uppercase xsm:text-base">
                Email
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Số lần mua
              </h5>
            </div>
            <div className=" p-2.5 text-center  xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tổng tiền
              </h5>
            </div>
            {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
<h5 className="text-sm font-medium uppercase xsm:text-base">
                Conversion
              </h5>
            </div> */}
          </div>

          {dataTop.map((top_movie: TopUserType, key: number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === dataTop.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5 ">
                <div className="flex-shrink-0">
                  <img
                    width={'50'}
                    src={top_movie.userDetails[0]?.avatar}
                    alt="Brand"
                  />
                </div>
                <p className="hidden text-black dark:text-white sm:block ">
                  {top_movie.userDetails[0]?.name}
                </p>
              </div>
              <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5 ">
                <p className="text-black dark:text-white">
                  {top_movie.userDetails[0]?.email}
                </p>
              </div>

              <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5 ">
                <p className="text-black dark:text-white">
                  {addCommasToNumber(top_movie?.count)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {addCommasToNumber(top_movie?.totalSold)}
                </p>
              </div>

              {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{brand.conversion}%</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (action === 'TOP_FOOD') {
    return (
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 my-5">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          {title}
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tên đồ ăn
              </h5>
            </div>

            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Số lần mua
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5 sm:block hidden">
              <h5 className=" text-sm font-medium  uppercase xsm:text-base">
                Giá
              </h5>
            </div>
            <div className=" p-2.5 text-center  xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Tổng tiền
              </h5>
            </div>
            {/* <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Conversion
              </h5>
            </div> */}
          </div>

          {dataTop?.map((topfood: TopFoodType, key: number) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-4 ${
                key === dataTop.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5 ">
                <div className="flex-shrink-0">
                  <img width={'50'} src={topfood.image} alt="Brand" />
                </div>
                <p className="hidden text-black dark:text-white sm:block ">
                  {topfood.name}
                </p>
              </div>
              <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5 ">
                <p className="text-black dark:text-white">{topfood.count}</p>
              </div>

              <div className="hidden sm:flex items-center justify-center p-2.5 xl:p-5 ">
                <p className="text-black dark:text-white">
                  {addCommasToNumber(topfood?.price)}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">
                  {addCommasToNumber(topfood?.ticketId)}
                </p>
              </div>

              {/* <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{brand.conversion}%</p>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        {title}
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 lg:grid-cols-[120px_minmax(100px,_1fr)_180px_190px_190px]">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Phim
            </h5>
          </div>
          <div className="p-2.5 text-center xl:px-2 xl:py-5 ">
            <h5 className=" text-sm font-medium  uppercase xsm:text-base">
              Vé đã bán
            </h5>
          </div>

          <div className=" p-2.5 text-center lg:block hidden  xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base hover:cursor-pointer lg:flex hidden  justify-between">
              Doanh thu phim
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-help"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-56">
                      Bao gồm giá ghế ngồi cộng với giá bộ phim bán được trong
                      bộ phim này
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h5>
          </div>
          <div className=" p-2.5 text-center lg:block hidden xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base lg:flex hidden justify-between ">
              Doanh thu đồ ăn
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-help"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-56">
                      Bao gồm tổng doanh thu từ đồ ăn bán được trong bộ phim này
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base flex justify-between">
              Tổng doanh thu
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-help"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-56">
                      Bao gồm tổng doanh thu cộng với doanh thu đồ ăn
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h5>
          </div>
        </div>

        {dataTop.map((top_movie: TopMovieType, key: number) => (
          <div
            className={`grid grid-cols-3 lg:grid-cols-[170px_minmax(100px,_1fr)_200px_200px_200px] ${
              key === dataTop.length - 1
                ? ''
                : 'border-b border-stroke dark:border-strokedark'
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5 ">
              <div className="flex-shrink-0">
                <img width={'50'} src={top_movie._id?.image} alt="Brand" />
              </div>
              <p className="hidden text-black dark:text-white sm:block ">
                {top_movie._id?.name}
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5 ">
              <p className="text-black dark:text-white">
                {addCommasToNumber(top_movie?.count)}
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-center p-2.5  xl:p-5">
              <p className="text-black dark:text-white ">
                {addCommasToNumber(top_movie?.priceMovie)}
              </p>
            </div>
            <div className="hidden lg:flex items-center justify-center p-2.5  xl:p-5">
              <p className="text-black dark:text-white">
                {addCommasToNumber(top_movie?.priceFood)}
              </p>
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">
                {addCommasToNumber(top_movie?.totalSold)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TableOne
