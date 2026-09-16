import { getCSRFToken } from './django'

const Client = Object.freeze({
  APP: 'app',
  BROWSER: 'browser'
})

export const settings = {
  client: Client.BROWSER,
  baseUrl: `/_allauth/${Client.BROWSER}/v1`,
  withCredentials: false
}

const ACCEPT_JSON = {
  accept: 'application/json'
}

// const CLIENT = Client.BROWSER

// const BASE_URL = `/_allauth/${CLIENT}/v1`
// const ACCEPT_JSON = {
//   accept: 'application/json'
// }

export const AuthProcess = Object.freeze({
  LOGIN: 'login',
  CONNECT: 'connect'
})

export const Flows = Object.freeze({
  LOGIN: 'login',
  LOGIN_BY_CODE: 'login_by_code',
  MFA_AUTHENTICATE: 'mfa_authenticate',
  MFA_REAUTHENTICATE: 'mfa_reauthenticate',
  MFA_TRUST: 'mfa_trust',
  MFA_WEBAUTHN_SIGNUP: 'mfa_signup_webauthn',
  PASSWORD_RESET_BY_CODE: 'password_reset_by_code',
  PROVIDER_REDIRECT: 'provider_redirect',
  PROVIDER_SIGNUP: 'provider_signup',
  REAUTHENTICATE: 'reauthenticate',
  SIGNUP: 'signup',
  VERIFY_EMAIL: 'verify_email',
})

