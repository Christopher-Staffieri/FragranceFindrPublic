import { useState, useRef, useEffect } from "react"
import FormErrors from '../components/FormErrors'
import { reauthenticate, Flows } from '../lib/allauth'
import ReauthenticateFlow from './ReauthenticateFlow'
// import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
import { Label } from "../components/Label"
import { Alert, AlertDescription } from "../components/common/alert"
import DashboardSideNavbar from "../layouts/navbar-sidebar"

export default function Reauthenticate () {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = () => {
    if (!password) {
      setError("Please enter your password")
      return
    }
    setIsSubmitting(true)
    setError("")
    setResponse({ ...response, fetching: true })
    reauthenticate({ password }).then((content) => {
      setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      setError("Authentication failed. Please try again.")
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
      setIsSubmitting(false)
    })
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    pulse: {
      scale: [1, 1.05, 1],
      boxShadow: [
        "0 0 0 0 rgba(74, 144, 226, 0)",
        "0 0 0 10px rgba(74, 144, 226, 0.1)",
        "0 0 0 0 rgba(74, 144, 226, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }
  console.log(error)
  return (
    
      <div className="min-h-screen w-full flex items-center justify-center bg-light-background dark:bg-dark-background p-4">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
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
          className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-light-secondary/5 dark:bg-dark-secondary/5"
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="relative bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border">
          {/* Header with gradient accent */}
          <div className="h-2 bg-gradient-to-r from-light-primary to-light-primary/70 dark:from-dark-primary dark:to-dark-primary/70" />

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <motion.div
                initial="hidden"
                animate={["visible", "pulse"]}
                variants={iconVariants}
                className="w-16 h-16 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-light-primary dark:text-dark-primary" />
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div key="auth-form" initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
                  <motion.h1
                    variants={itemVariants}
                    className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2 text-center"
                  >
                    Confirm Access
                  </motion.h1>
                  <motion.p
                    variants={itemVariants}
                    className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center"
                  >
                    Please reauthenticate to safeguard your account
                  </motion.p>

                  <AnimatePresence mode="wait">
                      <motion.div
                        key="password-method"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={containerVariants}
                        className="space-y-6"
                      >
                        <motion.div variants={itemVariants} className="space-y-2">
                          <Label htmlFor="password" className="text-light-text-primary dark:text-dark-text-primary">
                            Enter your password:
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                            </div>
                            <Input
                              id="password"
                              ref={inputRef}
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-10 pr-10 bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border"
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                  
                  </AnimatePresence>

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500"
                    >
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                      </div>
                    </motion.div>
                  )}

                  <motion.div variants={itemVariants} className="mt-6">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        className="w-full h-12 bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white font-medium text-lg shadow-md"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <motion.div
                              className="h-5 w-5 rounded-full border-2 border-t-transparent border-white"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            <span className="ml-2">Verifying...</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center">
                            <Lock className="mr-2 h-5 w-5" />
                            <span>
                              Confirm Password
                              
                            </span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>

                  <motion.div variants={itemVariants} className="mt-4 text-center">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary"
                      // onClick={() => router.push("/dashboard/account?tab=security")}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <ReauthenticateFlow pageMethod={"reauthenticate"}/>
                </motion.div>
                
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
                  >
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
                    Authentication Successful
                  </h3>

                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Redirecting you to continue the process...
                  </p>

                  <motion.div className="w-full bg-light-border dark:bg-dark-border h-1 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5 }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <Alert className="mt-4 bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
          <div className="flex items-start gap-2">
            <Shield className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
            <AlertDescription className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
              For your security, we require verification before making changes to your account's security settings. Your
              password is never stored in plain text and is securely encrypted.
            </AlertDescription>
          </div>
        </Alert>
      </motion.div>
    </div>
    
  )
}
