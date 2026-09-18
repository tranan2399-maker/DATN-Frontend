import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

function TooltipComponent({
  children,
  tooltip,
  className
}: {
  children: React.ReactNode
  tooltip: React.ReactNode
  className ?: string
}) {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className={`bg-primary-movieColor text-white text-xl ${className}`}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipComponent
