import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
 
function RoleRoute({children, allowedRole}) {
    const user= useSelector((state) => state.auth.user);

    if(!user || user.role !== allowedRole){
        return <Navigate to='/'/>;
    }

    return children;

}
 export default RoleRoute;