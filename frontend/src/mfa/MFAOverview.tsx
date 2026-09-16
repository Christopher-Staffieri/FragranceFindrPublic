import { Link, useLoaderData } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as allauth from '../lib/allauth'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/database/perfumeDetails/card'
import { Separator } from '../components/common/separator'
import { Smartphone, AlertCircle, CheckCircleIcon } from 'lucide-react'
import { Button } from '../components/MainButton'






export default function MFAOverview (props) {
  const totp = props.authenticators.find(authenticator => authenticator.type === allauth.AuthenticatorType.TOTP)
  const webauthn = props.authenticators.filter(authenticator => authenticator.type === allauth.AuthenticatorType.WEBAUTHN)
  const recoveryCodes = props.authenticators.find(authenticator => authenticator.type === allauth.AuthenticatorType.RECOVERY_CODES)
  // console.log(reco)
  console.log(recoveryCodes)

  return(
    <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                  Two-Factor Authentication
                </CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Authenticator App Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-medium text-light-text-primary dark:text-dark-text-primary">
                        Authenticator App
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        Use an authenticator app to get verification codes
                      </p>
                    </div>
                    {totp
                      ? <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Link to='/account/2fa/totp/deactivate'>
                            <Button
                              variant="outline"
                              size="sm"
                              className="self-start sm:self-center border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                            >
                              Deactivate
                            </Button>
                          </Link>
                        </motion.div>
                      : <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link to='/account/2fa/totp/activate'>
                          <Button
                            variant="outline"
                            size="sm"
                            className="self-start sm:self-center border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                          >
                            Activate
                          </Button>
                        </Link>
                      </motion.div>
                    }
                    
                  </div>
                  {/* bg-light-background/50 */}
                  {/* <div className="p-3 rounded-md bg-light-background/50 dark:bg-dark-background/50 border border-light-primary dark:border-dark-border"> */}
                  <div className={`p-3 rounded-md bg-light-background/50 dark:bg-dark-background/50 border ${totp ? "border-light-primary" : "border-light-border"} ${totp ? "dark:border-dark-primary" : "dark:border-dark-border"}`} >
                    <div className="flex items-center gap-2">
                      
                      {totp
                        ? <>
                          <CheckCircleIcon className="h-5 w-5 text-light-primary dark:text-dark-text-secondary" />
                          <span className="text-light-primary dark:text-dark-text-secondary text-sm">
                            An authenticator app is currently active.
                          </span>
                        </>
                        : 
                          <>
                            <AlertCircle className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                            <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                              An authenticator app is not active.
                            </span>
                          </>
                          
                      }
                      
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Security Keys Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    
                    <div>
                      <h3 className="text-base font-medium text-light-text-primary dark:text-dark-text-primary">
                        Security Keys
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        Use security keys as a second factor
                      </p>
                    </div>
                    {webauthn.length
                      ? 
                        <Link to='/account/2fa/webauthn'>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="self-start sm:self-center border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                              >
                                Manage
                              </Button>
                            </motion.div>
                        </Link>
                      : 
                      <Link to='/account/2fa/webauthn/add'>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                            variant="outline"
                            size="sm"
                            className="self-start sm:self-center border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                          >
                            Add
                          </Button>
                        </motion.div>
                      </Link>
                    }
                    
                  </div>
                  <div className={`p-3 rounded-md bg-light-background/50 dark:bg-dark-background/50 border   ${webauthn.length ? "border-light-primary" : "border-light-border"} ${webauthn.length ? "dark:border-dark-primary" : "dark:border-dark-border"}`}>
                    <div className="flex items-center gap-2">
                      
                      
                      {webauthn.length
                        ? 
                          <>
                            <CheckCircleIcon className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                            <span className="text-light-primary dark:text-dark-text-secondary text-sm">
                              You have added {webauthn.length} security keys.
                            </span>
                          </>
                        : 
                          <>
                            <AlertCircle className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                            <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            No security keys have been added..
                            </span>
                          </>
                      }
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Recovery Codes Section */}
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h3 className="text-base font-medium text-light-text-primary dark:text-dark-text-primary">
                        Recovery Codes
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-1">
                        Use recovery codes to access your account if you lose your 2FA device
                      </p>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      {recoveryCodes
                        ? <>
                          <Link to='/account/2fa/recovery-codes'>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="self-start sm:self-center border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                              >
                                Manage
                              </Button>
                            </motion.div>
                        </Link>
                        </>
                        : <>
                          <Link to='/account/2fa/recovery-codes/generate'>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                            variant="outline"
                            size="sm"
                            className="self-start sm:self-center border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                          >
                            Add
                          </Button>
                        </motion.div>
                      </Link>
                        </>
                      
                      }

                      {/* <Button
                        variant="outline"
                        size="sm"
                        className="self-start sm:self-center border-light-primary text-light-primary dark:border-dark-primary dark:text-dark-primary"
                      >
                        Generate
                      </Button> */}
                    </motion.div>
                  </div>
                  <div className={`p-3 rounded-md bg-light-background/50 dark:bg-dark-background/50 border ${recoveryCodes ? "border-light-primary" : "border-light-border"} ${recoveryCodes ? "dark:border-dark-primary" : "dark:border-dark-border"}`}>
                    <div className="flex items-center gap-2">
                      {recoveryCodes
                        ? <>
                          <CheckCircleIcon className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                          <span className="text-light-primary dark:text-dark-primary text-sm">
                            There are currently recovery codes set up.
                          </span>
                        </>
                        : <>
                          <AlertCircle className="h-5 w-5 text-light-text-secondary dark:text-dark-text-secondary" />
                          <span className="text-light-text-secondary dark:text-dark-text-secondary text-sm">
                            No recovery codes set up.
                          </span>
                        </>
                      
                      }
                      
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
  )
  
}
