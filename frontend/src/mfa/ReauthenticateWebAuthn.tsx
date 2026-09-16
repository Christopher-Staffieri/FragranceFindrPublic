import { useState } from 'react'
import { Flows, getWebAuthnRequestOptionsForReauthentication, reauthenticateUsingWebAuthn } from '../lib/allauth'
import ReauthenticateFlow from '../account/ReauthenticateFlow'
// import Button from '../components/Button'
import { motion, AnimatePresence } from "framer-motion"
import {
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  Fingerprint,
  ChevronRight,
  Usb,
  Key,
} from "lucide-react"
import { Button } from "../components/MainButton"
import { Alert, AlertDescription } from "../components/common/alert"
import {
  parseRequestOptionsFromJSON,
  get
} from '@github/webauthn-json/browser-ponyfill'



export default function ReauthenticateWebAuthn () {
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)
  const [securityKeyAnimationComplete, setSecurityKeyAnimationComplete] = useState(false)
  const [authMethod, setAuthMethod] = useState<"password" | "recovery" | "security">("security")

  async function submit (e) {
    e.preventDefault()
    setResponse({ ...response, fetching: true })
    try {
      const optResp = await getWebAuthnRequestOptionsForReauthentication()
      const jsonOptions = optResp.data.request_options
      const options = parseRequestOptionsFromJSON(jsonOptions)
      const credential = await get(options)
      const reauthResp = await reauthenticateUsingWebAuthn(credential)
      setResponse((r) => { return { ...r, content: reauthResp } })
    } catch (e) {
      console.error(e)
      window.alert(e)
    }
    setResponse((r) => { return { ...r, fetching: false } })
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    setResponse({ ...response, fetching: true })
    try {
      const optResp = await getWebAuthnRequestOptionsForReauthentication()
      const jsonOptions = optResp.data.request_options
      const options = parseRequestOptionsFromJSON(jsonOptions)
      const credential = await get(options)
      const reauthResp = await reauthenticateUsingWebAuthn(credential)
      setIsSuccess(true)
      setTimeout(() => {
        setResponse((r) => { return { ...r, content: reauthResp } })
      }, 2000)

    } catch (e) {
      setError("Authentication failed. Please try again.")
      console.error(e)
      window.alert(e)
    }
    setResponse((r) => { return { ...r, fetching: false } })
    setIsSubmitting(false)
    
    

    // try {
    //   // Simulate API call
    //   await new Promise((resolve) => setTimeout(resolve, 1500))

    //   // For demo purposes, let's assume authentication is successful
      

    //   // Redirect after showing success state
    //   setTimeout(() => {
    //     router.push("/dashboard/account/activate-totp")
    //   }, 1500)
    // } catch (err) {
    //   setError("Authentication failed. Please try again.")
    // } finally {
    //   setIsSubmitting(false)
    // }
  }
  console.log('hit this')

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

  const securityKeyAnimationVariants = {
    initial: {
      y: 0,
      opacity: 1,
    },
    connecting: {
      y: [0, -10, 0],
      opacity: [1, 0.7, 1],
      transition: {
        duration: 1.5,
        repeat: 2,
        repeatType: "loop",
      },
    },
    connected: {
      scale: [1, 1.1, 1],
      boxShadow: [
        "0 0 0 0 rgba(74, 144, 226, 0)",
        "0 0 0 15px rgba(74, 144, 226, 0.3)",
        "0 0 0 0 rgba(74, 144, 226, 0)",
      ],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
      },
    },
  }

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
        className="absolute bottom-20 left-40 w-80 h-80 rounded-full bg-light-primary/5 dark:bg-dark-primary/5"
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
              <Fingerprint className="w-8 h-8 text-light-primary dark:text-dark-primary" />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div key="auth-form" initial="hidden" animate="visible" exit="exit" variants={containerVariants}>
                <motion.h1
                  variants={itemVariants}
                  className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2 text-center"
                >
                  Security Key Authentication
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center"
                >
                  Use your security key to authenticate
                </motion.p>

                <AnimatePresence mode="wait">
                    <motion.div
                      key="security-method"
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={containerVariants}
                      className="space-y-6"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="p-6 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border"
                      >
                        <div className="flex flex-col space-y-6">
                          {/* Windows Hello Option */}
                          <motion.div
                            className="p-4 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-light-primary dark:hover:border-dark-primary cursor-pointer"
                            whileHover={{ scale: 1.02, borderColor: "rgba(74, 144, 226, 0.8)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSecurityKeyAnimationComplete(true)}
                          >
                            <div className="flex items-center gap-4">
                              <motion.div
                                className="w-12 h-12 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(74, 144, 226, 0)",
                                    "0 0 0 8px rgba(74, 144, 226, 0.1)",
                                    "0 0 0 0 rgba(74, 144, 226, 0)",
                                  ],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                }}
                              >
                                <Fingerprint className="w-6 h-6 text-light-primary dark:text-dark-primary" />
                              </motion.div>
                              <div>
                                <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                  Windows Hello
                                </h3>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                  Use your PC's biometric authentication
                                </p>
                              </div>
                              {securityKeyAnimationComplete && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>

                          {/* Divider with OR text */}
                          <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                              <div className="w-full border-t border-light-border dark:border-dark-border"></div>
                            </div>
                            <div className="relative px-4 bg-light-background dark:bg-dark-background text-sm text-light-text-secondary dark:text-dark-text-secondary">
                              OR
                            </div>
                          </div>

                          {/* Security Key Option */}
                          <motion.div
                            className="p-4 rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-light-primary dark:hover:border-dark-primary cursor-pointer"
                            whileHover={{ scale: 1.02, borderColor: "rgba(74, 144, 226, 0.8)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSecurityKeyAnimationComplete(true)}
                          >
                            <div className="flex items-center gap-4">
                              <motion.div
                                className="w-12 h-12 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center"
                                animate={{
                                  boxShadow: [
                                    "0 0 0 0 rgba(74, 144, 226, 0)",
                                    "0 0 0 8px rgba(74, 144, 226, 0.1)",
                                    "0 0 0 0 rgba(74, 144, 226, 0)",
                                  ],
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                }}
                              >
                                <Usb className="w-6 h-6 text-light-primary dark:text-dark-primary" />
                              </motion.div>
                              <div>
                                <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                                  Security Key
                                </h3>
                                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                  Insert and tap your physical security key
                                </p>
                              </div>
                              {securityKeyAnimationComplete && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>

                          {securityKeyAnimationComplete && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                              className="flex items-center justify-center mt-2 text-sm text-light-text-secondary dark:text-dark-text-secondary"
                            >
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7],
                                }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  repeatType: "loop",
                                }}
                                className="w-2 h-2 rounded-full bg-green-500 mr-2"
                              />
                              Ready to authenticate
                            </motion.div>
                          )}
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
                      onClick={(event) => handleConfirm(event)}
                      className="w-full h-12 bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white font-medium text-lg shadow-md"
                      disabled={isSubmitting || (authMethod === "security" && !securityKeyAnimationComplete)}
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
                          {authMethod === "recovery" ? (
                            <RefreshCw className="mr-2 h-5 w-5" />
                          ) : authMethod === "password" ? (
                            <Lock className="mr-2 h-5 w-5" />
                          ) : (
                            <Fingerprint className="mr-2 h-5 w-5" />
                          )}
                          <span>
                            {authMethod === "password"
                              ? "Confirm Password"
                              : authMethod === "recovery"
                                ? "Confirm Recovery Code"
                                : securityKeyAnimationComplete
                                  ? "Continue Authentication"
                                  : "Select Authentication Method"}
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

                {/* Alternative Options */}
                <motion.div variants={itemVariants} className="mt-6">
                  <ReauthenticateFlow pageMethod={"mfa_reauthenticate:webauthn"}/>
                </motion.div>
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
          <Fingerprint className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
          <AlertDescription className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
            You can authenticate using Windows Hello (your PC's biometric authentication) or a physical security key.
            Both methods provide strong, phishing-resistant authentication.
          </AlertDescription>
        </div>
      </Alert>
    </motion.div>
  </div>
    
  )
}