export const URLs = Object.freeze({
  // Meta
  CONFIG: '/config',

  GET_USER_REVIEWS_TOTAL : '/database/get-user-review-total',
  GET_RECENT_PERFUME_RATINGS: '/database/get-recent-perfume-rating',
  
  COMPOSE_RESEARCH: '/research/compose',
  PROPOSE_PROPOSAL_EDITS: '/research/propose-proposal-edits',
  COMPOSE_EDITS: '/account/propose-edits',
  CHECK_EDITS_ID: '/research/check-edits-id',
  CHECK_EDITS_NAME: '/research/check-edits-name',
  CONFIRM_PERFUME: '/research/confirm-perfume',
  ADD_SOURCE: '/research/add-source',
  GET_SOURCE: '/research/get-sources',
  GET_SOURCE_COUNT: '/research/get-fragrance-sources-count',
  CONFIRM_SOURCE: '/research/confirm-fragrance-source-checklist',
  REMOVE_SOURCE_CONFIRMATION: '/research/remove-fragrance-source-checklist-confirmation',

  // path("post-fragrance-source", PostFragranceSource.as_view()),
  //   path("retrieve-fragrance-sources", GetFragranceSources.as_view()),
  PROPOSE_DISCUSSION: '/research/propose-discussion',
  LIST_PERFUMES: '/database/list_perfumes',

  // Database
  GET_ALL_DATABASE_FRAGRANCES: '/database/get-all-fragrances-count',
  GET_ALL_BRANDS: '/database/get-all-brands-count',
  GET_RECENTLY_POSTED_FRAGRANCES: '/database/get-recently-posted-fragrances',
  GET_SEARCHED_PERFUMES: '/database/get-searched-perfumes',
  GET_FRAGRANCE_PROPOSAL: '/database/get-fragrance-proposal',
  GET_SEARCHED_BRANDS: '/database/get-searched-brands/',
  GET_SEARCHED_PERFUMERS: '/database/get-searched-perfumers/',
  GET_SEARCHED_BOTTLE_DESIGNERS: '/database/get-searched-bottle-designers/',
  GET_SEARCHED_PARENT_COMPANIES: '/database/get-searched-parent-company/',
  GET_SEARCHED_FRAGRANCE_COLLECTIONS: '/database/get-fragrance-collections/',
  GET_PERFUME: '/database/get-perfume',
  GET_PERFUME_RATING: '/database/get-perfume-rating',
  GET_PERFUME_SCENT_RATING: '/database/get-perfume-scent-rating',
  GET_PERFUME_AVG_RATINGS: '/database/get-perfume-avg-ratings',
  GET_PERFUME_REVIEWS: '/database/display-fragrance-reviews',
  UPDATE_REVIEW_LIKES: '/database/update-review-likes',
  UPDATE_REVIEW_DISLIKES: '/database/update-review-dislikes',
  UPDATE_REVIEW_AWARDS: '/database/update-review-awards',
  UPDATE_STATEMENT_AWARDS: '/database/update-statement-awards',

  GET_USER_NOTIFICATIONS: '/database/get-user-notifications',
  MARK_USER_NOTIFICATIONS_AS_READ: '/database/mark-user-notifications-as-read',
  // Shouldnt need this as collections are auto created when a user confirms their email
  CREATE_USER_COLLECTION: '/account/create-collection',
  CHECK_USER_PERFUME_RATING: '/database/check-user-perfume-rating',
  CREATE_USER_PERFUME_RATING: '/database/create-user-perfume-rating',
  UPDATE_USER_PERFUME_RATING: '/database/update-user-perfume-rating',
  GET_PERFUME_TOTAL_RATINGS: '/database/get-perfume-rating-total',
  CHECK_USER_PERFUME_REVIEW: '/database/check-user-perfume-review',
  CREATE_USER_PERFUME_REVIEW: '/database/create-user-perfume-review',
  UPDATE_USER_PERFUME_REVIEW: '/database/update-user-perfume-review',
  UPDATE_USER_FRAGRANCE_STATEMENT: '/database/update-user-perfume-statement',
  CHECK_USER_PERFUME_STATEMENT: '/database/check-user-perfume-statement',
  CREATE_USER_PERFUME_STATEMENT: '/database/create-user-perfume-statement',
  DISPLAY_FRAGRANCE_STATEMENTS: '/database/display-fragrance-statements',
  UPDATE_USER_PERFUME_STATEMENT: '/database/update-user-perfume-statement',
  GET_USER_CUSTOM_COLLECTIONS: '/database/get-user-custom-collections',
  CREATE_USER_CUSTOM_COLLECTION: '/database/create-user-custom-collection',
  GET_USER_COLLECTIONS: '/database/get-user-collections',
  UPDATE_USER_CUSTOM_COLLECTION: '/database/update-user-custom-collection',
  ADD_PERFUME_TO_CUSTOM_COLLECTION: '/database/add-fragrance-to-custom-collection',
  REMOVE_PERFUME_FROM_CUSTOM_COLLECTION: '/database/remove-fragrance-from-custom-collection',
  DELETE_CUSTOM_COLLECTION: '/database/delete-custom-collection',

  SUBSCRIBE_TO_FRAGRANCE: '/database/perfume-subscribe',
  UNSUBSCRIBE_FROM_FRAGRANCE: '/database/perfume-unsubscribe',
  CHECK_USER_PERFUME_SUBSCRIPTIONS: '/database/check-user-subscription',


  GET_USER_FRAGRANCE_CLASSIFICATION: '/database/get-user-fragrance-classification',
  CREATE_USER_FRAGRANCE_CLASSIFICATION: '/database/create-user-fragrance-classification',
  UPDATE_USER_FRAGRANCE_CLASSIFICATION: '/database/update-user-fragrance-classification',

  CREATE_FRAGRANCE_NOTE: '/database/create-fragrance-note',

  GET_USER_FROM_NAME: '/account/get-user-from-username',
  GET_USER_DASHBOARD_INFO: '/account/dashboard-info',


  UPDATE_USER_COLLECTION: '/database/update-user-collection',
  CHECK_FOR_PERFUME_IN_COLLECTION: '/database/check-for-perfume-in-user-collection',
  CHECK_FOR_PERFUME_IN_CUSTOM_COLLECTION: '/database/check-for-perfume-in-user-custom-collection',
  // Account management
  CHANGE_PASSWORD: '/account/password/change',
  EMAIL: '/account/email',
  PROVIDERS: '/account/providers',

  GROUP: '/account/group',
  USER_PROFILE: '/account/profile',
  CHANGE_PFP: '/profile/update-pfp/',
  IS_RESEARCH_AUDITOR: '/account/is-research-auditor',
  IS_RESEARCH_MANAGER: '/account/is-research-manager',
  GET_PENDING_PROPOSALS: '/account/pending-approvals',

  // Account management: 2FA
  AUTHENTICATORS: '/account/authenticators',
  RECOVERY_CODES: '/account/authenticators/recovery-codes',
  TOTP_AUTHENTICATOR: '/account/authenticators/totp',
  

  // Auth: Basics
  LOGIN: '/auth/login',
  REQUEST_LOGIN_CODE: '/auth/code/request',
  CONFIRM_LOGIN_CODE: '/auth/code/confirm',
  SESSION: '/auth/session',
  REAUTHENTICATE: '/auth/reauthenticate',
  REQUEST_PASSWORD_RESET: '/auth/password/request',
  RESET_PASSWORD: '/auth/password/reset',
  SIGNUP: '/auth/signup',
  VERIFY_EMAIL: '/auth/email/verify',

  // Auth: 2FA
  MFA_AUTHENTICATE: '/auth/2fa/authenticate',
  MFA_REAUTHENTICATE: '/auth/2fa/reauthenticate',
  MFA_TRUST: '/auth/2fa/trust',
  // Auth: Social
  PROVIDER_SIGNUP: '/auth/provider/signup',
  REDIRECT_TO_PROVIDER: '/auth/provider/redirect',
  PROVIDER_TOKEN: '/auth/provider/token',

  // Auth: Sessions
  SESSIONS: '/auth/sessions',

  // Auth: WebAuthn
  REAUTHENTICATE_WEBAUTHN: '/auth/webauthn/reauthenticate',
  AUTHENTICATE_WEBAUTHN: '/auth/webauthn/authenticate',
  LOGIN_WEBAUTHN: '/auth/webauthn/login',
  SIGNUP_WEBAUTHN: '/auth/webauthn/signup',
  WEBAUTHN_AUTHENTICATOR: '/account/authenticators/webauthn'
})

