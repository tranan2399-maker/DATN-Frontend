import { Link, useLocation } from 'react-router-dom'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ContextAuth, ContextMain } from '@/context/Context'
import { useContext } from 'react'
import UploadImage from './UploadImage'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation()
  const { userDetail } = useContext<ContextAuth>(ContextMain)

  return (
    <div className="sticky top-0 ">
      <div className="flex lg:flex-col  lg:items-center md:flex-row xs:flex-col xs:items-center md:space-x-5 lg:space-x-0 space-y-4 md:mb-5 xs:mb-5 lg:mt-3 pt-16">
        <Avatar className="lg:w-40 lg:h-40 xs:w-48 xs:h-48 ">
          <AvatarImage src={userDetail.message.avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <UploadImage />
      </div>
      <nav
        className={cn(
          'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2 flex-wrap ',
          className
        )}
        {...props}
      >
        {items.map((item) => {
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'profile' }),
                pathname === item.href
                  ? 'bg-background-secondary hover:bg-background-secondary text-primary-locationMovie hover:text-primary-locationMovie'
                  : 'hover:bg-transparent hover:underline hover:text-primary-locationMovie text-primary-locationMovie',
                'justify-start'
              )}
            >
              {item.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
