
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { CheckCircle, X } from "lucide-react"
import { Button } from "../MainButton"

interface PasswordChangeSuccessPopupProps {
  onClose: () => void
}

export default function PasswordChangeSuccessPopup({ onClose }: PasswordChangeSuccessPopupProps) {
  const [progress, setProgress] = useState(100)

  // Auto-close progress animation
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer)
          return 0
        }
        return prevProgress - 0.5
      })
    }, 25)

    return () => clearInterval(timer)
  }, [])

  // Close when progress reaches 0
  useEffect(() => {
    if (progress <= 0) {
      onClose()
    }
  }, [progress, onClose])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Popup Content */}
      <motion.div
        className="relative w-full max-w-md overflow-hidden rounded-xl bg-light-surface dark:bg-dark-surface shadow-xl"
        initial={{ scale: 0.9, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 20, opacity: 0 }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 300,
        }}
      >
        {/* Progress Bar */}
        <motion.div
          className="absolute top-0 left-0 h-1 bg-light-primary dark:bg-dark-primary"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-70 transition-opacity hover:opacity-100"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>

        <div className="p-6">
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{
                type: "spring",
                damping: 15,
                stiffness: 200,
                delay: 0.2,
              }}
              className="mb-4 rounded-full bg-green-100 dark:bg-green-900/30 p-3"
            >
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-xl font-semibold text-light-text-primary dark:text-dark-text-primary"
            >
              Password Updated Successfully
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-6 text-light-text-secondary dark:text-dark-text-secondary"
            >
              Your password has been changed successfully. Your account is now secure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex gap-3"
            >
              <Button
                onClick={onClose}
                className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
              >
                Got it
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-light-primary/10 dark:bg-dark-primary/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />

        <motion.div
          className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-light-secondary/10 dark:bg-dark-secondary/10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </motion.div>
    </motion.div>
  )
}

