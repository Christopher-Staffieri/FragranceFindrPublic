import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import FormErrors from '../components/FormErrors'
import { motion, AnimatePresence } from "framer-motion"
import { Key, Fingerprint, Shield, Info, ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
import { Label } from "../components/Label"
import { Alert, AlertDescription } from "../components/common/alert"
import * as allauth from '../lib/allauth'
import {
  create,
  parseCreationOptionsFromJSON
} from '@github/webauthn-json/browser-ponyfill'

export default function AddWebAuthn (props) {
  const navigate = useNavigate()
  const [passwordless, setPasswordless] = useState(false)
  // const [name, setName] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [keyName, setKeyName] = useState("")
  const [response, setResponse] = useState({ fetching: false, content: null })
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState("")
  const [isRegistered, setIsRegistered] = useState(false)

  const iconAnimation = {
    initial: { scale: 1 },
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }
  
  const handleSubmit = async () => {
    if (!keyName.trim()) {
      setError("Please provide a name for your security key")
      return
    }
    setError("")
    setIsRegistering(true)
    setCurrentStep(2)

    setResponse({ ...response, fetching: true })
    try {
      const optResp = await allauth.getWebAuthnCreateOptions(passwordless)
      if (optResp.status === 200) {
        const jsonOptions = optResp.data.creation_options
        const options = parseCreationOptionsFromJSON(jsonOptions)
        const credential = await create(options)
        const addResp = await allauth.addWebAuthnCredential(keyName, credential)
        setResponse((r) => { return { ...r, content: addResp } })
      } else {
        setResponse((r) => { return { ...r, content: optResp } })
      }
      setIsRegistering(false)
      setIsRegistered(true)
      setCurrentStep(3)
    } catch (e) {
      console.error(e)
      window.alert(e)
      setError("Failed to register security key. Please try again.")
      setIsRegistering(false)
      setCurrentStep(1)
    }
    
    setResponse((r) => { return { ...r, fetching: false } })
  }

  if (response.content?.status === 200) {
    return <Navigate to={response.content.meta.recovery_codes_generated ? '/account/2fa/recovery-codes' : '/account/2fa/webauthn'} />
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

        <div className="relative bg-light-surface dark:bg-dark-surface rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border">
          {/* Header with gradient accent */}
          <div className="h-2 bg-gradient-to-r from-light-primary to-light-primary/70 dark:from-dark-primary dark:to-dark-primary/70" />

          <div className="p-8">
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: [0, 10, 0] }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="w-16 h-16 rounded-full bg-light-primary/10 dark:bg-dark-primary/20 flex items-center justify-center"
              >
                <Key className="w-8 h-8 text-light-primary dark:text-dark-primary" />
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary mb-2 text-center">
                    Add Security Key
                  </h1>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center">
                    Register a new security key for passwordless authentication
                  </p>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="key-name"
                        className="text-light-text-primary dark:text-dark-text-primary flex items-center gap-2"
                      >
                        <Fingerprint className="h-4 w-4 text-light-primary dark:text-dark-primary" />
                        Security Key Name
                      </Label>
                      <Input
                        id="key-name"
                        value={keyName}
                        onChange={(e) => setKeyName(e.target.value)}
                        placeholder="Enter a name for your security key"
                        className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary"
                      />
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        Choose a name that helps you identify this security key
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <div className="flex h-5 items-center">
                        <motion.input
                          whileTap={{ scale: 0.9 }}
                          type="checkbox"
                          id="passwordless"
                          checked={passwordless}
                          onChange={(e) => setPasswordless(e.target.checked)}
                          className="h-4 w-4 rounded border-light-border dark:border-dark-border text-light-primary dark:text-dark-primary focus:ring-light-primary dark:focus:ring-dark-primary focus:ring-offset-light-background dark:focus:ring-offset-dark-background"
                        />
                      </div>
                      <div className="leading-tight">
                        <Label
                          htmlFor="passwordless"
                          className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary cursor-pointer"
                        >
                          Passwordless
                        </Label>
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          Use this security key for passwordless sign-in
                        </p>
                      </div>
                    </div>

                    <Alert className="bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
                        <AlertDescription className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          <span className="font-medium block mb-1">What is a security key?</span>A security key is a
                          physical device that provides strong authentication. You can use it to sign in without
                          entering a password.
                        </AlertDescription>
                      </div>
                    </Alert>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-md bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500"
                      >
                        {error}
                      </motion.div>
                    )}

                    <div className="flex justify-center pt-2">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          onClick={handleSubmit}
                          className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
                        >
                          Register Security Key
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-6"
                >
                  <h2 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary">
                    Connect Your Security Key
                  </h2>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Please insert your security key and follow your browser's instructions
                  </p>

                  <div className="flex justify-center py-8">
                    <motion.div variants={iconAnimation} initial="initial" animate="pulse" className="relative">
                      <Shield className="w-16 h-16 text-light-primary dark:text-dark-primary" />
                      <motion.div
                        className="absolute inset-0"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(74, 144, 226, 0)",
                            "0 0 0 20px rgba(74, 144, 226, 0.2)",
                            "0 0 0 0 rgba(74, 144, 226, 0)",
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                        }}
                      />
                    </motion.div>
                  </div>

                  <div className="flex justify-center items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Waiting for security key...</span>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
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
                    Security Key Registered!
                  </h3>

                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    Your security key "{keyName}" has been successfully registered.
                  </p>

                  <motion.div className="w-full bg-light-border dark:bg-dark-border h-1 rounded-full mt-4 overflow-hidden">
                    <motion.div
                      className="h-full bg-green-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5 }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <Button
                variant="ghost"
                size="sm"
                className="text-light-text-secondary dark:text-dark-text-secondary"
                onClick={() => navigate("/account/account-details")}
                disabled={isRegistering}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Security Settings
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}