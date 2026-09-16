import { useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "./button"
import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { ChevronDown, Users} from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from "./tabs"
import { ScrollArea } from "./scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import {
    Tooltip as UITooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "./tooltip"

  function CollectionsCard() {
    const [activeTab, setActiveTab] = useState("have")
    const [isExpanded, setIsExpanded] = useState(false)
  
    const collectionTypes = [
      { id: "have", label: "I HAVE" },
      { id: "wishlist", label: "WISH LIST" },
      { id: "watchlist", label: "WATCH LIST" },
      { id: "signature", label: "SIGNATURE" },
    ]
  
    const users = [
      { username: "1504annabell", gender: "female" },
      { username: "1ara", gender: "female" },
      { username: "200words", gender: "female" },
      { username: "2071991", gender: "female" },
      { username: "21Anja04", gender: "female" },
      { username: "2baa", gender: "female" },
      { username: "A1610x", gender: "female" },
      { username: "Aaaa", gender: "female" },
      { username: "Achilles", gender: "male" },
      { username: "Ackwel", gender: "male" },
      { username: "Adake", gender: "female" },
      { username: "Addict540", gender: "female" },
    ]
  
    const displayedUsers = isExpanded ? users : users.slice(0, 6)
  
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            In Collections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {collectionTypes.map((type) => (
                <TabsTrigger
                  key={type.id}
                  value={type.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {type.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
  
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="font-medium">16,513 Users own Naxos</div>
              <div className="flex gap-4">
                <span className="text-pink-500">♀️ 6%</span>
                <span className="text-blue-500">♂️ 94%</span>
              </div>
            </div>
  
            <ScrollArea className="h-[280px] rounded-md border p-4">
              <motion.div layout className="space-y-2">
                <AnimatePresence>
                  {displayedUsers.map((user, index) => (
                  <motion.div
                      key={user.username}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TooltipProvider>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <Link
                              to={`/user/${user.username}`}
                              className={`block p-2 rounded-md transition-colors hover:bg-muted ${
                                user.gender === "female" ? "text-pink-500" : ""
                              }`}
                            >
                              <motion.span
                                whileHover={{ x: 4 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                className="inline-block"
                              >
                                {user.username}
                              </motion.span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View {user.username}&apos;s profile</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </ScrollArea>
  
            <Button
              variant="ghost"
              className="w-full text-muted-foreground hover:text-foreground"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <span>{isExpanded ? "Show less" : "Show more"}</span>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

export { CollectionsCard }