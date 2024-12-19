import { createContext, useContext, useState } from "react"

export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [Captain, setCaptain] = useState(null)
    const [isLoading, setIsLoading] = useState([])
    const [error, setError] = useState(null)

    const UpdateCaptain = (CaptainData) =>{
        setCaptain(CaptainData)
    }

    const value = {Captain, setCaptain, isLoading, setIsLoading, error, setError, UpdateCaptain}
  return (
    <div>
      <CaptainDataContext.Provider value={value}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext
