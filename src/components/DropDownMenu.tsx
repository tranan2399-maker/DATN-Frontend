import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import {
  CreditCard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  Settings,
  User
} from 'lucide-react'
import { ContextAuth, ContextMain } from '@/context/Context'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import TooltipComponent from './TooltipComponent'
import { useContext } from 'react'
import { ROLE_ADMIN, ROLE_STAFF } from '@/utils/constant'

function DropDownMenu() {
  const { userDetail, logout } = useContext<ContextAuth>(ContextMain)

  return (
    <DropdownMenu>
      <TooltipComponent tooltip={'Tài khoản của bạn'}>
        <DropdownMenuTrigger asChild>
          <Button>
            <p
              className="nav-signed-name flex items-center gap-2 text-2xl hover:text-gray-400 cursor-pointer"
              // onClick={toggleShowProfile}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={
                    userDetail?.message.avatar ||
                    'https://github.com/shadcn.png'
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>{' '}
              {userDetail?.message?.name}
            </p>
          </Button>
        </DropdownMenuTrigger>
      </TooltipComponent>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to={'/profile/forms'}>
            <DropdownMenuItem>
              <User className="mr-2 h-6 w-6" />
              <span>Cá nhân</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to={'/profile/bill'}>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-6 w-6" />
              <span>Lịch sử mua</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link to={'/profile/forms/appearance'}>
            <DropdownMenuItem>
              <Settings className="mr-2 h-6 w-6" />
              <span>Cài đặt</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-6 w-6" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-6 w-6" />
                  <span>Tin nhắn</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle className="mr-2 h-6 w-6" />
                  <span>Hơn...</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        {[ROLE_ADMIN, ROLE_STAFF].includes(userDetail?.message?.roleIds) && (
          <Link to={'/admin'}>
            <DropdownMenuItem>
              <LifeBuoy className="mr-2 h-6 w-6" />
              <span>Quản trị</span>
            </DropdownMenuItem>
          </Link>
        )}

        <DropdownMenuSeparator />
        <AlertDialog>
          {/* <DropdownMenuItem> */}
          <AlertDialogTrigger asChild>
            {/* <Button variant="outline"> */}
            <div className="flex px-5 text-2xl py-3 items-center">
              <LogOut className="mr-2 h-6 w-6" />
              <span>Đăng xuất</span>
            </div>

            {/* </Button> */}
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-primary-nameMovie">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl text-background-main mt-3 font-bold">
                Bạn có chắc chắn muốn đăng xuất không?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-xl py-3">
                Đăng xuất sẽ khiến bạn thoát ra khỏi tài khoản và dừng mọi hành
                động đặt vé. Hãy cân nhắc nếu bạn đang đặt vé hoặc không nhớ mật
                khẩu hoặc tài khoản.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-2xl px-4 py-3 bg-primary-nameMovie text-background-main font-bold">
                Hủy
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-primary-movieColor text-2xl px-4 py-3"
                onClick={logout}
              >
                Tiếp tục
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          {/* </DropdownMenuItem> */}
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default DropDownMenu
