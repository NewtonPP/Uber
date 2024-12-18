import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import CaptainLogin from './pages/CaptainLogin'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import UserHome from './pages/UserHome'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='user/login' element={<UserLogin/>}/>
      <Route path='user/signup' element={<UserSignup/>}/>
      <Route path='captain/login' element={<CaptainLogin/>}/>
      <Route path='captain/signup' element={<CaptainSignup/>}/>
      <Route path='/home' element= {
        <UserProtectedWrapper>
        <UserHome/>
        </UserProtectedWrapper>}/>
      
      <Route path='/user/logout' element={<UserProtectedWrapper><UserLogout/></UserProtectedWrapper>}/>
    </Routes>
    </>
  )
}

export default App
