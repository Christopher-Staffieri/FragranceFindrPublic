
import { motion } from "framer-motion"
import { Loader2 } from 'lucide-react'
import { cn } from "../../lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
  showText?: boolean
}

export default function LoadingSpinner({ 
  size = "md", 
  className,
  showText = false 
}: LoadingSpinnerProps = {}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center gap-3",
      className
    )}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative"
      >
        <Loader2 
          className={cn(
            "text-[#4A90E2] animate-spin",
            sizeClasses[size]
          )} 
        />
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 0px rgba(74, 144, 226, 0.2)",
              "0 0 0 8px rgba(74, 144, 226, 0)",
            ]
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            times: [0, 1],
            repeat: Infinity
          }}
        />
      </motion.div>
      
      {showText && (
        <motion.span
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-medium text-[#707070] dark:text-[#A0A0A0]"
        >
          Loading...
        </motion.span>
      )}
    </div>
  )
}