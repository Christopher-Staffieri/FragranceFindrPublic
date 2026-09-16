import { useState, useEffect } from "react"
import { Link, useLoaderData, Navigate } from 'react-router-dom'
import * as allauth from '../lib/allauth'
// import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Key, Shield, Plus, Trash2, Edit, Info, Clock, Calendar, CheckCircle2, AlertCircle, Search } from "lucide-react"
import { Button } from "../components/MainButton"
import { Input } from "../components/Input"
import { Label } from "../components/Label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/database/perfumeDetails/card"
import { Badge } from "../components/database/perfumeDetails/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/database/perfumeDetails/tooltip"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle, 
} from "../components/common/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/common/select"
import { Alert, AlertDescription } from "../components/common/alert"



export async function loader ({ params }) {
  const resp = await allauth.getAuthenticators()
  return { authenticators: resp.data }
}

// going to try and remove the authenticator function comepletly and just use a newName state or something to make it smoother and easier to code

export default function ListWebAuthn (props) {
  const { authenticators } = useLoaderData()
  const [editId, setEditId] = useState(null)
  const [keys, setKeys] = useState(() => authenticators.filter(authenticator => authenticator.type === allauth.AuthenticatorType.WEBAUTHN))
  const [response, setResponse] = useState({ fetching: false, content: null })

  const [editedKeyName, setEditedKeyName] = useState('')


  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  // const [keyToDelete, setKeyToDelete] = useState<SecurityKey | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  // const [keyToEdit, setKeyToEdit] = useState<SecurityKey | null>(null)
  const [editedType, setEditedType] = useState("")
  console.log(keys)

  
  const isValidName = editedKeyName.trim().length > 1
  // useEffect(() => {
  //   const isValidName = editedKeyName.trim().length > 1
  //   if (editedKeyName.trim().length > 1){

  //   }
  // }, [editedKeyName])

  const filteredKeys = keys.filter(
    (key) =>
      key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  }

  const shimmerVariants = {
    hidden: { opacity: 0.5 },
    visible: {
      opacity: [0.5, 0.8, 0.5],
      transition: {
        repeat: Number.POSITIVE_INFINITY,
        duration: 1.5,
      },
    },
  }

  const handleEditKeyClick = (key) => {
    // console.log(keyId)
    setEditId(key.id)
    setEditedKeyName(key.name)
    setIsEditDialogOpen(true)

  }

  async function optimisticSetKeys (newKeys, op) {
    setResponse({ ...response, fetching: true })
    const oldKeys = keys
    setEditId(null)
    setKeys(newKeys)
    try {
      const ok = await op()
      if (!ok) {
        setKeys(oldKeys)
      }
    } catch (e) {
      setKeys(oldKeys)
      console.error(e)
      window.alert(e)
    }
    setResponse((r) => { return { ...r, fetching: false } })
  }

  async function deleteKey (key) {
    const newKeys = keys.filter((k) => k.id !== key.id)
    await optimisticSetKeys(newKeys, async () => {
      const resp = await allauth.deleteWebAuthnCredential([key.id])
      return (resp.status === 200)
    })
  }

  const handleKeyDelete = async (e, key) => {
    e.preventDefault()
    const newKeys = keys.filter((k) => k.id !== key.id)
    await optimisticSetKeys(newKeys, async () => {
      const resp = await allauth.deleteWebAuthnCredential([key.id])
      return (resp.status === 200)
    })
  }



  const handleKeySave = async (event, key, name) => {
    event.preventDefault()
    console.log(key)
    console.log(name)
    if (key && isValidName){
      const newKeys = keys.filter((k) => k.id !== key.id)
      newKeys.push({ ...key, name })
      await optimisticSetKeys(newKeys, async () => {
        const resp = await allauth.updateWebAuthnCredential(key.id, { name })
        setIsEditDialogOpen(false)
        setEditId(null)
        setEditedKeyName('')
        return (resp.status === 200)
    })
    }
    

  }

  if (!keys.length && !response.fetching) {
    return <Navigate to='/account/2fa' />
  }

  

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary flex items-center gap-2">
              <Shield className="h-6 w-6 text-light-primary dark:text-dark-primary" />
              Security Keys
            </h1>
            <p className="text-light-text-secondary dark:text-dark-text-secondary mt-1">
              Manage your WebAuthn security keys for passwordless authentication
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-light-text-secondary dark:text-dark-text-secondary" />
              <Input
                placeholder="Search keys..."
                // value={searchQuery}
                // onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full md:w-[200px] bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border"
              />
            </div> */}
            {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                // onClick={handleAddKey}
                className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Key
              </Button>
            </motion.div> */}
          </div>
        </div>
      </motion.div>

      <Card className="overflow-hidden border-light-border dark:border-dark-border">
        <CardHeader className="bg-light-background/50 dark:bg-dark-background/50 border-b border-light-border dark:border-dark-border">
          <CardTitle className="text-lg text-light-text-primary dark:text-dark-text-primary">
            Your Security Keys
          </CardTitle>
          <CardDescription>Keys that can be used for passwordless authentication</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6">
              <motion.div variants={shimmerVariants} initial="hidden" animate="visible" className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-light-border dark:bg-dark-border"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-1/3 bg-light-border dark:bg-dark-border rounded"></div>
                      <div className="h-3 w-1/2 bg-light-border dark:bg-dark-border rounded"></div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : filteredKeys.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-light-border dark:border-dark-border bg-light-background/30 dark:bg-dark-background/30">
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                      Last Used At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-light-text-secondary dark:text-dark-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence>
                    {keys.map((key) => (
                      <motion.tr
                        key={key.id}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="border-b border-light-border dark:border-dark-border hover:bg-light-background/50 dark:hover:bg-dark-background/50 transition-colors"
                        layout
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                              transition={{ duration: 0.5 }}
                              className="flex-shrink-0 h-10 w-10 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center"
                            >
                              <Key className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                            </motion.div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-light-text-primary dark:text-dark-text-primary">
                                {key.name}
                              </span>
                              {key.isPasswordless && (
                                <Badge
                                  variant="outline"
                                  className="mt-1 text-xs bg-light-primary/10 dark:bg-dark-primary/10 text-light-primary dark:text-dark-primary border-light-primary/20 dark:border-dark-primary/20"
                                >
                                  Passwordless
                                </Badge>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-light-text-primary dark:text-dark-text-primary">
                            {typeof key.is_passwordless === 'undefined'
                              ? 'Type unspecified'
                              : (key.is_passwordless ? 'Passkey' : 'Security key')
                            }
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            <Calendar className="h-4 w-4 mr-1.5" />
                            <span>{new Date(key.created_at * 1000).toLocaleString()}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            <Clock className="h-4 w-4 mr-1.5" />
                            <span>
                              {key.last_used_at
                                ? new Date(key.last_used_at * 1000).toLocaleString()
                                : "Never Used"
                              }
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {key.status === "unused" ? (
                            <Badge className="bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 border-yellow-500/30">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Unused
                            </Badge>
                          ) : (
                            <Badge className="bg-green-500/20 text-green-600 dark:text-green-400 border-green-500/30">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Active
                            </Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    // onClick={() => handleEditType(key)}
                                    // onClick={() => }
                                    onClick={() => handleEditKeyClick(key)}
                                    className="p-1.5 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-primary dark:hover:text-dark-primary hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </motion.button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Edit Type</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsDeleteDialogOpen(true)}
                                    className="p-1.5 rounded-md text-light-text-secondary dark:text-dark-text-secondary hover:text-light-secondary dark:hover:text-dark-secondary hover:bg-light-background dark:hover:bg-dark-background transition-colors"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </motion.button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Delete Key</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          {key.id === editId
                            ? <>
                              {/* Edit Type Dialog */}
                                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                                  <DialogContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                                    <DialogHeader>
                                      <DialogTitle className="text-light-text-primary dark:text-dark-text-primary">Edit Key</DialogTitle>
                                      <DialogDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                                        Update the your security key.
                                      </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-2">
                                      <div className="flex items-center gap-3 mb-4">
                                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center">
                                          <Key className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                                        </div>
                                        <div>
                                          <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{key.name}</p>

                                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                            {/* Current type: {keyToEdit?.type} */}
                                          </p>
                                        </div>
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="key-name" className="text-light-text-primary dark:text-dark-text-primary">
                                          Key Name
                                        </Label>
                                        <Input
                                          id="key-name"
                                          value={editedKeyName}
                                          onChange={(e) => setEditedKeyName(e.target.value)}
                                          placeholder="Enter new key name"
                                          className={`bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border ${
                                            editedKeyName.trim().length <= 1 && editedKeyName.trim().length > 0 ? "border-red-500" : ""
                                          }`}
                                          required
                                        />
                                        {editedKeyName.trim().length <= 1 && editedKeyName.trim().length > 0 && (
                                          <p className="text-xs text-red-500 mt-1">Key name must be at least 2 characters</p>
                                        )}
                                      </div>

                                      <div className="space-y-2">
                                        <Label htmlFor="key-type" className="text-light-text-primary dark:text-dark-text-primary">
                                          Key Type
                                        </Label>
                                        <Select value={editedType} onValueChange={setEditedType}>
                                          <SelectTrigger
                                            id="key-type"
                                            className="bg-light-background dark:bg-dark-background border-light-border dark:border-dark-border"
                                          >
                                            <SelectValue placeholder="Select a type" />
                                          </SelectTrigger>
                                          <SelectContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                                            <SelectItem value="unspecified">Unspecified</SelectItem>
                                            <SelectItem value="usb">USB Security Key</SelectItem>
                                            <SelectItem value="nfc">NFC Security Key</SelectItem>
                                            <SelectItem value="bluetooth">Bluetooth Security Key</SelectItem>
                                            <SelectItem value="internal">Internal (TPM/Platform)</SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                    <DialogFooter className="gap-2 sm:gap-0">
                                      <Button
                                        variant="outline"
                                        onClick={() => setIsEditDialogOpen(false)}
                                        className="border-light-border dark:border-dark-border"
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        onClick={(e) => handleKeySave(e, key, editedKeyName)}
                                        disabled={!isValidName}
                                        className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90"
                                      >
                                        <Edit className="mr-2 h-4 w-4" />
                                        Save Changes
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                            </>
                            : null
                          }
                          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                              <DialogHeader>
                                <DialogTitle className="text-light-text-primary dark:text-dark-text-primary">
                                  Delete Security Key
                                </DialogTitle>
                                <DialogDescription className="text-light-text-secondary dark:text-dark-text-secondary">
                                  Are you sure you want to delete this security key? This action cannot be undone.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="p-4 rounded-md bg-light-background/50 dark:bg-dark-background/50 border border-light-border dark:border-dark-border">
                                <div className="flex items-center gap-3">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-light-secondary/10 dark:bg-dark-secondary/10 flex items-center justify-center">
                                    <Key className="h-5 w-5 text-light-secondary dark:text-dark-secondary" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-light-text-primary dark:text-dark-text-primary">{key.name}</p>
                                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                                      Created on {new Date(key.created_at * 1000).toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <DialogFooter className="gap-2 sm:gap-0">
                                <Button
                                  variant="outline"
                                  onClick={() => setIsDeleteDialogOpen(false)}
                                  className="border-light-border dark:border-dark-border"
                                >
                                  Cancel
                                </Button>
                                <Button
                                  variant="destructive"
                                  onClick={(e) => handleKeyDelete(e, key)}
                                  className="bg-light-secondary hover:bg-light-secondary/90 dark:bg-dark-secondary dark:hover:bg-dark-secondary/90"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Key
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </td>
                      </motion.tr>
                    ))}
                    
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="w-16 h-16 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 flex items-center justify-center mb-4"
              >
                <Key className="h-8 w-8 text-light-primary dark:text-dark-primary" />
              </motion.div>
              <h3 className="text-xl font-medium text-light-text-primary dark:text-dark-text-primary mb-2">
                No security keys found
              </h3>
              <p className="text-light-text-secondary dark:text-dark-text-secondary max-w-md mb-6">
                You haven't added any security keys yet. Add a security key to enable passwordless authentication.
              </p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  // onClick={handleAddKey}
                  className="bg-light-primary hover:bg-light-primary/90 dark:bg-dark-primary dark:hover:bg-dark-primary/90 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Key
                </Button>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
        {filteredKeys.length > 0 && (
          <CardFooter className="bg-light-background/50 dark:bg-dark-background/50 border-t border-light-border dark:border-dark-border flex justify-between items-center py-4">
            <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              {filteredKeys.length} {filteredKeys.length === 1 ? "key" : "keys"} found
            </div>
            <Link to='/account/2fa/webauthn/add'>
              <Button
                variant="outline"
                size="sm"
                // onClick={handleAddKey}
                className="border-light-primary text-light-primary hover:bg-light-primary/10 dark:border-dark-primary dark:text-dark-primary dark:hover:bg-dark-primary/10"
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Key
              </Button>
            </Link>
          </CardFooter>
        )}
      </Card>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Alert className="mt-6 bg-light-primary/5 dark:bg-dark-primary/10 border-light-primary/20 dark:border-dark-primary/20">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-light-primary dark:text-dark-primary mt-0.5" />
            <AlertDescription className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              <span className="font-medium block mb-1">About Security Keys</span>
              Security keys provide a strong, phishing-resistant form of two-factor authentication. When set up for
              passwordless authentication, you can sign in with just your security key, without needing to enter your
              password.
            </AlertDescription>
          </div>
        </Alert>
      </motion.div>

      
      
    </div>
  )
}