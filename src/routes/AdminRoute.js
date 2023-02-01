import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux' // เข้าภึง store
import { currentAdmin } from '../services/authAPI'
import LoadingToRedirect from './LoadingToRedirect'

const AdminRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    const [pass, setPass] = useState(false)

    useEffect(() => {
      if(user && user.token){
        currentAdmin(user.token)
        .then(res=>{
            // console.log(res)
            setPass(true)
        }).catch(error=>{
            console.log(error)
            setPass(false)
        })
      }
      return () => {
        
      }
    }, [user])
    

    return pass
    ? children
    : <LoadingToRedirect /> 
}

export default AdminRoute