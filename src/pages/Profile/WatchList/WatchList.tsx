import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Grip, LayoutGrid, LayoutList, List, Trash, X } from 'lucide-react'
import { useContext } from 'react'
import { ContextMain } from '@/context/Context'
import HashLoader from 'react-spinners/HashLoader'
import useWatchList from '@/hooks/useWatchList'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteWatchList } from '@/api/watchList'
import { toast } from 'react-toastify'
import { WATCHLIST } from '@/utils/constant'
import { Link } from 'react-router-dom'

interface WatchListType {
  _id: string
  movieId: {
    name: string
    image: string
    categoryId: { name: string }[]
    desc: string
    slug: string
  }
}

function WatchList() {
  const { userDetail } = useContext(ContextMain)
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (id: string) => deleteWatchList(id),
    onSuccess: () => {
      toast.success('Remove watch list successfully', {
        position: 'top-right'
      })
      queryClient.invalidateQueries({
        queryKey: [WATCHLIST, userDetail?.message?._id]
      })
    },
    onError: () => {
      toast.error('Remove watch list failed', {
        position: 'top-right'
      })
    }
  })

  const { data: dataWatchList, isLoading } = useWatchList(userDetail)
  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  if (isLoading) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
  const categoryName = (categories: { name: string }[]) => {
    if (categories?.length === 0) return ''
    return categories?.map((cate: { name: string }) => cate.name).join(', ') ||[]
  }

  return (
    <Tabs defaultValue="Grip" className="w-full ">
      <TabsList className="grid w-[230px]  grid-cols-4 bg-background-secondary p-2.5">
        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor  py-3"
          value="Grip"
        >
          <Grip size={20} />
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor text-xl py-3"
          value="List"
        >
          <List size={20} />
        </TabsTrigger>
        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor text-xl py-3"
          value="LayoutList"
        >
          <LayoutList size={20} />
        </TabsTrigger>

        <TabsTrigger
          className="data-[state=active]:bg-background-main data-[state=active]:text-primary-movieColor text-xl py-3"
          value="LayoutGrid"
        >
          <LayoutGrid size={20} />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Grip" className="w-full">
        <div className="grid lg:grid-cols-5  sm:grid-cols-4 xs:grid-cols-3  w-full gap-5 mt-3">
          {dataWatchList &&
            dataWatchList.map((watchList: WatchListType) => {
              return (
                <div key={watchList._id}>
                  <div className="relative group overflow-hidden">
                    <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                      <Button className="bg-primary-movieColor rounded-full px-7 py-3 text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100">
                        <Link to={'/movie/' + watchList?.movieId?.slug}>
                          Đặt vé
                        </Link>
                      </Button>
                    </div>
                    <img
                      src={watchList?.movieId?.image||''}
                      alt=""
                      className="group-hover:blur-sm transition-all ease-out duration-500"
                    />
                  </div>
                  <div className="shadow-lg px-2 py-3 rounded-xl">
                    <div className="text-xl my-1.5 text-primary-infoMovie truncate">
                      {categoryName(watchList?.movieId?.categoryId)}
                    </div>
                    <h3 className="text-2xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                      {watchList?.movieId?.name || 'Not name'}
                    </h3>
                  </div>
                </div>
              )
            })}
        </div>
      </TabsContent>
      <TabsContent value="List">
        <div className="grid md:grid-cols-3 xs:grid-cols-2 w-full gap-5 mt-3">
          {dataWatchList &&
            dataWatchList.map((watchList: WatchListType) => {
              return (
                <div key={watchList._id}>
                  <div className="relative group overflow-hidden">
                    <div className="absolute top-0 z-30 left-0 w-full h-full flex items-center justify-center">
                      <Button className="bg-primary-movieColor rounded-full px-7 py-6  text-2xl group-hover:translate-y-0 duration-300 ease-out transition-all -translate-y-96 opacity-0 group-hover:opacity-100 font-semibold">
                        <Link to={'/movie/' + watchList?.movieId?.slug}>
                          Đặt vé
                        </Link>
                      </Button>
                      <Button
                        onClick={() => mutate(watchList._id)}
                        className="absolute hover:text-primary-movieColor top-3 right-0 group-hover:translate-y-0 duration-300 ease-out transition-all delay-100 opacity-0 group-hover:opacity-100 -translate-y-96"
                      >
                        <Trash />
                      </Button>
                    </div>
                    <img
                      src={watchList?.movieId?.image||''}
                      alt=""
                      className="group-hover:blur-sm transition-all ease-out duration-500"
                    />
                  </div>
                  <div className="shadow-lg px-2 py-5 pt-3 rounded-xl">
                    <div className="text-2xl my-4 mt-1 text-primary-infoMovie">
                      {categoryName(watchList?.movieId?.categoryId)}
                    </div>
                    <h3 className="text-3xl font-semibold text-primary-movieColor truncate text-ellipsis overflow-hidden">
                      {watchList?.movieId?.name || 'Not name'}
                    </h3>
                  </div>
                </div>
              )
            })}
        </div>
      </TabsContent>
      <TabsContent value="LayoutList">
        <div className="flex flex-col w-full gap-5 mt-3">
          {dataWatchList &&
            dataWatchList.map((watchList: WatchListType) => {
              return (
                <div className="flex" key={watchList._id}>
                  <div className="relative group overflow-hidden basis-1/5">
                    <img
                      src={watchList?.movieId?.image ||''}
                      alt=""
                      className="group-hover:blur-sm transition-all ease-out duration-500"
                    />
                  </div>
                  <div className="shadow-lg px-2 ms-3  rounded-xl basis-4/5">
                    <div className="text-2xl flex justify-between  text-primary-infoMovie">
                      <span>
                        {categoryName(watchList?.movieId?.categoryId)}
                      </span>
                      <span
                        onClick={() => mutate(watchList._id)}
                        className="mr-3 hover:text-primary-movieColor hover:cursor-pointer"
                      >
                        <X size={20} />
                      </span>
                    </div>
                    <h3 className="text-3xl font-semibold my-2 text-primary-movieColor truncate text-ellipsis overflow-hidden">
                      {watchList?.movieId?.name || 'Not name'}
                    </h3>
                    <p className="text-2xl break-all xs:hidden sm:block   mt-2 sm:truncate sm:max-w-3xl md:max-w-6xl md:whitespace-normal    text-ellipsis overflow-hidden">
                      {watchList?.movieId?.desc || 'Not name'}
                    </p>
                    <Button
                      variant={'outline'}
                      className="border-2 rounded-xl text-2xl mt-6 py-3 text-primary-locationMovie font-bold"
                    >
                      <Link to={'/movie/' + watchList?.movieId?.slug}>
                        Đặt vé
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
        </div>
      </TabsContent>
      <TabsContent value="LayoutGrid">
        <div className="grid lg:grid-cols-2 xs:grid-cols-1 w-full gap-5 mt-3">
          {dataWatchList &&
            dataWatchList.map((watchList: WatchListType) => {
              return (
                <div className="flex" key={watchList._id}>
                  <div className="relative group overflow-hidden lg:basis-1/4 md:basis-1/5 sm:basis-1/3 xs:basis-1/5">
                    <img
                      src={watchList?.movieId?.image||''}
                      alt=""
                      className="group-hover:blur-sm transition-all ease-out duration-500"
                    />
                  </div>
                  <div className="shadow-lg px-2 ms-3  rounded-xl basis-4/5">
                    <div className="lg:text-xl sm:text-2xl xs:text-xl flex justify-between  text-primary-infoMovie">
                      <span>
                        {categoryName(watchList?.movieId?.categoryId)}
                      </span>
                      <span
                        onClick={() => mutate(watchList._id)}
                        className="mr-3 hover:text-primary-movieColor hover:cursor-pointer"
                      >
                        <X size={20} />
                      </span>
                    </div>
                    <h3 className="lg:text-2xl sm:text-3xl xs:text-2xl font-semibold my-1 text-primary-movieColor truncate text-ellipsis overflow-hidden">
                      {watchList?.movieId?.name || 'Not name'}
                    </h3>
                    <p className="lg:text-xl sm:text-2xl break-all xs:hidden sm:block   mt-2  lg:truncate md:w-[500px]  lg:w-[200px] text-ellipsis overflow-hidden">
                      {watchList?.movieId?.desc || 'Not name'}
                    </p>
                    <Button
                      variant={'outline'}
                      className="border-2 rounded-xl lg:text-xl sm:text-2xl xs:text-xl mt-6 py-3 text-primary-locationMovie font-bold"
                    >
                      <Link to={'/movie/' + watchList?.movieId?.slug}>
                        Đặt vé
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default WatchList
