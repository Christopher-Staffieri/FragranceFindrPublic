import { useEffect, createContext, useState } from 'react'
import { getAuth, getConfig } from '../lib/allauth'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import LoadingPage from '../components/common/loadingPage'

export const AuthContext = createContext(null)

function Loading () {
  return(
    <LoadingPage/>
  )
}

function LoadingError () {
  return <div>Loading error!</div>
}

export function AuthContextProvider (props) {
  const [auth, setAuth] = useState(undefined)
  const [config, setConfig] = useState(undefined)

  useEffect(() => {
    function onAuthChanged (e) {
      setAuth(auth => {
        if (typeof auth === 'undefined') {
          console.log('Authentication status loaded')
        } else {
          console.log('Authentication status updated')
        }
        return e.detail
      }
      )
    }

    document.addEventListener('allauth.auth.change', onAuthChanged)
    getAuth().then(data => setAuth(data)).catch((e) => {
      console.error(e)
      setAuth(false)
    })
    getConfig().then(data => setConfig(data)).catch((e) => {
      console.error(e)
    })
    return () => {
      document.removeEventListener('allauth.auth.change', onAuthChanged)
    }
  }, [])
  const loading = (typeof auth === 'undefined') || config?.status !== 200
  return (
    <AuthContext.Provider value={{ auth, config }}>
      {loading
        ? <Loading />
        : (auth === false
            ? <LoadingError />
            : props.children)}
    </AuthContext.Provider>
  )
}
