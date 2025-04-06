import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  indicatorClassName?: string
  textValue?: string
  showValue?: boolean
  animated?: boolean
  inView?: boolean
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ 
  className, 
  value = 0, 
  indicatorClassName,
  textValue,
  showValue = false,
  animated = true,
  inView = true,
  ...props
}, ref) => {
  // Ensure the value is between 0 and 100
  const safeValue = Math.min(Math.max(0, value || 0), 100)
  
  return (
    <div className="relative w-full">
      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800",
          className
        )}
        {...props}
      >
        {animated && inView ? (
          <motion.div
            className={cn(
              "h-full w-full flex-1 bg-blue-600 dark:bg-blue-400 transition-all relative",
              indicatorClassName
            )}
            initial={{ width: 0 }}
            animate={{ width: `${safeValue}%` }}
            transition={{ 
              duration: 1.2, 
              ease: [0.34, 1.56, 0.64, 1], // Custom spring-like ease
              delay: 0.2
            }}
            style={{
              willChange: "width",
            }}
          />
        ) : (
          <ProgressPrimitive.Indicator
            className={cn(
              "h-full w-full flex-1 bg-blue-600 dark:bg-blue-400 transition-all relative",
              indicatorClassName
            )}
            style={{ transform: `translateX(-${100 - safeValue}%)` }}
          />
        )}
      </ProgressPrimitive.Root>
      
      {/* Gradient overlay for fancy effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-20" />
      </div>
      
      {/* Value label */}
      {showValue && (
        <div className="absolute -right-1 -top-6 text-xs font-medium">
          {textValue || `${safeValue}%`}
        </div>
      )}
      
      {/* Visual decorations */}
      <div className="absolute h-1/2 w-full top-0 left-0 bg-gradient-to-b from-white/20 to-transparent opacity-30 rounded-full" />
    </div>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }