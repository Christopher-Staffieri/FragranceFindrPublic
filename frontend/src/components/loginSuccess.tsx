import { AnimatePresence, motion } from "framer-motion";
import { X, Check } from "lucide-react";
import { useState } from "react";


export default function LoginSuccess(){
    const [showSuccess, setShowSuccess] = useState(true)
    return(
        <>
            <AnimatePresence>
        {showSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setShowSuccess(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-white dark:bg-[#2B2D30] rounded-2xl shadow-xl p-6"
            >
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-[#707070] dark:text-[#A0A0A0] hover:text-[#2E2E2E] dark:hover:text-[#ECECEC] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]">
                  Successfully verified
                </h2>
                <p className="text-[#707070] dark:text-[#A0A0A0]">
                  Welcome to your account!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
        </>
    )
}