import { useLoaderData } from "react-router-dom";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import MFAOverview from "../mfa/MFAOverview";
import RecoveryCodes from "../mfa/RecoveryCodes";
import * as allauth from '../lib/allauth'
import Sessions from "../usersessions/Sessions";
import { useEffect, useState } from "react";

export async function loader ({ params }) {
    const recoveryCodeResp = await allauth.getRecoveryCodes()
    const authenticatorsResp = await allauth.getAuthenticators()
    console.log(authenticatorsResp)
    console.log(recoveryCodeResp)
    
    // const totpResp = await allauth.getTOTPAuthenticator()
    // console.log(resp)
    return { recoveryCodes: recoveryCodeResp,  authenticators: authenticatorsResp.data}
  }





export default function AccountSecurity(){
    const [authenticators, setAuthenticators] = useState(null)
    const [recoveryCodes, setRecoveryCodes]  = useState(null)

    const getData = async () => {
        const authenticatorsResp = await allauth.getAuthenticators()
        const recoveryCodeResp = await allauth.getRecoveryCodes()
        setAuthenticators(authenticatorsResp.data)
        setRecoveryCodes(recoveryCodeResp.data)
    }
    
    // const { authenticators } = useLoaderData()
    useEffect(() => {
        getData()
    }, [])
    // const { totp } = useLoaderData()
    return (
        
        // <NavbarSidebarLayout>
            <>
                
                <h1 className="text-xl font-bold leading-tight tracking-tight text-text dark:text-textDark md:text-2xl">Account Security</h1>
                {/* <h2>{authenticators} </h2> */}
                {/* <MFAOverview/> */}
                {authenticators !== null && (
                    <MFAOverview authenticators={authenticators}/>
                )}
                
                {/* <RecoveryCodes codes={recoveryCodes}/> */}
                <Sessions/>
            </>
        // </NavbarSidebarLayout>
    )
}