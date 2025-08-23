import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StatusView from './component/StatusView'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import LandingPage from './component/LandingPage'
function App() {

  return (
    <>
      {/* <StatusView /> */}
       <BrowserRouter>         
          <Routes>
             <Route path='/' element={<LandingPage/>} />
              
          </Routes>
       </BrowserRouter>

    </>
  )
}

export default App
