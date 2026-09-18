import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Building, Mail, Phone, User } from 'lucide-react'

import { ContextMain } from '@/context/Context'
import { useContext } from 'react'
import UserDialogConfirm from './UserDialogConfirm'

function UserConfirmPayment() {
  const { userDetail } = useContext(ContextMain)

  return (
    <Accordion
      type="multiple"
      // collapsible
      defaultValue={['item-1']}
      className="bg-background-four my-[28px] dark:shadow-lg"
    >
      <AccordionItem value="item-1" className="shadow-xl">
        <AccordionTrigger className="px-10 py-5 border-[1px] border-primary-movieColor  text-2xl rounded-t-lg">
          Thông tin người dùng
        </AccordionTrigger>
        <AccordionContent className="overflow-hidden border-[1px] rounded-b-lg border-primary-movieColor border-t-transparent">
          <div className="flex flex-col w-full items-start  px-10 py-10">
            <div className="flex md:items-center md:flex-row xs:flex-col md:gap-10 w-full">
              <div className="flex items-center md:basis-1/2 xs:flex-auto overflow-hidden  px-6 py-5   bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <User size={16} />{' '}
                  </span>
                  <span className="text-2xl ms-2 flex items-end min-w-32">
                    Tên :
                  </span>
                </div>

                <span className="ms-10 text-2xl flex items-end text-primary-movieColor truncate font-semibold overflow-hidden">
                  {userDetail.message.name}
                </span>
              </div>

              <div className="flex items-center md:basis-1/2 xs:basis-full overflow-hidden px-6 py-5 bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <Mail size={16} />{' '}
                  </span>
                  <span className="text-2xl ms-2 flex items-end min-w-32">
                    Email :
                  </span>
                </div>
                <span className="ms-10 text-2xl flex items-end text-primary-movieColor truncate font-semibold overflow-hidden">
                  {userDetail.message.email}
                </span>
              </div>
            </div>

            <div className="flex md:items-center md:flex-row xs:flex-col md:gap-10 w-full">
              <div className="flex items-center md:basis-1/2 xs:basis-full overflow-hidden  px-6 py-5   bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <Building size={16} />{' '}
                  </span>
                  <span className=" text-2xl ms-2 flex items-end min-w-32">
                    Địa chỉ :
                  </span>
                </div>

                <p className="ms-10 text-2xl flex items-end truncate   text-primary-movieColor text-ellipsis overflow-hidden font-semibold ">
                  {userDetail?.message?.address ?? 'No address'}
                </p>
              </div>

              <div className="flex items-center  px-6 py-5 md:basis-1/2 xs:basis-full  bg-background-secondary my-2 rounded-lg">
                <div className="w-36 flex items-center">
                  <span className="mb-1.5">
                    <Phone size={16} />{' '}
                  </span>
                  <span className="text-2xl ms-2 flex items-end min-w-32">
                    Điện thoại :
                  </span>
                </div>
                <span className="ms-10 text-2xl flex items-end text-primary-movieColor font-semibold">
                  {userDetail?.message?.mobile ?? 'No phone'}
                </span>
              </div>
            </div>
            <UserDialogConfirm />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default UserConfirmPayment
