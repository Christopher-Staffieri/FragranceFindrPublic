import Button from '../components/Button'
import { useState } from 'react'
import { getWebAuthnRequestOptionsForLogin, loginUsingWebAuthn } from '../lib/allauth'
import {
  parseRequestOptionsFromJSON,
  get
} from '@github/webauthn-json/browser-ponyfill'
import { Key } from 'lucide-react'

export default function WebAuthnLoginButton (props) {
  const [response, setResponse] = useState({ fetching: false, content: null })

  async function submit (e) {
    e.preventDefault()
    setResponse({ ...response, fetching: true })
    try {
      const optResp = await getWebAuthnRequestOptionsForLogin()
      const jsonOptions = optResp.data.request_options
      const options = parseRequestOptionsFromJSON(jsonOptions)
      const credential = await get(options)
      const loginResp = await loginUsingWebAuthn(credential)
      setResponse((r) => { return { ...r, content: loginResp } })
    } catch (e) {
      console.error(e)
      window.alert(e)
    }
    setResponse((r) => { return { ...r, fetching: false } })
  }
  // return <Button onClick={submit}>{props.children}</Button>

  return <button
            type="button"
            onClick={submit}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-light-border dark:border-dark-border bg-light-background dark:bg-dark-background text-light-text-primary dark:text-dark-text-primary hover:bg-light-primary/5 dark:hover:bg-blue-500/10 transition-colors duration-200"
          >
            <Key className="w-5 h-5" />
            <span className="font-medium">Sign in with passkey</span>
          </button>
}