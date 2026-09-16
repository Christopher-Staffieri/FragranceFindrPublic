import { AuthContextProvider } from './auth'
import Router from './Router'
import {Flowbite } from "flowbite-react";


function App () {
  return (
    
      
        <AuthContextProvider>
          <Router />
          {/* <DarkThemeToggle/> */}
        </AuthContextProvider>
      
  )
}

export default App
