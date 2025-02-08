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

export const getAllPolls= async ()=>{

}

export const getAllRegistrations = async()=>{
    try {
        const res = await myAxios.get(`/clubs/${clubId}`);
        return res.data
    } catch (error) {
        return error.response.data;
    }
}

export const getEventDetailsApi = async(id)=>{
    try {
        const res = await myAxios.get(`/events/${id}`)
        console.log(res.data);
        return res.data ;

    } catch (error) {
        return error.response.data;
    }
}

export const eventRegistrationsApi = async()=>{
    try {
        const res = await myAxios.get(`/clubs/pending-registrations`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const acceptEventRegistrationsApi = async(registrationId)=>{
    try {
        const res = await myAxios.get(`/events/registrations/${registrationId}/approve`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const rejectEventRegistrationsApi = async(registrationId)=>{
    try {
        const res = await myAxios.get(`/events/registrations/${registrationId}/reject`)
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const createEvent = async(values)=>{
    try {
        const res = await myAxios.post(`/events` , values);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const deleteEventApi = async(eventId)=>{
    try {
        const res = await myAxios.delete(`/events/${eventId}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const updateEventApi = async(event)=>{
    try {
        const res = await myAxios.patch(`/events` ,event);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const registerClubApi = async(values)=>{
    try {
        const res = await myAxios.post("/clubs/register",values);
        return res.data;
    } catch (error) {
        return error.response.data
    }
}


export const getAllClubsRegistrationsApi = async()=>{
    try {
        const res = await myAxios.get(`/admin/club-request`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const acceptClubRegistrationApi = async(id)=>{
    try {
        const res = await myAxios.get(`/admin/club-request/${id}/approve`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}

export const rejectClubRegistrationApi = async(id)=>{
    try {
        const res = await myAxios.get(`/admin/club-request/${id}/reject`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
}