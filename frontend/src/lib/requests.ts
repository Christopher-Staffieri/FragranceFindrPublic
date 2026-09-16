import { getCSRFToken } from "./django"

const tokenStorage = sessionStorage
const Client = Object.freeze({
    APP: 'app',
    BROWSER: 'browser'
  })
  
const CLIENT = Client.BROWSER
  
const ACCEPT_JSON = {
    accept: 'application/json'
}
  
export const AuthProcess = Object.freeze({
    LOGIN: 'login',
    CONNECT: 'connect'
})

const BASE_URL = `/_allauth/${CLIENT}/v1`

export const URLs = Object.freeze({
    // Meta
    CONFIG: BASE_URL + '/config',
    
    COMPOSE_RESEARCH: '/research/compose',

    GET_PENDING_PROPOSALS: '/_api/research/pending-approvals'
    // Account management
   
  
    // Account management: 2FA
   
  
    // Auth: Basics
   
  
    // Auth: 2FA
   
    // Auth: Social
   
  
    // Auth: Sessions
   
  })

async function request (method, path, data, headers) {
    const options = {
      method,
      headers: {
        ...ACCEPT_JSON,
        ...headers
      }
    }
    // Don't pass along authentication related headers to the config endpoint.
    if (path !== URLs.CONFIG) {
      if (CLIENT === Client.BROWSER) {
        options.headers['X-CSRFToken'] = getCSRFToken()
      } else if (CLIENT === Client.APP) {
        // IMPORTANT!: Do NOT use `Client.APP` in a browser context, as you will
        // be vulnerable to CSRF attacks. This logic is only here for
        // development/demonstration/testing purposes...
        options.headers['User-Agent'] = 'django-allauth example app'
        const sessionToken = tokenStorage.getItem('sessionToken')
        if (sessionToken) {
          options.headers['X-Session-Token'] = sessionToken
        }
      }
    }
  
    if (typeof data !== 'undefined') {
      options.body = JSON.stringify(data)
      options.headers['Content-Type'] = 'application/json'
    }
    const resp = await fetch(path, options)
    const msg = await resp.json()
    console.log(resp)
    console.log(msg)
    if (msg.status === 410) {
      tokenStorage.removeItem('sessionToken')
    }
    if ([401, 410].includes(msg.status) || (msg.status === 200 && msg.meta?.is_authenticated)) {
      if (msg.meta?.session_token) {
        tokenStorage.setItem('sessionToken', msg.meta.session_token)
      }
      const event = new CustomEvent('allauth.auth.change', { detail: msg })
      document.dispatchEvent(event)
    }
    return msg
  }

export async function addResearch (data) {
    return await request('POST', URLs.COMPOSE_RESEARCH, data)
  }

export async function getPendingProposals(){
  return await request("GET", URLs.GET_PENDING_PROPOSALS)
}

export async function getPerfumes() {
  return await request("GET", URLs.COMPOSE_RESEARCH)
  
}


