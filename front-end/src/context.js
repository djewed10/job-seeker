import React, { createContext, useState } from "react";
export const Context = createContext(null);
export default function ConstextProvider({children}){
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState({});
    return (
        <Context.Provider
          value={{
            isAuthorized,
            setIsAuthorized,
            user,
            setUser,
          }}
        >
          {children}
        </Context.Provider>
      );
  
}