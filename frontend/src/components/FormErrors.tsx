// export default function FormErrors (props) {
//   if (!props.errors || !props.errors.length) {
//     return null
//   }
//   const errors = props.errors.filter(error => (props.param ? error.param === props.param : error.param == null))
//   if (!errors.length) {
//     return null
//   }
//   return <ul style={{ color: 'darkred' }}>{errors.map((e, i) => <li key={i}>{e.message}</li>)}</ul>
// }

import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, X } from "lucide-react";
import { useState } from "react";

interface FormErrorProps {
  errors?: any 
  // string[] | string | null
  className?: string
  dismissible?: boolean
  onDismiss?: () => void
}

export default function FormErrors ({errors, className, dismissible = false, onDismiss} : FormErrorProps) {
  const [dismissed, setDismissed] = useState(false)

   // If there are no errors or the error has been dismissed, don't render anything
  if (!errors || dismissed) return null

  // Convert string error to array
  const errorArray = Array.isArray(errors) ? errors : [errors]
  console.log(errorArray)
  errorArray.filter((error) => console.log(error))

  // Filter out empty error messages
  const filteredErrors = errorArray.filter((error) => error && error.message.trim() !== "")

  const handleDismiss = () => {
    setDismissed(true)
    onDismiss?.()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ opacity: 1, y: 0, height: "auto" }}
        exit={{ opacity: 0, y: -10, height: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
          opacity: { duration: 0.2 },
        }}
        className={`relative overflow-hidden rounded-lg border border-light-secondary/20 dark:border-dark-secondary/30 bg-light-secondary/10 dark:bg-dark-secondary/15 p-4 ${className}`}
      >
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              <AlertCircle className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
            </motion.div>
          </div>

          <div className="flex-1 pt-0.5">
            {filteredErrors.length === 1 ? (
              <motion.p
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm font-medium text-light-secondary dark:text-dark-secondary"
              >
                {filteredErrors[0].message}
              </motion.p>
            ) : (
              <motion.ul className="ml-2 list-disc space-y-1 text-sm text-light-secondary dark:text-dark-secondary">
                {filteredErrors.map((error, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="font-medium"
                  >
                    {error.message}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </div>

          {dismissible && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="absolute right-3 top-3 rounded-full p-1 text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-secondary/10 dark:hover:bg-dark-secondary/20 hover:text-light-secondary dark:hover:text-dark-secondary transition-colors"
              aria-label="Dismiss error"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>

        {/* Animated border effect */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-light-secondary dark:bg-dark-secondary"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>
    </AnimatePresence>
  )

}