
import './App.css'
import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import LandingPage from './component/LandingPage'
import Chat from './component/Chat'
import { useEffect } from 'react';
function App() {

  
  return (
    <>
      {/* <StatusView /> */}
       <BrowserRouter>         
          <Routes>
             <Route path='/' element={<LandingPage/>} />
             <Route path='/Chat' element={<Chat />} />
          </Routes>
       </BrowserRouter>

    </>
  )
}

export default App
