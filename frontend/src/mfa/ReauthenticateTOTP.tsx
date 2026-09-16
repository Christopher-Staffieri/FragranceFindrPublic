import ReauthenticateCode from './ReauthenticateCode'

export default function ReauthenticateTOTP (props) {
  return (
    <ReauthenticateCode pageMethod={"mfa_reauthenticate:totp"}>
      <p>Please enter an authenticator code:</p>
    </ReauthenticateCode>
  )
}