export const AuthenticatorType = Object.freeze({
  TOTP: 'totp',
  RECOVERY_CODES: 'recovery_codes',
  WEBAUTHN: 'webauthn'
})

function postForm (action, data) {
  const f = document.createElement('form')
  f.method = 'POST'
  f.action = settings.baseUrl + action

  for (const key in data) {
    const d = document.createElement('input')
    d.type = 'hidden'
    d.name = key
    d.value = data[key]
    f.appendChild(d)
  }
  document.body.appendChild(f)
  f.submit()
}

const tokenStorage = window.sessionStorage

export function getSessionToken () {
  return tokenStorage.getItem('sessionToken')
}

async function request (method, path, data, headers) {
  const options = {
    method,
    headers: {
      ...ACCEPT_JSON,
      ...headers
    }
  }

  if (settings.withCredentials) {
    options.credentials = 'include'
  }
  // Don't pass along authentication related headers to the config endpoint.
  if (path !== URLs.CONFIG) {
    if (settings.client === Client.BROWSER) {
      options.headers['X-CSRFToken'] = getCSRFToken()
    } else if (settings.client === Client.APP) {
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
  const resp = await fetch(settings.baseUrl + path, options)
  const msg = await resp.json()
  if (msg.status === 410) {
    tokenStorage.removeItem('sessionToken')
  }
  if (msg.meta?.session_token) {
    tokenStorage.setItem('sessionToken', msg.meta.session_token)
  }
  if ([401, 410].includes(msg.status) || (msg.status === 200 && msg.meta?.is_authenticated)) {
    const event = new CustomEvent('allauth.auth.change', { detail: msg })
    document.dispatchEvent(event)
  }
  return msg
}

// Research Calls

export async function composeEdits (data) {
  // return await fetch(URLs.COMPOSE_RESEARCH)
  return await request('POST', URLs.COMPOSE_EDITS, data)
}

//  Shouldnt need this function
export async function createUserCollection (data) {
  // return await fetch(URLs.COMPOSE_RESEARCH)
  return await request('POST', URLs.CREATE_USER_COLLECTION, data)
}

export async function signUpByPasskey (data) {
  return await request('POST', URLs.SIGNUP_WEBAUTHN, data)
}

export async function checkPerfumeEditsWithID (data) {
  return await request('POST', URLs.CHECK_EDITS_ID, data)
}

export async function checkPerfumeEditsWithName(data) {
  return await request('POST', URLs.CHECK_EDITS_NAME, data)
}

export async function checkForPerfumeInUserCollection(data) {
  return await request('POST', URLs.CHECK_FOR_PERFUME_IN_COLLECTION, data)
}

export async function checkForPerfumeInUserCustomCollection(data) {
  return await request('POST', URLs.CHECK_FOR_PERFUME_IN_CUSTOM_COLLECTION, data)
}

export async function getUserDashboardInfo(data) {
  return await request('POST', URLs.GET_USER_DASHBOARD_INFO, data)
}

export async function getUserReviewsTotal(data) {
  return await request('POST', URLs.GET_USER_REVIEWS_TOTAL, data)
}

export async function checkUserPerfumeRating(data) {
  return await request('POST', URLs.CHECK_USER_PERFUME_RATING, data)
}

export async function getUserCustomCollections(data) {
  return await request('POST', URLs.GET_USER_CUSTOM_COLLECTIONS, data)
}

export async function getUserFragranceClassification(data) {
  return await request('POST', URLs.GET_USER_FRAGRANCE_CLASSIFICATION, data)
}

export async function getUserFromName(data) {
  return await request('POST', URLs.GET_USER_FROM_NAME, data)
}

export async function getRecentPerfumeRatings(data) {
  return await request('POST', URLs.GET_RECENT_PERFUME_RATINGS, data)
}

export async function getUserCollections(data) {
  return await request('POST', URLs.GET_USER_COLLECTIONS, data)
}

export async function getPerfumeScentRating(data) {
  return await request('POST', URLs.GET_PERFUME_SCENT_RATING, data)
}

export async function getPerfumeTotalRatings(data) {
  return await request('POST', URLs.GET_PERFUME_TOTAL_RATINGS, data)
}

export async function getPerfumeAvgRatings(data) {
  return await request('POST', URLs.GET_PERFUME_AVG_RATINGS, data)
}

export async function subscribeToFragrance(data) {
  return await request('POST', URLs.SUBSCRIBE_TO_FRAGRANCE, data)
}

export async function unSubscribeFromFragrance(data) {
  return await request('POST', URLs.UNSUBSCRIBE_FROM_FRAGRANCE, data)
}

export async function checkUserPerfumeSubscriptions(data) {
  return await request('POST', URLs.CHECK_USER_PERFUME_SUBSCRIPTIONS, data)
}

export async function postUserCustomCollection(data) {
  return await request('POST', URLs.CREATE_USER_CUSTOM_COLLECTION, data)
}

export async function markUserNotificationsAsRead(data) {
  return await request('POST', URLs.MARK_USER_NOTIFICATIONS_AS_READ, data)
}

export async function checkUserPerfumeStatement(data) {
  return await request('POST', URLs.CHECK_USER_PERFUME_STATEMENT, data)
}

export async function postUserPerfumeRating(data) {
  return await request('POST', URLs.CREATE_USER_PERFUME_RATING, data)
}

export async function postUserPerfumeStatement(data) {
  return await request('POST', URLs.CREATE_USER_PERFUME_STATEMENT, data)
}

export async function postFragranceNote(data) {
  return await request('POST', URLs.CREATE_FRAGRANCE_NOTE, data)
}

export async function getFragranceReviews(data) {
  return await request('POST', URLs.GET_PERFUME_REVIEWS, data)
} 

export async function getFragranceStatements(data) {
  return await request('POST', URLs.DISPLAY_FRAGRANCE_STATEMENTS, data)
} 

export async function createUserPerfumeClassification(data) {
  return await request('POST', URLs.CREATE_USER_FRAGRANCE_CLASSIFICATION, data)
}

export async function deleteCustomCollection(data) {
  return await request('DELETE', URLs.DELETE_CUSTOM_COLLECTION, data)
}

export async function updateUserPerfumeRating(data) {
  return await request('PUT', URLs.UPDATE_USER_PERFUME_RATING, data)  
}

export async function updateUserCollection(data) {
  return await request('PUT', URLs.UPDATE_USER_COLLECTION, data)  
}

export async function updateUserCustomCollection(data) {
  return await request('PATCH', URLs.UPDATE_USER_CUSTOM_COLLECTION, data)  
}

export async function updateReviewLikes(data) {
  return await request('PATCH', URLs.UPDATE_REVIEW_LIKES, data)  
}

export async function updateReviewAwards(data) {
  return await request('PATCH', URLs.UPDATE_REVIEW_AWARDS, data)
}

export async function updateStatementAwards(data) {
  return await request('PATCH', URLs.UPDATE_STATEMENT_AWARDS, data)   
}

export async function updateReviewDislikes(data) {
  return await request('PATCH', URLs.UPDATE_REVIEW_DISLIKES, data)  
}

export async function updateUserFragranceClassification(data) {
  return await request('PATCH', URLs.UPDATE_USER_FRAGRANCE_CLASSIFICATION, data)  
}

export async function removeFragranceFromCustomCollection(data) {
  return await request('PATCH', URLs.REMOVE_PERFUME_FROM_CUSTOM_COLLECTION, data)  
}

export async function addFragranceToCustomCollection(data) {
  return await request('PATCH', URLs.ADD_PERFUME_TO_CUSTOM_COLLECTION, data)  
}

export async function updateUserPerfumeStatement(data) {
  return await request('PATCH', URLs.UPDATE_USER_FRAGRANCE_STATEMENT, data)  
}

export async function postUserPerfumeReview(data) {
  return await request('POST', URLs.CREATE_USER_PERFUME_REVIEW, data)
}

export async function updateUserPerfumeReview(data) {
  return await request('PATCH', URLs.UPDATE_USER_PERFUME_REVIEW, data)  
}


export async function addSource(data) {
  return await request('POST', URLs.ADD_SOURCE, data)
}

export async function confirmSource(data) {
  return await request('POST', URLs.CONFIRM_SOURCE, data)
}

export async function removeSourceConfirmation(data) {
  return await request('DELETE', URLs.REMOVE_SOURCE_CONFIRMATION, data)
}

export async function getSource(data) {
  return await request('POST', URLs.GET_SOURCE, data)
}

export async function getSourcesCount(data) {
  return await request('POST', URLs.GET_SOURCE_COUNT, data)
}

export async function proposeDiscussion(data) {
  return await request('POST', URLs.PROPOSE_DISCUSSION, data)
}

export async function getPerfumes(data) {
  return await request('POST', URLs.GET_SEARCHED_PERFUMES, data)
}

export async function getFragranceProposal(data) {
  return await request('POST', URLs.GET_FRAGRANCE_PROPOSAL, data)
}

export async function getSearchedBrands(query) {
  return await request('GET', URLs.GET_SEARCHED_BRANDS + `?q=${query}`)
}

export async function getAllDatabaseFragranceCount() {
  return await request('GET', URLs.GET_ALL_DATABASE_FRAGRANCES)
}

export async function getAllDatabaseBrandsCount() {
  return await request('GET', URLs.GET_ALL_BRANDS)
}

export async function getRecentlyPostedFragrances() {
  return await request('GET', URLs.GET_RECENTLY_POSTED_FRAGRANCES)
}


export async function getSearchedPerfumers(query) {
  return await request('GET', URLs.GET_SEARCHED_PERFUMERS + `?q=${query}`)
}

export async function getSearchedBottleDesigners(query) {
  return await request('GET', URLs.GET_SEARCHED_BOTTLE_DESIGNERS + `?q=${query}`)
}

export async function getSearchedParentCompanies(query) {
  return await request('GET', URLs.GET_SEARCHED_PARENT_COMPANIES + `?q=${query}`)
}

export async function getSearchedFragranceCollections(query) {
  return await request('GET', URLs.GET_SEARCHED_FRAGRANCE_COLLECTIONS + `?q=${query}`)
}

export async function getPerfume (data) {
  return await request('POST', URLs.GET_PERFUME, data)
}

export async function getUserNotifications (data) {
  return await request('POST', URLs.GET_USER_NOTIFICATIONS, data)
}

// export async function getPerfumeWithName(data) {
//   return await request('POST', URLs.CHECK_EDITS_NAME, data)
// }
export async function confirmPerfume(data, url) {
  return await request('PUT', URLs.CONFIRM_PERFUME + '/' + url + '/', data) 
}

export async function changePFP(data) {
  return await request('PUT', URLs.CHANGE_PFP, data)  
}

export async function getPerfumeRatings(data){
  return await request('POST', URLs.GET_PERFUME_RATING, data)
}

export async function getUserPerfumeReview(data){
  return await request('POST', URLs.CHECK_USER_PERFUME_REVIEW, data)
}


export async function getUserProfile (data) {
  return await request('POST', URLs.USER_PROFILE, data)
}

export async function login (data) {
  return await request('POST', URLs.LOGIN, data)
}

export async function reauthenticate (data) {
  return await request('POST', URLs.REAUTHENTICATE, data)
}

export async function getPendingProposals(){
  return await request("GET", URLs.GET_PENDING_PROPOSALS)
}

export async function getParentCompany(data){
  return await request("GET", URLs.GET_PENDING_PROPOSALS, data)
}

export async function listPerfumes(){
  return await request("GET", URLs.LIST_PERFUMES)
}

export async function logout () {
  return await request('DELETE', URLs.SESSION)
}

export async function isResearchAuditor(data){
  return await request('POST', URLs.IS_RESEARCH_AUDITOR, data)
}

export async function isResearchManager(data){
  return await request('POST', URLs.IS_RESEARCH_MANAGER, data)
}

export async function signUp (data) {
  return await request('POST', URLs.SIGNUP, data)
}

export async function providerSignup (data) {
  return await request('POST', URLs.PROVIDER_SIGNUP, data)
}

export async function getProviderAccounts () {
  return await request('GET', URLs.PROVIDERS)
}

export async function disconnectProviderAccount (providerId, accountUid) {
  return await request('DELETE', URLs.PROVIDERS, { provider: providerId, account: accountUid })
}

export async function requestPasswordReset (email) {
  return await request('POST', URLs.REQUEST_PASSWORD_RESET, { email })
}

export async function requestLoginCode (email) {
  return await request('POST', URLs.REQUEST_LOGIN_CODE, { email })
}

export async function confirmLoginCode (code) {
  return await request('POST', URLs.CONFIRM_LOGIN_CODE, { code })
}

export async function getEmailVerification (key) {
  return await request('GET', URLs.VERIFY_EMAIL, undefined, { 'X-Email-Verification-Key': key })
}

export async function getEmailAddresses () {
  return await request('GET', URLs.EMAIL)
}
export async function getSessions () {
  return await request('GET', URLs.SESSIONS)
}

export async function endSessions (ids) {
  return await request('DELETE', URLs.SESSIONS, { sessions: ids })
}

export async function getAuthenticators () {
  return await request('GET', URLs.AUTHENTICATORS)
}

export async function getTOTPAuthenticator () {
  return await request('GET', URLs.TOTP_AUTHENTICATOR)
}

export async function mfaAuthenticate (code) {
  return await request('POST', URLs.MFA_AUTHENTICATE, { code })
}

export async function mfaReauthenticate (code) {
  return await request('POST', URLs.MFA_REAUTHENTICATE, { code })
}

export async function activateTOTPAuthenticator (code) {
  return await request('POST', URLs.TOTP_AUTHENTICATOR, { code })
}

export async function deactivateTOTPAuthenticator () {
  return await request('DELETE', URLs.TOTP_AUTHENTICATOR)
}

export async function getRecoveryCodes () {
  return await request('GET', URLs.RECOVERY_CODES)
}

export async function generateRecoveryCodes () {
  return await request('POST', URLs.RECOVERY_CODES)
}

export async function getConfig () {
  return await request('GET', URLs.CONFIG)
}

export async function addEmail (email) {
  return await request('POST', URLs.EMAIL, { email })
}

export async function deleteEmail (email) {
  return await request('DELETE', URLs.EMAIL, { email })
}

export async function markEmailAsPrimary (email) {
  return await request('PATCH', URLs.EMAIL, { email, primary: true })
}

export async function requestEmailVerification (email) {
  return await request('PUT', URLs.EMAIL, { email })
}

export async function verifyEmail (key) {
  return await request('POST', URLs.VERIFY_EMAIL, { key })
}

export async function getPasswordReset (key) {
  return await request('GET', URLs.RESET_PASSWORD, undefined, { 'X-Password-Reset-Key': key })
}

export async function resetPassword (data) {
  return await request('POST', URLs.RESET_PASSWORD, data)
}

export async function changePassword (data) {
  return await request('POST', URLs.CHANGE_PASSWORD, data)
}

export async function getAuth () {
  return await request('GET', URLs.SESSION)
}

export async function proposeProposalEdits (data) {
  // return await fetch(URLs.COMPOSE_RESEARCH)
  return await request('POST', URLs.PROPOSE_PROPOSAL_EDITS, data)
}

export async function addResearch (data) {
  // return await fetch(URLs.COMPOSE_RESEARCH)
  return await request('POST', URLs.COMPOSE_RESEARCH, data)
}

export async function authenticateByToken (providerId, token, process = AuthProcess.LOGIN) {
  return await request('POST', URLs.PROVIDER_TOKEN, {
    provider: providerId,
    token,
    process
  }
  )
}

export function redirectToProvider (providerId, callbackURL, process = AuthProcess.LOGIN) {
  postForm(URLs.REDIRECT_TO_PROVIDER, {
    provider: providerId,
    process,
    callback_url: callbackURL,
    csrfmiddlewaretoken: getCSRFToken()
  })
}

export async function getWebAuthnCreateOptions (passwordless) {
  let url = URLs.WEBAUTHN_AUTHENTICATOR
  if (passwordless) {
    url += '?passwordless'
  }
  return await request('GET', url)
}

export async function getWebAuthnCreateOptionsAtSignup () {
  return await request('GET', URLs.SIGNUP_WEBAUTHN)
}

export async function addWebAuthnCredential (name, credential) {
  return await request('POST', URLs.WEBAUTHN_AUTHENTICATOR, {
    name,
    credential
  })
}

export async function signupWebAuthnCredential (name, credential) {
  return await request('PUT', URLs.SIGNUP_WEBAUTHN, {
    name,
    credential
  })
}

export async function deleteWebAuthnCredential (ids) {
  return await request('DELETE', URLs.WEBAUTHN_AUTHENTICATOR, { authenticators: ids })
}

export async function updateWebAuthnCredential (id, data) {
  return await request('PUT', URLs.WEBAUTHN_AUTHENTICATOR, { id, ...data })
}

export async function getWebAuthnRequestOptionsForReauthentication () {
  return await request('GET', URLs.REAUTHENTICATE_WEBAUTHN)
}

export async function reauthenticateUsingWebAuthn (credential) {
  return await request('POST', URLs.REAUTHENTICATE_WEBAUTHN, { credential })
}

export async function authenticateUsingWebAuthn (credential) {
  return await request('POST', URLs.AUTHENTICATE_WEBAUTHN, { credential })
}

export async function loginUsingWebAuthn (credential) {
  return await request('POST', URLs.LOGIN_WEBAUTHN, { credential })
}

export async function getWebAuthnRequestOptionsForLogin () {
  return await request('GET', URLs.LOGIN_WEBAUTHN)
}

export async function getWebAuthnRequestOptionsForAuthentication () {
  return await request('GET', URLs.AUTHENTICATE_WEBAUTHN)
}

export function setup (client, baseUrl, withCredentials) {
  settings.client = client
  settings.baseUrl = baseUrl
  settings.withCredentials = withCredentials
}
