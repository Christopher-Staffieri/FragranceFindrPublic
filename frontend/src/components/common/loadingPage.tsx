import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";


export default function LoadingPage(){

    return(
        <div className="min-h-screen w-full flex items-center justify-center bg-[#F4F5F7] dark:bg-[#1E1F21]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0, 0.2, 1]
        }}
        className="flex flex-col items-center gap-6 p-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatDelay: 0.25
          }}
          className="relative"
        >
          <Loader2 className="w-12 h-12 text-[#4A90E2] animate-spin" />
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(74, 144, 226, 0.2)",
                "0 0 0 16px rgba(74, 144, 226, 0)",
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

        <div className="space-y-2 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-[#2E2E2E] dark:text-[#ECECEC]"
          >
            Loading
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#707070] dark:text-[#A0A0A0]"
          >
            Preparing your experience...
          </motion.p>
        </div>

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity
          }}
          className="h-1 bg-[#4A90E2] rounded-full w-48"
        />
      </motion.div>
    </div>
    )
}