import React from 'react'
import CardDataStats from '../../components/CardDataStats'
import ChartOne from '../../components/Charts/ChartOne'
import ChartThree from '../../components/Charts/ChartThree'
import ChartTwo from '../../components/Charts/ChartTwo'
// import ChatCard from '../../components/Chat/ChatCard'
// import MapOne from '../../components/Maps/MapOne'
import TableOne from '../../components/Tables/TableOne'
import DefaultLayout from '../../layout/DefaultLayout'
import useStatistic from '@/hooks/useStatistic'
import { addCommasToNumber } from '@/utils'
import IconRevenue from './IconDash/IconRevenue'
// import IconProfit from './IconDash/IconProfit'
import MovieDashB from './IconDash/MovieDashB'
import UserDashB from './IconDash/UserDashB'
import { Layers } from 'lucide-react'

const ECommerce: React.FC = () => {
  const { data: userCount, isLoading } = useStatistic('USER_COUNT')
  const { data: cateCount, isLoading: cateLoading } = useStatistic('CATE_COUNT')
  const { data: movieCount, isLoading: loadingMovie } =
    useStatistic('MOVIE_COUNT')
  const { data: revenueProfit = {}, isLoading: loadingRevenueAndProfit } =
    useStatistic('REVENUE_PROFIT')
  //
  const { revenue = 0 } = revenueProfit
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats
          title="Doanh thu"
          total={!loadingRevenueAndProfit ? addCommasToNumber(revenue) || 0 : 0}
          rate=""
          levelUp
        >
          <IconRevenue />
        </CardDataStats>

        <CardDataStats
          title="Số thể loại"
          total={!cateLoading ? cateCount || 0 : 0}
          rate=""
          link='/admin/category'
          levelUp
        >
          <Layers size={20} />
        </CardDataStats>

        <CardDataStats
          title="Tổng sản phẩm"
          total={loadingMovie ? 0 : movieCount || 0}
          rate=""
          link='/admin/movie'
          levelUp
        >
          <MovieDashB />
        </CardDataStats>
        <CardDataStats
          title="Số người dùng"
          total={isLoading ? 0 : userCount?.data?.countUser || 0}
          rate=""
          link='/admin/users'
          levelDown
        >
          <UserDashB />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree
          title="Giới tính người dùng"
          action="SEX_USER"
          childrenChart={['Nữ', 'Nam', 'Chưa biết']}
          colors={['#3C50E0', '#6577F3', '#8FD0EF']}
        />
        <ChartThree
          title="Độ tuổi người dùng"
          action="AGE_USER"
          childrenChart={['10-19', '20-29', '30-45', 'Chưa biết']}
          colors={['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF']}
          unit={'Tuổi'}
        />
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-12">
          <TableOne action="TOP_MOVIE" title="Top 5 bộ phim doanh thu cao" />
          <TableOne action="TOP_USER" title="Top 5 khách hàng" />
          <TableOne action="TOP_FOOD" title="Top đồ ăn bán chạy" />
        </div>
        {/* <ChatCard /> */}
      </div>
    </DefaultLayout>
  )
}

export default ECommerce
