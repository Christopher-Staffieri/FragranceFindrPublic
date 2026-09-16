import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import { Flowbite, CustomFlowbiteTheme } from "flowbite-react";
import GoogleOneTap from './socialaccount/GoogleOneTap';
import Footer from './Footer';




export default function Root () {

  return (
    
  
    // flex min-h-screen items-center justify-center flex-column dark:bg-gray-800
    // <Flowbite theme={{ theme: customTheme }}>
      <main >
        
            <NavBar />
          
        
            {/* <div className='alert alert-danger d-flex justify-content-between'>
              <GoogleOneTap/>
            </div> */}
          <div>
          {/* <GoogleOneTap/> */}
            <Outlet />
          </div>
          
        <Footer/>
          {/* Footer goes here */}
          
      </main>
    // </Flowbite>
    
  )
}


