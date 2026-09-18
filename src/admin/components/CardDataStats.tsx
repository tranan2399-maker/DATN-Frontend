import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface CardDataStatsProps {
  title: string
  total: string | number
  rate: string
  levelUp?: boolean
  levelDown?: boolean
  children: ReactNode
  link ?: string
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  levelUp,
  levelDown,
  children,
  link
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {total}
          </h4>
          <Link to={link} className="text-sm font-medium w-full">{title}</Link>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium  ${
            levelUp && 'text-meta-3'
          } ${levelDown && 'text-meta-5'} `}
        >
          {rate}
        </span>
      </div>
    </div>
  )
}

export default CardDataStats
