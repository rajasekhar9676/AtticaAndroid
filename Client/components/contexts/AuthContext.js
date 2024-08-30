import React,{createContext,useContext,useState,useEffect, Children} from "react";
import { getAuth,onAuthStateChanged } from "firebase/auth";

import {auth} from '../../firebaseConfig'
const AuthContext=createContext()

export const AuthProvider=({children})=>{
   const [isAuthenticated,setisAuthenticated]=useState(false)
   useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
        setisAuthenticated(!!user)
    })
    return () => unsubscribe()
   },[])

   return(
    <AuthContext.Provider value={{isAuthenticated}}>
        {children}
    </AuthContext.Provider>
   )
}

export const useAuth=() => useContext(AuthContext) 