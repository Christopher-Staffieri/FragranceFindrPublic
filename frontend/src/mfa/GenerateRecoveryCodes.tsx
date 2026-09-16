import { useState } from 'react'
import { Navigate, useLoaderData } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import { motion, AnimatePresence } from "framer-motion"
import { Key, AlertTriangle, Copy, Download, RefreshCw, Shield, CheckCircle } from "lucide-react"
import { Button } from "../components/MainButton"
import { Alert, AlertDescription } from "../components/common/alert"
import { generateRecoveryCodes, getRecoveryCodes } from '../lib/allauth'

// import * as allauth from '../lib/allauth'

export async function loader ({ params }) {
  const resp = await getRecoveryCodes()
  return { recoveryCodes: resp }
}

export default function GenerateRecoveryCodes () {
  const { recoveryCodes } = useLoaderData()
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [isGenerating, setIsGenerating] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)
  const [copied, setCopied] = useState(false)



  const handleSubmit = async () => {
    setResponse({ ...response, fetching: true })
    setIsGenerating(true)
    try {
      const content = generateRecoveryCodes()
      if (content?.errors){
        setResponse((r) => { return { ...r, content } })
        throw 'There was an error proccesing the request'
      }
      setResponse((r) => { return { ...r, content } })
    } catch (error) {
        setResponse((r) => { return { ...r, content } })
        console.log(error)
    } finally {
      setIsGenerating(false)
      setIsConfirming(false)
    }

  }

  // const copyToClipboard = () => {
  //   if (!hasCodes) return

  //   navigator.clipboard.writeText(codes.join("\n"))
  //   setCopied(true)

  //   setTimeout(() => {
  //     setCopied(false)
  //   }, 2000)
  // }

  const handleCancel = () => {
    return <Navigate to='/account/account-details'/>
  }

  if (response.content?.status === 200) {
    return <Navigate to='/account/2fa/recovery-codes' />
  }

  const hasCodes = recoveryCodes.status === 200 && recoveryCodes.data.unused_code_count > 0
  return (
    <section>
      <div className="w-full max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border"
      >
        {/* Header with gradient accent */}
        <div className="h-2 bg-gradient-to-r from-light-primary to-light-primary/70 dark:from-dark-primary dark:to-dark-primary/70" />

        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, 0] }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-10 h-10 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center"
            >
              <Key className="w-5 h-5 text-light-primary dark:text-dark-primary" />
            </motion.div>
            <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">Recovery Codes</h2>
          </div>

          <AnimatePresence mode="wait">
            {!hasCodes ? (
              <motion.div
                key="pre-generation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                  Recovery codes allow you to access your account if you lose access to your authenticator app or
                  security key.
                </p>

                <Alert className="mb-6 bg-light-secondary/5 dark:bg-dark-secondary/10 border-light-secondary/20 dark:border-dark-secondary/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-light-secondary dark:text-dark-secondary mt-0.5" />
                    <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium text-light-secondary dark:text-dark-secondary block mb-1">
                        Important Warning
                      </span>
                      Generating new recovery codes will invalidate your existing codes. Make sure to save these codes
                      in a secure location.
                    </AlertDescription>
                  </div>
                </Alert>

                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  
                    <Button
                      variant="ghost"
                      onClick={handleCancel}
                      className="text-light-text-secondary dark:text-dark-text-secondary"
                    >
                      Cancel
                    </Button>
                 

                  {isConfirming ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex flex-col sm:flex-row gap-3"
                    >
                      <Button
                        variant="outline"
                        onClick={() => setIsConfirming(false)}
                        className="border-light-border dark:border-dark-border"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={isGenerating}
                        className="bg-light-secondary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90 text-white"
                      >
                        {isGenerating ? (
                          <div className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                              className="mr-2"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </motion.div>
                            Generating...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Shield className="mr-2 h-4 w-4" />
                            Confirm Generation
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => setIsConfirming(true)}
                        className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                      >
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Generate New Codes
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="post-generation"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-light-text-primary dark:text-dark-text-primary">
                      Your Recovery Codes
                    </h3>
                    <div className="flex gap-2">
                      {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyToClipboard}
                        className="p-1.5 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                        title="Copy to clipboard"
                      >
                        {copied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </motion.button> */}
                      {/* <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={downloadCodes}
                        className="p-1.5 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                        title="Download as text file"
                      >
                        {downloadClicked ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <Download className="h-4 w-4" />
                        )}
                      </motion.button> */}
                    </div>
                  </div>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Store these codes in a secure location, like a password manager.
                  </p>
                </div>

                <motion.div
                  className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-light-background/80 dark:bg-dark-background/80 border border-light-border dark:border-dark-border font-mono text-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* {codes.map((code, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="p-2 rounded bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                    >
                      {code}
                    </motion.div>
                  ))} */}
                </motion.div>

                <Alert className="bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
                    <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium text-light-primary dark:text-dark-primary block mb-1">
                        Security Reminder
                      </span>
                      Each code can only be used once. Keep these codes private and store them securely.
                    </AlertDescription>
                  </div>
                </Alert>

                <div className="flex justify-end">
                  {/* <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={resetState}
                      className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                    >
                      Done
                    </Button>
                  </motion.div> */}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
    </section>
  )
}
