import React from 'react'
import { useSelector } from 'react-redux' // เข้าภึง store
import LoadingToRedirect from './LoadingToRedirect'

const UserRoute = ({ children }) => {
    const { user } = useSelector((state) => ({ ...state }))
    return user && user.token 
    ? children
    : <LoadingToRedirect /> 
}

export default UserRoute