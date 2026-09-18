import { ReactNode, useState } from 'react'

interface SidebarLinkGroupProps {
  // eslint-disable-next-line no-unused-vars
  children: (handleClick: () => void, open: boolean) => ReactNode
  activeCondition: boolean
}

const SidebarLinkGroup = ({
  children,
  activeCondition
}: SidebarLinkGroupProps) => {
  const [open, setOpen] = useState<boolean>(activeCondition)

  const handleClick = () => {
    setOpen(!open)
  }

  return <li>{children(handleClick, open)}</li>
}

export default SidebarLinkGroup
