import { useLoaderData, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { generateRecoveryCodes, getRecoveryCodes } from '../lib/allauth'
import { motion, AnimatePresence } from "framer-motion"
import { Key, Copy, Download, RefreshCw, Shield, CheckCircle, AlertTriangle, Info, Eye, EyeOff, KeyRound, KeyRoundIcon } from "lucide-react"
import { Button } from "../components/MainButton"
import { Alert, AlertDescription } from "../components/common/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/common/dialog"
import LoadingPage from '../components/common/loadingPage'
import LoadingSpinner from '../components/common/loadingSpinner'



export async function loader ({ params }) {
  const resp = await getRecoveryCodes()
  return { recoveryCodes: resp }
}

export default function RecoveryCodes (props) {
  // const { recoveryCodes } = useLoaderData()
  const [recoveryCodes, setRecoveryCodes] = useState(null)
  const [showCodes, setShowCodes] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [downloadClicked, setDownloadClicked] = useState(false)
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationSuccess, setGenerationSuccess] = useState(false)

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [allCopied, setAllCopied] = useState(false)
  const [hasCodes, setHasCodes] = useState(false)
  const [refreshCodes, setRefreshCodes] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  console.log(recoveryCodes)

  useEffect(() => {
    setIsLoading(true)
    const fetchNewData = async () => {
      const resp = await getRecoveryCodes()
      console.log(resp)
      setRecoveryCodes(resp)
      setRefreshCodes(false)
      setIsLoading(false)
      setGenerationSuccess(false)
    }

    fetchNewData()

  }, [refreshCodes])

  useEffect(() => {
    if (recoveryCodes?.data.unused_codes.length > 0){
      setHasCodes(true)
    }
    
  }, [recoveryCodes])

  const copyToClipboard = (text: string, index?: number) => {
    navigator.clipboard.writeText(text)

    if (index !== undefined) {
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 1500)
    } else {
      setAllCopied(true)
      setTimeout(() => setAllCopied(false), 1500)
    }
  }

  const copyAllCodes = () => {
    const text = recoveryCodes.data.unused_codes.map((code) => code).join("\n")
    copyToClipboard(text)
  }

  const downloadCodes = () => {
    const text = recoveryCodes.data.unused_codes.map((code) => code).join("\n")
    const element = document.createElement("a")
    const file = new Blob([text], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "FF-recovery-codes.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    setDownloadClicked(true)
    setTimeout(() => setDownloadClicked(false), 1500)
  }

  const handleGenerateNewCodes = async () => {
    setIsGenerating(true)
    setShowConfirmDialog(false)

    try {
      const content = generateRecoveryCodes()
      if (content?.errors){
        setResponse((r) => { return { ...r, content } })
        throw 'There was an error generating new codes'
      }
      console.log(content)
      setResponse((r) => { return { ...r, content } })
    } catch (error) {
      setResponse((r) => { return { ...r, content } })
      console.log(error)
    } finally {
      setIsGenerating(false)
      setGenerationSuccess(true)
      setRefreshCodes(true)
      // setIsConfirming(false)
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  }

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.2,
      },
    },
  }

  return (
    <div className="min-h-screen bg-light-background dark:bg-dark-background py-12 px-4">
      <div className="container mx-auto">
        <div className="w-full max-w-2xl mx-auto">
          <div className='py-4'>
            <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
                <KeyRoundIcon className="h-6 w-6 text-light-primary dark:text-dark-primary" />
                Recovery Codes
              </h1>
              <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
                Manage your Recovery Codes for passwordless authentication
              </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border"
          >
            {/* Header with gradient accent */}
            <div className="h-2 bg-gradient-to-r from-light-primary to-light-primary/70 dark:from-dark-primary dark:to-dark-primary/70" />

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 10, 0] }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-10 h-10 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center"
                  >
                    <Key className="w-5 h-5 text-light-primary dark:text-dark-primary" />
                  </motion.div>
                  <div>
                    <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                      Recovery Codes
                    </h2>
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {isLoading ? (
                      <motion.div
                        className="h-4 w-32 bg-light-background dark:bg-dark-background rounded"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      />
                    ) : hasCodes ? (
                      `${recoveryCodes.data.unused_code_count} out of ${recoveryCodes.data.total_code_count} recovery codes available`
                    ) : (
                      "No recovery codes generated yet"
                    )}
                    
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                {hasCodes && (
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCodes(!showCodes)}
                      className="border-light-border dark:border-dark-border"
                    >
                      {showCodes ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-2" />
                          Hide Codes
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-2" />
                          Show Codes
                        </>
                      )}
                    </Button>
                  </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={generationSuccess ? { scale: [1, 1.1, 1] } : {}}
                transition={generationSuccess ? { duration: 0.5 } : {}}
              >
                <Button
                  onClick={() => setShowConfirmDialog(true)}
                  className={`${
                    generationSuccess
                      ? "bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                      : "bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
                  } text-white`}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="mr-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </motion.div>
                      Generating...
                    </>
                  ) : generationSuccess ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Generated Successfully
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      {hasCodes ? "Generate New Codes" : "Generate Codes"}
                    </>
                  )}
                </Button>
              </motion.div>
                </div>
              </div>

              <AnimatePresence mode="wait">
            {!hasCodes ? (
              // Empty state
              <motion.div
                key="empty-state"
                variants={emptyStateVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="py-12"
              >
                {isLoading ? (
                  // Loading skeleton for empty state
                  <div className="text-center">
                    <motion.div
                      className="mx-auto w-20 h-20 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center mb-4"
                      animate={{ opacity: [0.7, 0.9, 0.7] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                    <motion.div
                      className="h-7 w-48 bg-light-text-secondary/20 dark:bg-dark-text-secondary/20 rounded mx-auto mb-3"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.1 }}
                    />
                    <motion.div
                      className="h-4 w-64 bg-light-text-secondary/20 dark:bg-dark-text-secondary/20 rounded mx-auto mb-2"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                    />
                    <motion.div
                      className="h-4 w-56 bg-light-text-secondary/20 dark:bg-dark-text-secondary/20 rounded mx-auto mb-6"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.3 }}
                    />
                    <motion.div
                      className="h-10 w-48 bg-light-text-secondary/20 dark:bg-dark-text-secondary/20 rounded-md mx-auto"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                    />
                  </div>
                ) : (
                <div className="text-center">
                  <motion.div
                    className="mx-auto w-20 h-20 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center mb-4"
                    initial={{ y: 10 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "reverse",
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  >
                    <KeyRound className="w-10 h-10 text-light-primary dark:text-dark-primary" />
                  </motion.div>

                  <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary mb-2">
                    No Recovery Codes
                  </h3>

                  <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-md mx-auto mb-6">
                    You haven't generated any recovery codes yet. Recovery codes help you access your account if you
                    lose your other authentication methods.
                  </p>

                  <motion.div
                    className="inline-block"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      y: [0, 3, 0],
                      boxShadow: [
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                      ],
                    }}
                    transition={{
                      repeat: 3,
                      repeatType: "reverse",
                      duration: 1.5,
                      repeatDelay: 2,
                    }}
                  >
                    <Button
                      onClick={() => setShowConfirmDialog(true)}
                      size="lg"
                      className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                    >
                      <RefreshCw className="w-5 h-5 mr-2" />
                      Generate Recovery Codes
                    </Button>
                  </motion.div>
                </div>
                )}
              </motion.div>
            ) : showCodes ? (
              // Codes visible state
              <motion.div
                key="codes-visible"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Your Recovery Codes
                  </p>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={copyAllCodes}
                      className="p-1.5 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                      title="Copy all codes"
                    >
                      {allCopied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    </motion.button>
                    <motion.button
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
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {isLoading
                    ? // Loading skeleton for codes
                      Array.from({ length: 10 }).map((_, index) => (
                        <motion.div
                          key={`skeleton-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background"
                        >
                          <div className="flex items-center gap-3 w-full">
                            <motion.div
                              className="w-2 h-2 rounded-full bg-light-text-secondary/30 dark:bg-dark-text-secondary/30"
                              animate={{ opacity: [0.5, 0.8, 0.5] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.1 }}
                            />
                            <motion.div
                              className="h-5 w-full max-w-[120px] bg-light-text-secondary/20 dark:bg-dark-text-secondary/20 rounded"
                              animate={{ opacity: [0.5, 0.8, 0.5] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: index * 0.1 }}
                            />
                          </div>
                        </motion.div>
                      ))
                  : recoveryCodes?.data.unused_codes.map((code, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className={`flex items-center justify-between p-3 rounded-lg border ${
                        code.used
                          ? "bg-light-background/50 dark:bg-dark-background/50 border-light-border/50 dark:border-dark-border/50 text-light-text-secondary dark:text-dark-text-secondary"
                          : "bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            code.used ? "bg-light-text-secondary dark:bg-dark-text-secondary" : "bg-green-500"
                          }`}
                        />
                        <span className="font-mono">{code}</span>
                      </div>

                      {!code.used && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(code, index)}
                          className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary"
                          title="Copy code"
                        >
                          {copiedIndex === index ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </motion.button>
                      )}

                      {code.used && (
                        <span className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Used</span>
                      )}
                    </motion.div>
                  ))}
                </div>

                <Alert className="bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
                    <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium text-light-primary dark:text-dark-text-primary block mb-1">
                        Important Information
                      </span>
                      Each recovery code can only be used once. Keep these codes in a secure location, such as a
                      password manager.
                    </AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            ) : (
              // Codes hidden state
              <motion.div
                key="codes-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="p-6 rounded-lg bg-light-background dark:bg-dark-background border border-light-border dark:border-dark-border text-center">
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-16 h-16 mx-auto rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center mb-4"
                  >
                    <Shield className="w-8 h-8 text-light-primary dark:text-dark-primary" />
                  </motion.div>
                  <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                    Recovery Codes Hidden
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                    Your recovery codes are hidden for security. Click "Show Codes" to view them.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      onClick={() => setShowCodes(true)}
                      className="border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Show Recovery Codes
                    </Button>
                  </motion.div>
                </div>

                <Alert className="bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
                    <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      Recovery codes allow you to access your account if you lose access to your authenticator app or
                      security key.
                    </AlertDescription>
                  </div>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
            </div>
          </motion.div>

          {/* Confirmation Dialog */}
          <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <DialogContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
            <DialogHeader>
              <DialogTitle className="text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                {hasCodes ? "Generate New Recovery Codes" : "Generate Recovery Codes"}
              </DialogTitle>
              <DialogDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                {hasCodes
                  ? "Are you sure you want to generate new recovery codes?"
                  : "Generate recovery codes to help secure your account."}
              </DialogDescription>
            </DialogHeader>

              {hasCodes && (
                <Alert className="bg-light-secondary/5 dark:bg-dark-secondary/10 border-light-secondary/20 dark:border-dark-secondary/20">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-light-secondary dark:text-dark-secondary mt-0.5" />
                    <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium text-light-secondary dark:text-dark-secondary block mb-1">Warning</span>
                      Generating new recovery codes will invalidate your existing codes. Make sure to save the new codes in
                      a secure location.
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              {!hasCodes && (
                <Alert className="bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
                  <div className="flex items-start gap-2">
                    <Info className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
                    <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <span className="font-medium text-light-primary dark:text-dark-primary block mb-1">Information</span>
                      Recovery codes are single-use backup codes that allow you to sign in if you lose access to your other
                      authentication methods.
                    </AlertDescription>
                  </div>
                </Alert>
              )}

              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirmDialog(false)}
                  className="border-light-border dark:border-dark-border"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleGenerateNewCodes}
                  className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {hasCodes ? "Generate New Codes" : "Generate Codes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

        </div>
            
      </div>
    </div>
    
  )
}