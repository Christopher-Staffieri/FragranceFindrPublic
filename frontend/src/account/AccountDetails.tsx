
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  Shield,
  User,
  Bell,
  LogOut,
  Smartphone,
  ExternalLink,
} from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/database/perfumeDetails/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/database/perfumeDetails/tabs"
import { Switch } from "../components/common/switch"
import { Label } from "../components/Label"
import { Avatar, AvatarFallback, AvatarImage} from "../components/database/perfumeDetails/avatar"
import { Badge } from "../components/database/perfumeDetails/badge"
import { Separator } from "../components/common/separator"
import { Alert, AlertDescription, AlertTitle } from "../components/common/alert"
import ChangePassword from "./ChangePassword"
import ChangeEmail from "./ChangeEmail"
import DashboardSideNavbar from "../layouts/navbar-sidebar"
import AccountSecurity from "./AccountSecurity"


export default function AccountDetails() {
  const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
  const [activeTab, setActiveTab] = useState("profile")
  
  const [isGoogleConnected, setIsGoogleConnected] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)


  


  // const handleConnectGoogle = () => {
  //   // In a real app, you would initiate OAuth flow
  //   setIsGoogleConnected(!isGoogleConnected)
  // }

  return (
    <DashboardSideNavbar>
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">Account Settings</h1>
        <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
          Manage your account details and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                  Profile Information
                </CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80&text=JD" alt="John Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm">
                      Change Avatar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-light-text-secondary dark:text-dark-text-secondary"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Email Section */}
                <ChangeEmail/>

                {/* <Separator /> */}

                {/* Account Type */}
                {/* <div className="space-y-2">
                  <Label className="text-base font-medium">Account Type</Label>
                  <div className="flex items-center gap-2 p-3 rounded-md bg-light-background dark:bg-dark-background">
                    <Badge className="bg-light-primary dark:bg-dark-primary text-white">Premium</Badge>
                    <span className="text-light-text-primary dark:text-dark-text-primary">Premium Account</span>
                    <Button variant="link" size="sm" className="ml-auto">
                      Manage Subscription
                    </Button>
                  </div>
                </div> */}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LogOut className="h-5 w-5 text-red-500" />
                  Danger Zone
                </CardTitle>
                <CardDescription>Irreversible account actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Deleting your account will permanently remove all your data, including your collection, reviews, and
                    preferences.
                  </AlertDescription>
                </Alert>
                <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <ChangePassword/>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                  Connected Accounts
                </CardTitle>
                <CardDescription>Manage accounts connected to your FragranceFindr profile</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-md bg-light-background dark:bg-dark-background">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                        Google
                      </h3>
                      <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                        {isGoogleConnected ? "Connected" : "Not connected"}
                      </p>
                    </div>
                  </div>
                  <Button variant={isGoogleConnected ? "outline" : "default"} size="sm" 
                  // onClick={handleConnectGoogle}
                  >
                    {isGoogleConnected ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <AccountSecurity/>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Control how and when you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Email Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-notifications" className="flex flex-col gap-1">
                        <span>Activity Updates</span>
                        <span className="font-normal text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          Receive emails about your account activity
                        </span>
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={emailNotifications}
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <Label htmlFor="marketing-emails" className="flex flex-col gap-1">
                        <span>Marketing Emails</span>
                        <span className="font-normal text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          Receive emails about new features and promotions
                        </span>
                      </Label>
                      <Switch id="marketing-emails" checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* <div className="space-y-4">
                  <h3 className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                    Push Notifications
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="push-notifications" className="flex flex-col gap-1">
                        <span>App Notifications</span>
                        <span className="font-normal text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          Receive push notifications in the app
                        </span>
                      </Label>
                      <Switch
                        id="push-notifications"
                        checked={pushNotifications}
                        onCheckedChange={setPushNotifications}
                      />
                    </div>
                  </div>
                </div> */}
              </CardContent>
              <CardFooter>
                <Button>Save Preferences</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
    </DashboardSideNavbar>
  )

  
}