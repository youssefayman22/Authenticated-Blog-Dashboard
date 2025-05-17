import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "../../store/Store"

interface protectedRoutesProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<protectedRoutesProps> =({children})=>{
    const isAuthenticated=useSelector((state: RootState)=>state.auth.isAuthenticated)
    if(!isAuthenticated){
        return <Navigate to='/' replace/>
    }
    return children

}
export default ProtectedRoute