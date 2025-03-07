    import  { useEffect } from 'react'
    import { useNavigate } from 'react-router-dom'
    import { myAxios } from '../../utils/user-service'
    const LogoutComponent = () => {
        const navigate = useNavigate()
        useEffect(()=>{
          navigate("/auth")
          localStorage.removeItem("authToken")
          localStorage.removeItem("email")
          localStorage.removeItem("userRole")
          localStorage.removeItem("userId")
          delete myAxios.defaults.headers.common["authorization"];
        },[])
    }

    export default LogoutComponent;
