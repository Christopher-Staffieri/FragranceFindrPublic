import { useState, useEffect } from 'react'
import { useConfig } from '../auth'
import * as allauth from '../lib/allauth'
import { Button } from '../components/MainButton'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/database/perfumeDetails/card'
import { CheckCircle, ExternalLink, LogOut, Star } from 'lucide-react'

export default function Sessions () {
  const config = useConfig()
  const [sessions, setSessions] = useState([])
  const [response, setResponse] = useState({ fetching: false, content: { status: 200, data: [] } })

  useEffect(() => {
    setResponse((r) => { return { ...r, fetching: true } })
    allauth.getSessions().then((resp) => {
      if (resp.status === 200) {
        setSessions(resp.data)
      }
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }, [])

  const otherSessions = sessions.filter(session => !session.is_current)
  

  const handleLogout = (sessions) => {
    setResponse({ ...response, fetching: true })
    allauth.endSessions(sessions.map(s => s.id)).then((resp) => {
      setResponse((r) => { return { ...r, content: resp } })
      if (resp.status === 200) {
        setSessions(resp.data)
      }
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }

  return (
    <>
      <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-light-primary dark:text-dark-primary" />
                  Active Sessions
                </CardTitle>
                <CardDescription>Manage your active login sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="overflow-x-auto rounded-lg border border-light-border dark:border-dark-border">
                  <table className="w-full">
                    <thead className="bg-light-background dark:bg-dark-background text-light-text-secondary dark:text-dark-text-secondary text-sm">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium">Started At</th>
                        <th className="px-4 py-3 text-left font-medium">IP Address</th>
                        <th className="px-4 py-3 text-left font-medium">Browser</th>
                        {config.data.usersessions.track_activity ? <th>Last Seen At</th> : null}
                        <th className="px-4 py-3 text-left font-medium">Current</th>
                        <th className="px-4 py-3 text-left font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-light-border dark:divide-dark-border">
                      {sessions.map((session, i) => {
                        return(
                          <motion.tr
                            className="bg-light-surface dark:bg-dark-surface"
                            whileHover={{ backgroundColor: "rgba(74, 144, 226, 0.05)" }}
                          >
                            <td className="px-4 py-3 text-sm text-light-text-primary dark:text-dark-text-primary">
                              {new Date(session.created_at * 1000).toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-sm text-light-text-primary dark:text-dark-text-primary">
                              {session.ip}
                            </td>
                            <td className="px-4 py-3 text-sm text-light-text-primary dark:text-dark-text-primary truncate max-w-[300px]">
                              <div className="flex items-center">
                                <span className="text-light-primary dark:text-dark-primary mr-2">★</span>
                                <span className="truncate">
                                  {session.user_agent}
                                </span>
                              </div>
                            </td>
                            {config.data.usersessions.track_activity ? <td className="px-4 py-3 text-sm text-light-text-primary dark:text-dark-text-primary">{session.last_seen_at}</td> : null}
                            <td className="px-4 py-3 text-sm text-light-text-primary dark:text-dark-text-primary">
                              {session.is_current ? <CheckCircle className='text-light-primary'/> : ''}
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-light-secondary dark:text-dark-secondary hover:text-light-secondary/80 dark:hover:text-dark-secondary/80"
                                onClick={() => handleLogout([session])}
                              >
                                Logout
                              </Button>
                            </td>
                      </motion.tr>
                        )
                      })}
                      
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      disabled={otherSessions.length <= 1}
                      variant="ghost"
                      size="sm"
                      className="text-light-secondary dark:text-dark-secondary border-light-secondary dark:border-dark-secondary"
                      onClick={() => handleLogout(otherSessions)}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout elsewhere
                    </Button>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
    </>
      

    
  )
}
