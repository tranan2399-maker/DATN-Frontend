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
interface AlertDialogType {
  title: string
  description: string
  children: React.ReactNode
  fnContinue: () => void
  clxCancle?: string
  clxContinue?: string
  clxContent ?: string
}
function AlertDialogCustom({
  title,
  description,
  children,
  fnContinue,
  clxCancle,
  clxContinue,
  clxContent
}: AlertDialogType) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className={clxContent}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className={clxCancle}>Cancel</AlertDialogCancel>
          <AlertDialogAction className={clxContinue} onClick={fnContinue}>
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDialogCustom
