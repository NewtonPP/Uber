import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptainLogin from './pages/CaptainLogin'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='user/login' element={<UserLogin/>}/>
      <Route path='user/signup' element={<UserSignup/>}/>
      <Route path='user/riding' element={<Riding/>}/>
      <Route path='captain/login' element={<CaptainLogin/>}/>
      <Route path='captain/signup' element={<CaptainSignup/>}/>
      <Route path='/userhome' element= {
        <UserProtectedWrapper>
        <UserHome/>
        </UserProtectedWrapper>}/>
      
      <Route path='/user/logout' element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}/>

      <Route path='/captainhome' element = {
        <CaptainProtectedWrapper>
        <CaptainHome/>
        </CaptainProtectedWrapper>
      }/>

      <Route path='/captain/route' element={<CaptainRiding/>}>

      </Route>
    </Routes>

    </>
  )
}

export default App
