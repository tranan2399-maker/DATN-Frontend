import useStatistic from '@/hooks/useStatistic'
import { chuyenDoiThu } from '@/utils'
import { ApexOptions } from 'apexcharts'
import React from 'react'
import ReactApexChart from 'react-apexcharts'

const options: ApexOptions = {
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'bar',
    height: 335,
    stacked: true,
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },

  responsive: [
    {
      breakpoint: 1536,
      options: {
        plotOptions: {
          bar: {
            borderRadius: 0,
            columnWidth: '25%'
          }
        }
      }
    }
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 0,
      columnWidth: '25%',
      borderRadiusApplication: 'end',
      borderRadiusWhenStacked: 'last'
    }
  },
  dataLabels: {
    enabled: false
  },

  xaxis: {
    categories: ['M', 'T'],
    
  },
  yaxis: {
    labels: {
      style: {
        cssClass: '!fill-[white]'
      }
    }
  },
  legend: {
    position: 'top',
    horizontalAlign: 'left',
    fontFamily: 'Satoshi',
    fontWeight: 500,
    fontSize: '14px',

    markers: {
      radius: 99
    }
  },
  fill: {
    opacity: 1
  }
}

const ChartTwo: React.FC = () => {
  const { data: data, isLoading } = useStatistic('TICKET_COUNT')
  if (isLoading) {
    return
  }
  const options2 = {
    ...options,
    xaxis: {
      categories: data.date.map((date: string) => chuyenDoiThu(date)),
      labels: {
        style: {
          cssClass: '!fill-[white]'
        }
      }
    }
  }

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-lg font-semibold text-black dark:text-white">
            Vé bán được trong tuần
          </h4>
        </div>
      </div>

      <div>
        <div id="chartTwo" className="-ml-5 -mb-9">
          <ReactApexChart
            options={options2}
            series={data.series}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartTwo
