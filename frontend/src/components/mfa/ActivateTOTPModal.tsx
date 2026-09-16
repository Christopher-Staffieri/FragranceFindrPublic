
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Shield, Copy, Check, Smartphone, Info, ArrowRight, Download } from "lucide-react"
import { Button } from "../MainButton"
import { Input } from "../Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../database/perfumeDetails/card"
import { Label } from "../Label"
import { Separator } from "../common/separator"
import { Alert, AlertDescription } from "../common/alert"
import QRCode from "react-qr-code";
import { activateTOTPAuthenticator } from "../../lib/allauth"

// interface ActivateTOTPModalProps {
//   onClose?: () => void
//   onActivate?: () => void
//   data?: string
// }

export default function ActivateTOTPModal({
  onClose,
  onActivate,
  data,
}) {
    // ActivateTOTPModalProps
    // add that prop before the ) with :
  const [step, setStep] = useState<1 | 2>(1)
  const [authCode, setAuthCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [response, setResponse] = useState({ fetching: false, content: null })
  console.log(data)

  // Format secret key with spaces for better readability
  const formattedSecretKey = data.meta.secret.match(/.{1,4}/g)?.join(" ") || data.meta.secret

  // Focus on the input when step 2 is active
  useEffect(() => {
    if (step === 2 && inputRef.current) {
      inputRef.current.focus()
    }
  }, [step])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data.meta.secret)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (e) => {
    // e.preventDefault()
    if (authCode.length < 6) {
      setError("Please enter a valid 6-digit code")
      return
    }

    setIsSubmitting(true)
    setError("")

    setResponse({ ...response, fetching: true })
    activateTOTPAuthenticator(authCode).then((content) => {
      setResponse((r) => { return { ...r, content } })
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
        setIsSubmitting(false)
        setResponse((r) => { return { ...r, fetching: false } })
        onActivate?.()
    })
  }

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas")
    if (canvas) {
      const link = document.createElement("a")
      link.download = "totp-qr-code.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
  }

  return (
   
    <Card className="w-full overflow-hidden">
      <CardHeader className="bg-light-primary/5 dark:bg-dark-primary/10 border-b border-light-border dark:border-dark-border">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Shield className="h-5 w-5 text-light-primary dark:text-dark-primary" />
          Activate Two-Factor Authentication
        </CardTitle>
        <CardDescription>Secure your account with time-based one-time passwords</CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Step indicator */}
          <div className="flex items-center justify-center mb-2">
            <div className="flex items-center">
              <motion.div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 1
                    ? "bg-light-primary dark:bg-dark-primary text-white"
                    : "bg-light-background dark:bg-dark-background text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border"
                }`}
                animate={{ scale: step === 1 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                1
              </motion.div>
              <div
                className={`w-16 h-1 ${
                  step >= 2 ? "bg-light-primary dark:bg-dark-primary" : "bg-light-border dark:bg-dark-border"
                }`}
              />
              <motion.div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  step >= 2
                    ? "bg-light-primary dark:bg-dark-primary text-white"
                    : "bg-light-background dark:bg-dark-background text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border"
                }`}
                animate={{ scale: step === 2 ? [1, 1.1, 1] : 1 }}
                transition={{ duration: 0.5 }}
              >
                2
              </motion.div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                    Scan QR Code
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Scan this QR code with your authenticator app
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-center">
                  {/* QR Code */}
                  <motion.div
                    className="relative p-4 bg-white rounded-lg border border-light-border dark:border-dark-border shadow-sm mx-auto"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <QRCode id="qr-code" className="w-48 h-48" value={data.meta.totp_url}/>
                    {/* <canvas
                      id="qr-canvas"
                      className="w-48 h-48"
                      style={{
                        // background: `url('https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/FragranceFindr:user@example.com?secret=${secretKey}&issuer=FragranceFindr')`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    /> */}
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-light-primary dark:bg-dark-primary flex items-center justify-center text-white cursor-pointer"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={downloadQRCode}
                      title="Download QR Code"
                    >
                      <Download className="w-3 h-3" />
                    </motion.div>
                  </motion.div>

                  <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                      <Label htmlFor="secret-key" className="text-sm font-medium">
                        Secret Key
                      </Label>
                      <div className="relative">
                        <Input
                          id="secret-key"
                          value={formattedSecretKey}
                          readOnly
                          className="pr-10 font-mono text-sm bg-light-background/50 dark:bg-dark-background/50"
                        />
                        <motion.button
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary"
                          onClick={copyToClipboard}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </motion.button>
                      </div>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        You can store this secret and use it to reinstall your authenticator app at a later time.
                      </p>
                    </div>

                    <Alert className="bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
                      <Info className="h-4 w-4 text-light-primary dark:text-dark-primary" />
                      <AlertDescription className="text-xs">
                        Download an authenticator app like Google Authenticator, Authy, or Microsoft Authenticator to
                        scan this QR code.
                      </AlertDescription>
                    </Alert>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-light-text-primary dark:text-dark-text-primary">
                    Verify Code
                  </h3>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Enter the 6-digit code from your authenticator app
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="auth-code" className="text-sm font-medium flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-light-primary dark:text-dark-primary" />
                      Authentication Code
                    </Label>
                    <Input
                      id="auth-code"
                      ref={inputRef}
                      value={authCode}
                      onChange={(e) => {
                        // Only allow numbers and limit to 6 digits
                        const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6)
                        setAuthCode(value)
                        if (error && value.length === 6) setError("")
                      }}
                      placeholder="Enter 6-digit code"
                      className={`text-center text-xl tracking-widest ${error ? "border-red-500" : ""}`}
                    />
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 mt-1"
                      >
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <Alert className="bg-light-secondary/5 dark:bg-dark-secondary/10 border-light-secondary/20 dark:border-dark-secondary/20">
                    <Info className="h-4 w-4 text-light-secondary dark:text-dark-secondary" />
                    <AlertDescription className="text-xs">
                      The code refreshes every 30 seconds. If it expires, simply enter the new code shown in your app.
                    </AlertDescription>
                  </Alert>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="flex justify-between p-6 bg-light-background/30 dark:bg-dark-background/30">
        {step === 1 ? (
          <>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setStep(2)}
                className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
              >
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => setStep(1)}>
              Back
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={(e) => handleSubmit(e)}
                disabled={authCode.length !== 6 || isSubmitting}
                className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 min-w-[100px]"
              >
                {isSubmitting ? (
                  <motion.div
                    className="h-5 w-5 rounded-full border-2 border-t-transparent border-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                ) : (
                  "Activate"
                )}
              </Button>
            </motion.div>
          </>
        )}
      </CardFooter>
    </Card>
    
  )
}

