import React, { ReactNode } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { RootState } from "../../store/Store"


/**
 * ProtectedRoute is a higher-order component that restricts access to its children
 * based on the user's authentication status.
 *
 * It uses Redux state to determine if the user is authenticated. If not authenticated,
 * the user is redirected to the root path ("/").
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - The child components to render if authenticated
 * @returns {React.ReactElement|null} The children if authenticated, otherwise a redirect
 *
 * @example
 * <ProtectedRoute>
 *   <Dashboard />
 * </ProtectedRoute>
 */


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