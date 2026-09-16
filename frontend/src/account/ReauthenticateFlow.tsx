import { Link, useLocation } from 'react-router-dom'
import { pathForFlow } from '../auth'
import { Flows, AuthenticatorType } from '../lib/allauth'
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, ChevronRight, Fingerprint, Lock, RefreshCw, ShieldEllipsis } from 'lucide-react'
import { useState } from 'react'

const flowLabels = {}
flowLabels[Flows.REAUTHENTICATE] = 'Use your password'
flowLabels[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.TOTP}`] = 'Use your authenticator app'
flowLabels[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.RECOVERY_CODES}`] = 'Use a recovery code'
flowLabels[`${Flows.MFA_REAUTHENTICATE}:${AuthenticatorType.WEBAUTHN}`] = 'Use security key'

function flowsToMethods (flows) {
  const methods = []
  flows.forEach(flow => {
    if (flow.id === Flows.MFA_REAUTHENTICATE) {
      flow.types.forEach(typ => {
        const id = `${flow.id}:${typ}`
        methods.push({
          label: flowLabels[id],
          id,
          path: pathForFlow(flow, typ)
        })
      })
    } else {
      methods.push({
        label: flowLabels[flow.id] || flow.id,
        id: flow.id,
        path: pathForFlow(flow)
      })
    }
  })
  return methods
}

const renderOptionIcons = (option) => {
  switch (option){
    case "reauthenticate":
      return <Lock className="h-5 w-5"></Lock>;
    case "mfa_reauthenticate:recovery_codes":
      return <RefreshCw className="h-5 w-5"/>
    case "mfa_reauthenticate:webauthn":
      return <Fingerprint/>
    case "mfa_reauthenticate:totp":
      return <ShieldEllipsis/>
    default:
      return null;
  }
}



const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export default function ReauthenticateFlow (pageMethod) {
  const location = useLocation()
  const methods = flowsToMethods(location.state.reauth.data.flows)
  const [showAlternatives, setShowAlternatives] = useState(false)
  const [authMethod, setAuthMethod] = useState<"password" | "recovery" | "security">("password")
  // console.log(props)
  console.log(methods)
  console.log(location)
  console.log(pageMethod)
  return (
    <>
      <motion.div variants={itemVariants} className="mt-6">
      <div className="relative">
        <button
          onClick={() => setShowAlternatives(!showAlternatives)}
          className="w-full flex items-center justify-between p-3 rounded-lg bg-light-background/80 dark:bg-dark-background/80 border border-light-border dark:border-dark-border text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary transition-colors"
        >
          <span className="font-medium">Alternative Options</span>
          <motion.div animate={{ rotate: showAlternatives ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight className="h-5 w-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {showAlternatives && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 overflow-hidden rounded-lg border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface"
            >

              {methods.length > 1
                ? (methods.filter(method => method.id !== pageMethod.pageMethod).map(option => (
                  <Link replace state={location.state} to={option.path + location.search}>
                  <motion.button
                    key={option.id}
                    whileHover={{
                      backgroundColor: "rgba(74, 144, 226, 0.1)",
                      x: 4,
                    }}
                    className={`w-full flex items-center gap-3 p-3 text-left ${
                      authMethod === option.id
                        ? "bg-light-primary/10 dark:bg-dark-primary/20 text-light-primary dark:text-dark-primary"
                        : "text-light-text-primary dark:text-dark-text-primary"
                    }`}
                    onClick={() => {
                      setAuthMethod(option.id as any)
                      setShowAlternatives(false)
                    }}
                  >
                    {renderOptionIcons(option.id)}
                    <span>{option.label}</span>
                    {authMethod === option.id && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="ml-auto">
                        <CheckCircle className="h-4 w-4 text-light-primary dark:text-dark-primary" />
                      </motion.div>
                    )}
                  </motion.button>
                   </Link>
                )))
                : null
              }
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </motion.div>

    
    </>

  )
}

{/* Alternative Options */}
