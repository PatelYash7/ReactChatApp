import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setcurrentUser] = useState({});
    useEffect(() => {
        const unSub=onAuthStateChanged(auth, (user) => {
            setcurrentUser(user)
        })
        return ()=>{
            unSub(); 
        }
    }, [])

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )
}