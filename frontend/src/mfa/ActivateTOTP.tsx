import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"
import * as allauth from '../lib/allauth'
import { ArrowLeft, CheckCircle } from "lucide-react"
import { Button } from "../components/MainButton"
import ActivateTOTPModal from "../components/mfa/ActivateTOTPModal"
import { useLoaderData } from "react-router-dom"
import DashboardSideNavbar from "../layouts/navbar-sidebar"


export async function loader ({ params }) {
  const resp = await allauth.getTOTPAuthenticator()
  // console.log(resp)
  return { totp: resp }
}

export default function ActivateTOTP (props) {
  // const router = useRouter()
  const navigate = useNavigate();

  const { totp } = useLoaderData()
  const [isActivated, setIsActivated] = useState(false)

  console.log(totp)
  const handleActivate = () => {
    setIsActivated(true)

    // Redirect back to security page after a delay
    setTimeout(() => {
      // router.push("/dashboard/account?tab=security")
      navigate('/account/account-details')
    }, 3000)
  }

  return (
    <DashboardSideNavbar>
    <div className="space-y-8 p-4">
      <div>
        <Button
          variant="ghost"
          size="sm"
          className="text-light-text-secondary dark:text-dark-text-secondary"
          onClick={() => navigate("/account/account-details")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Security Settings
        </Button>
      </div>

      {!isActivated ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <ActivateTOTPModal
            // onClose={() => router.push("/dashboard/account?tab=security")}
            onActivate={handleActivate}
            data={totp}
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md bg-light-surface dark:bg-dark-surface rounded-lg p-8 text-center space-y-4 border border-light-border dark:border-dark-border shadow-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, 0] }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto"
          >
            <CheckCircle className="w-8 h-8 text-green-500" />
          </motion.div>

          <h3 className="text-xl font-semibold text-light-text-primary dark:text-dark-text-primary">
            Two-Factor Authentication Activated!
          </h3>

          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Your account is now more secure. You will be redirected to the security settings page.
          </p>

          <motion.div className="w-full bg-light-border dark:bg-dark-border h-1 rounded-full mt-4 overflow-hidden">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
    </DashboardSideNavbar>
  )
  
}
