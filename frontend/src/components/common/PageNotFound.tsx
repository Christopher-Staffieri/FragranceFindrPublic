import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Droplets } from "lucide-react"
import { Link } from "react-router-dom"

export default function PageNotFound() {
    const [isDark, setIsDark] = useState(false)
    const [isHovering, setIsHovering] = useState(false)
  
    // Check for dark mode
    useEffect(() => {
      const isDarkMode = document.documentElement.classList.contains("dark")
      setIsDark(isDarkMode)
    }, [])
  
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-light-background dark:bg-dark-background px-4 overflow-hidden">
        <div className="max-w-3xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <motion.div
              className="absolute -top-32 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 2, 0, -2, 0],
              }}
              transition={{
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 0.9, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                >
                  <Droplets className="h-16 w-16 text-light-primary/20 dark:text-dark-primary/20" />
                </motion.div>
  
                <svg width="120" height="200" viewBox="0 0 120 200" className="mx-auto">
                  {/* Bottle */}
                  <motion.path
                    d="M40 60 L40 30 L80 30 L80 60 L95 80 L95 180 L25 180 L25 80 Z"
                    fill={isDark ? "#2B2D30" : "#FFFFFF"}
                    stroke={isDark ? "#4A90E2" : "#4A90E2"}
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
  
                  {/* Bottle cap */}
                  <motion.rect
                    x="45"
                    y="10"
                    width="30"
                    height="20"
                    rx="2"
                    fill={isDark ? "#4A90E2" : "#4A90E2"}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 10, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                  />
  
                  {/* Liquid */}
                  <motion.path
                    d="M30 180 L30 100 C30 90, 90 90, 90 100 L90 180 Z"
                    fill={isDark ? "#4A90E2" : "#4A90E2"}
                    fillOpacity="0.3"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 1 }}
                  />
  
                  {/* Liquid waves */}
                  <motion.path
                    d="M30 100 C40 95, 50 105, 60 100 C70 95, 80 105, 90 100"
                    fill="none"
                    stroke={isDark ? "#4A90E2" : "#4A90E2"}
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      y: [0, -5, 0],
                    }}
                    transition={{
                      delay: 1,
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                    }}
                  />
                </svg>
              </div>
            </motion.div>
  
            <motion.h1
              className="text-8xl font-bold text-light-primary dark:text-dark-primary mt-32"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
            >
              404
            </motion.h1>
          </motion.div>
  
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            <h2 className="text-3xl font-semibold mt-6 text-light-text-primary dark:text-dark-text-primary">
              Scent Not Found
            </h2>
            <p className="mt-4 text-light-text-secondary dark:text-dark-text-secondary max-w-md mx-auto">
              The fragrance you're looking for seems to have evaporated. Perhaps it was too volatile, or maybe the URL has
              changed notes.
            </p>
  
            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Link to="/">
                <motion.div
                  className="inline-flex items-center px-6 py-3 rounded-full bg-light-primary dark:bg-dark-primary text-white font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onHoverStart={() => setIsHovering(true)}
                  onHoverEnd={() => setIsHovering(false)}
                >
                  <motion.span
                    animate={{ x: isHovering ? -4 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                  </motion.span>
                  Return Home
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
  
          <motion.div
            className="mt-16 text-light-text-secondary dark:text-dark-text-secondary text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p>Try searching for another fragrance or browse our collections</p>
          </motion.div>
        </div>
  
        {/* Background decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-light-secondary/5 dark:bg-dark-secondary/5"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>
      </div>
    )
  }