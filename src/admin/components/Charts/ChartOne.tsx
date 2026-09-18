import useStatistic from '@/hooks/useStatistic'
import { chuyenDoiThu } from '@/utils'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const options: ApexOptions = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left'
  },
  // fill : {
  //   colors: ['']
  // },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1
    },

    toolbar: {
      show: false
    }
  },
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300
        }
      }
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350
        }
      }
    }
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight'
  },
  // labels: {
  //   style: {
  //     colors: ['#F44336', '#E91E63', '#9C27B0']
  //   }
  // },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: true
      }
    }
  },
  dataLabels: {
    enabled: false,
    style: {
      colors: ['#F44336', '#E91E63', '#9C27B0']
    }
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5
    }
  },
  xaxis: {
    type: 'category',
    categories: [
      'Sep',
      'Oct',
      'Nov',
      'Dec',
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug'
    ],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
      // color: '#FFFFFF'
    },
    labels: {
      style: {
        cssClass: '!fill-[white]'
      }
    }
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px'
        // color: '#fff'
      }
    },
    min: 0,
    max: 1000,
    labels: {
      style: {
        cssClass: '!fill-[white]'
      }
    },
    tickAmount: 8
  }
}

// interface ChartOneState {
//   series: {
//     name: string
//     data: number[]
//   }[]
// }

const ChartOne: React.FC = () => {
  const { data: data, isLoading } = useStatistic('CHART_REVENUE_PROFIT')

  if (isLoading) {
    return
  }
  const options2 = {
    ...options,
    yaxis: {
      ...options.yaxis,
      max: Math.max(...data.series[0].data)
    },
    xaxis: {
      ...options.xaxis,
      categories: data.date.map((date: string) => chuyenDoiThu(date))
    }
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-47.5">
            <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-[#3056D3]"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-[#3056D3]">Tổng doanh thu</p>
              <p className="text-sm font-medium">
                {data && data.date && data.date[0]} -{' '}
                {data && data.date && data.date[data.date.length - 1]}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Tuần
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options2}
            series={data && data.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartOne
