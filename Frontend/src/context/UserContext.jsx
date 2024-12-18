import React, { createContext, useState } from 'react'
export const UserDataContext = createContext()

const UserContext = ({children}) => {

    const [User, setUser] = useState({
        Email:"",
        FullName:{
            FirstName:"",
            LastName:""
        }
    })
  return (
    <div>
    <UserDataContext.Provider value={{User, setUser}}>
      {children}
    </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
