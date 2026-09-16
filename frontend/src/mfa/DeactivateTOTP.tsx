import { useState } from 'react'
import * as allauth from '../lib/allauth'
import { Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { Shield, AlertTriangle, CheckCircle, ArrowLeft, Lock } from "lucide-react"
import { Button } from "../components/MainButton"
import { Alert, AlertDescription } from "../components/common/alert"
import { Separator } from "../components/common/separator"

export default function DeactivateTOTP (props) {
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [isConfirming, setIsConfirming] = useState(false)
  const [isDeactivating, setIsDeactivating] = useState(false)
  const [isDeactivated, setIsDeactivated] = useState(false)

  

  const handleDeactivation = () => {
    setResponse({ ...response, fetching: true })
    setIsDeactivating(true)
    allauth.deactivateTOTPAuthenticator().then((content) => {
      setResponse((r) => { return { ...r, content } })
      // console.log('got to here')
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setIsDeactivating(false)
      setIsDeactivated(true)
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  if (response.content?.status === 200) {
    // console.log('navigated')
    return <Navigate to='/account/account-details' />
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-light-background dark:bg-dark-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
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

        <div className="relative bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border">
          {/* Header with gradient accent */}
          <div className="h-2 bg-gradient-to-r from-light-secondary to-light-primary dark:from-dark-secondary dark:to-dark-primary" />

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, -10, 0] }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-16 h-16 rounded-full bg-light-secondary/10 dark:bg-dark-secondary/20 flex items-center justify-center"
              >
                <Shield className="w-8 h-8 text-light-secondary dark:text-dark-secondary" />
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {!isDeactivated ? (
                <motion.div
                  key="deactivate-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2 text-center">
                    Deactivate Authenticator App
                  </h1>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center">
                    You are about to disable two-factor authentication for your account
                  </p>

                  <Alert className="mb-6 bg-light-secondary/5 dark:bg-dark-secondary/10 border-light-secondary/20 dark:border-dark-secondary/20">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-light-secondary dark:text-dark-secondary mt-0.5" />
                      <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        <span className="font-medium block mb-1">Security Warning</span>
                        Disabling two-factor authentication will make your account less secure. Without 2FA, your
                        account will only be protected by your password.
                      </AlertDescription>
                    </div>
                  </Alert>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-light-background/80 dark:bg-dark-background/80">
                      <Lock className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      <div>
                        <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                          Authenticator App
                        </h3>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          Currently active
                        </p>
                      </div>
                      <div className="ml-auto">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse"></div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isConfirming ? (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-4 pt-2"
                        >
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary text-center">
                            Are you sure you want to proceed?
                          </p>
                          <div className="flex gap-3 justify-center">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                onClick={() => setIsConfirming(false)}
                                className="border-light-border dark:border-dark-border"
                              >
                                Cancel
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="destructive"
                                onClick={handleDeactivation}
                                disabled={isDeactivating}
                                className="bg-light-secondary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
                              >
                                {isDeactivating ? (
                                  <div className="flex items-center">
                                    <motion.div
                                      className="h-4 w-4 rounded-full border-2 border-t-transparent border-white"
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                    />
                                    <span className="ml-2">Deactivating...</span>
                                  </div>
                                ) : (
                                  "Confirm Deactivation"
                                )}
                              </Button>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex justify-center pt-2"
                        >
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant="destructive"
                              onClick={() => setIsConfirming(true)}
                              className="bg-light-secondary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
                            >
                              Deactivate Two-Factor Authentication
                            </Button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="mt-6 text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-light-text-secondary dark:text-dark-text-secondary"
                      // onClick={() => router.push("/dashboard/account?tab=security")}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to Security Settings
                    </Button>
                  </div>
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
                    Two-Factor Authentication Disabled
                  </h3>

                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Redirecting you back to security settings...
                  </p>

                  <motion.div className="w-full bg-light-border dark:bg-dark-border h-1 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2 }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
