import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function OnlyAdminPrivateRoute() {
    let {currentUser} = useSelector((state) => state.user)
    return currentUser && currentUser.isAdmin ? <Outlet/> : <Navigate to={'/sign-in'}/>
}