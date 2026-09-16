import { motion } from 'framer-motion'
import ReauthenticateCode from './ReauthenticateCode'
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
}

export default function ReauthenticateRecoveryCodes (props) {
  return (
    <ReauthenticateCode pageMethod={"mfa_reauthenticate:recovery_codes"}>
      
      <motion.p
        variants={itemVariants}
        className="text-light-text-secondary dark:text-dark-text-secondary mb-6 text-center"
      >
        Please enter your recovery code to continue
      </motion.p>
    </ReauthenticateCode>
  )
}