import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import './index.css'
import UserContext from './context/UserContext.jsx'
import CaptainContext from './context/CaptainContext.jsx'
import SocketContext from './context/SocketContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CaptainContext>
    <UserContext>
      <SocketContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </SocketContext>
    </UserContext>
    </CaptainContext>
  </React.StrictMode>,
)
