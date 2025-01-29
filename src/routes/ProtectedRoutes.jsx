import React,{useEffect , useState} from 'react'
import { isAuthenticatedUser } from '../apiEndPoints'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../components';

function AuthRouter({children}){
  const [authentication, setAuthentication] = useState(null)
  const navigate = useNavigate();
  useEffect(()=>{
    const getUser = async()=>{
      console.log("Inside the useEffect of authrouter");
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