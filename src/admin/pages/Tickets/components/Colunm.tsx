import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { getDay, getHourAndMinute } from '@/utils'
import { filterStatusTicket } from '@/utils/methodArray'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

export const columns = [
  {
    id: 'select',
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'orderNumber',
    header: 'Mã vé',
    cell: ({ row }: any) => {
      return <div>{row.getValue('orderNumber')}</div>
    }
  },
  {
    accessorKey: 'image',
    header: <div className="w-18">Ảnh phim</div>,
    cell: ({ row }: any) => {
      return <img src={row.getValue('image')} width={50} />
    }
  },
  {
    accessorKey: 'name',
    header: <div className="w-30">Tên phim</div>,
    cell: ({ row }: any) => {
      return <div>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: 'email',
    header: <div className="w-30">Khách hàng</div>,
    cell: ({ row }: any) => {
      return <div>{row.getValue('email')}</div>
    }
  },

  {
    accessorKey: 'timeFrom',
    header: 'Ngày chiếu',
    cell: ({ row }: any) => {
      const formattedTime = getDay(row.getValue('timeFrom'))
      return <div className="w-25">{formattedTime}</div>
    }
  },
  {
    accessorKey: 'timeFrom',
    header: <div className="w-18">Giờ chiếu</div>,
    cell: ({ row }: any) => {
      const formattedTime = getHourAndMinute(row.getValue('timeFrom'))
      return <div className="">{formattedTime}</div>
    }
  },

  {
    accessorKey: 'totalPrice',
    header: <div className="w-20">Tổng tiền</div>,
    cell: ({ row }: any) => {
      const amount = parseFloat(row.getValue('totalPrice'))

      // Format the amount as a VNĐ amount
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    }
  },

  {
    accessorKey: 'status',
    header: <div className="w-20">Trạng thái</div>,
    cell: ({ row }: any) => {
      row.get
      // return <div>{status ? "Checked" : "unchecked"}</div>;
      const status = filterStatusTicket(row.getValue('status'))
      return <div>{status}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-sm px-3 py-2">
              <Link to={`/admin/tickets/detail/${row.original._id}`}>
                Chi tiết
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
export const columnsReserved = (onRemove: any) => [
  {
    id: 'select',
    header: ({ table }: any) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }: any) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },

  {
    accessorKey: 'orderNumber',
    header: 'Mã vé',
    cell: ({ row }: any) => {
      return <div>{row.getValue('orderNumber')}</div>
    }
  },
  {
    accessorKey: 'image',
    header: <div className="w-18">Ảnh phim</div>,
    cell: ({ row }: any) => {
      return <img src={row.getValue('image')} width={50} />
    }
  },
  {
    accessorKey: 'name',
    header: <div className="w-30">Tên phim</div>,
    cell: ({ row }: any) => {
      return <div>{row.getValue('name')}</div>
    }
  },
  {
    accessorKey: 'email',
    header: <div className="w-30">Khách hàng</div>,
    cell: ({ row }: any) => {
      return <div>{row.getValue('email')}</div>
    }
  },

  {
    accessorKey: 'timeFrom',
    header: 'Ngày chiếu',
    cell: ({ row }: any) => {
      const formattedTime = getDay(row.getValue('timeFrom'))
      return <div className="w-25">{formattedTime}</div>
    }
  },
  {
    accessorKey: 'timeFrom',
    header: <div className="w-18">Giờ chiếu</div>,
    cell: ({ row }: any) => {
      const formattedTime = getHourAndMinute(row.getValue('timeFrom'))
      return <div className="">{formattedTime}</div>
    }
  },

  {
    accessorKey: 'totalPrice',
    header: <div className="w-20">Tổng tiền</div>,
    cell: ({ row }: any) => {
      const amount = parseFloat(row.getValue('totalPrice'))

      // Format the amount as a VNĐ amount
      const formatted = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    }
  },

  {
    accessorKey: 'status',
    header: <div className="w-20">Trạng thái</div>,
    cell: ({ row }: any) => {
      row.get
      // return <div>{status ? "Checked" : "unchecked"}</div>;
      const status = filterStatusTicket(row.getValue('status'))
      return <div>{status}</div>
    }
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }: any) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="ghost" className="h-8 w-8 p-0 ">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-sm px-3 py-2"
              onClick={() => onRemove(row.original._id)}
            >
              Xóa vé
            </DropdownMenuItem>
            <DropdownMenuItem className="text-sm px-3 py-2">
              <Link to={`/admin/tickets/detail/${row.original._id}`}>
                Chi tiết
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]
