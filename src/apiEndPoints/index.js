import { myAxios } from "../utils/user-service";
export const loginApi = async(values)=>{
    try {
        console.log("loginApi:",values);
        const res = await myAxios.post('/login',values);
        const token = res.headers['authorization'];
        if(res.data.statusCode==200 && token){
            localStorage.setItem("authToken",token)
            console.log(token);            
            myAxios.defaults.headers.common['authorization'] = token;
        }
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const signUpApi = async(values)=>{
    try {
        console.log("SignupApi:",values);
        const res = await myAxios.post('/register',values);
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export const verifyEmailApi = async(token)=>{
        try {
            console.log("in verify email api : ", typeof token);
            const res = await myAxios.post(`/verify`,{otp:token});
            if(res.data.statusCode==200 && token){
                localStorage.setItem("authToken",token)
                myAxios.defaults.headers.common['authorization'] = token;
            }
            console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return error.response.data
        }
}

export const resendEmail = async()=>{
    try {
        const res = await myAxios.post('/resend-email',{email:JSON.parse(localStorage.getItem("userEmail"))})
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const getAllClubs =  async()=>{
    try {
        const res = await myAxios.get('/clubs');
        console.log(res);
        return res.data
    } catch (error) {
        return error.response.data
    }
}

export const getAllEvents =  async()=>{
    try {
        const res = await myAxios.get('/events');
        console.log(res);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const isAuthenticatedUser = async()=>{
    try {
        const res = await myAxios.get('/isAuthenticated');
        console.log(res);
        return res.data;
        
    } catch (error) {
        return error.response.data;
    }
}

export const registerForEvent = async(eventId,values)=>{
    try {
        const res =  await myAxios.post(`/events/registrations/${parseInt(eventId)}`,values);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}
export const getClubDetailsApi = async(clubId)=>{
    try {
        const res = await myAxios.get(`/clubs/${clubId}`);
        return res.data
    } catch (error) {
        return error.response.data;
    }
}