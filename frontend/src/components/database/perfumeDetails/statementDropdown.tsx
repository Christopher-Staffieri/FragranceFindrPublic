import { useEffect, useState } from "react"
import { checkUserPerfumeStatement } from "../../../lib/allauth"
import { useUser } from "../../../auth"
import { useAuthInfo } from "../../../auth/hooks"
import StatementsForm from "./statementForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card"
import { Button } from "./button"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { Link } from "react-router-dom"



export default function StatementDropdown({isStatementOpen, setIsStatementOpen, perfume}){

    const [expandedStatements, setExpandedStatements] = useState<number[]>([])
    const [statements, setStatements] = useState([])
    const currentUser = useUser()
    const userAuthStatus = useAuthInfo()
    const [userLikedReview, setUserLikedReview] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [control, setControl] = useState(false)
    const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })
    const [userStatementData, setUserStatementData] = useState(null)
    const [status, setStatus] = useState('')
    const [isExpanded, setIsExpanded] = useState(false)
    const [isHelpful, setIsHelpful] = useState<boolean | null>(null)

    useEffect(() => {
      console.log('ran effect')
      if (currentUser){
        setResponse((r) => { return { ...r, fetching: true } })
          checkUserPerfumeStatement({statement_perfume:perfume.perfume.id, posted_by:currentUser.profile}).then((resp) => {
              console.log(resp)
              if (resp.error){
                  setUserStatementData(null)
              }else{
                setUserStatementData(resp)
                  setStatus('200')
              }
              
    
          }).catch((e) => {
              console.error(e)
              window.alert(e)
            }).then(() => {
              setResponse((r) => { return { ...r, fetching: false } })
              
            })
      }
      
    }, [control, currentUser])

    const handleDataRefresh = (data) => {
      console.log('ran refresh')
      setControl(data)
    }

    return (
      <>
        {userAuthStatus.isAuthenticated
          ? <StatementsForm isOpen={isStatementOpen} onClose={() => setIsStatementOpen(false)} statementData={userStatementData} perfumeId={perfume.perfume.id} refreshData={handleDataRefresh}/>
          : <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 "
          >
            {/* <div className="absolute inset-full bg-[#2B2D30]" onClick={onClose} /> */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-auto rounded-lg shadow-lg bg-gray-200"
            >
              <Card className="border-gray-200 dark:border-gray-700">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-bold">Write Statement</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full"

                      onClick={() => setIsStatementOpen(false)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Close</span>
                    </Button>
                  </div>
                  <CardDescription className="text-gray-500 dark:text-gray-400">
                  Please <Link to='/login' className="relative md:font-bold text-lg font-medium text-[#ECECEC] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-in-out hover:after:origin-bottom-left hover:after:scale-x-100">login</Link> to use this feature.
                  </CardDescription>
                </CardHeader>
                </Card>
                </motion.div>
                </motion.div>
                </AnimatePresence>
        }
        

      </>

    )
}