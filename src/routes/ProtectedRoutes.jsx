import React,{useEffect , useState} from 'react'
import { Outlet } from 'react-router-dom';
import { isAuthenticatedUser , authorizeAndAuthenticateApi } from '../apiEndPoints'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components';
import LogoutComponent from '../components/Logout/LogoutComponent';
function ProtectedRoutes({children , userTypeAccepted}){
  const [authentication, setAuthentication] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const navigate = useNavigate();
  useEffect(()=>{
    console.log(token);
    
    const getUser = async()=>{
      console.log("Inside the useEffect of authrouter");
        if(!token){
            navigate("/auth")
          }
          console.log("Protected Routes",token);
          const res = await authorizeAndAuthenticateApi(userTypeAccepted);
          console.log(res);
      if(res.statusCode == 200){
          setAuthentication(true)
      }else{
        console.log("Authorization error");
        setAuthentication(false)
        }
    }
    getUser();
  },[])
  if(authentication == null){
    return <Loader /> 
  }
   
  return authentication? <Outlet /> : <LogoutComponent />;
}
export default ProtectedRoutes