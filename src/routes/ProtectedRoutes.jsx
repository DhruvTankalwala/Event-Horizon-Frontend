import React,{useEffect , useState} from 'react'
import { isAuthenticatedUser } from '../apiEndPoints'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components';
import { myAxios } from '../utils/user-service';
function AuthRouter({children}){
  const [authentication, setAuthentication] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    const getUser = async()=>{
      console.log("Inside the useEffect of authrouter");
      const token = localStorage.getItem("authToken");
          if(!token){
            navigate("/auth")      
          }
          myAxios.defaults.headers.common['authorization'] = token;
          console.log(token);
          const res = await isAuthenticatedUser();
          console.log(res.data);
      
      if(res.statusCode == 200){
          setAuthentication(true)
      }else{
        navigate('/auth');
      }
    }
    getUser();
  },[navigate])
  if(authentication == null){
    return <Loader /> 
  }
  return authentication? children : null;
}
export default AuthRouter