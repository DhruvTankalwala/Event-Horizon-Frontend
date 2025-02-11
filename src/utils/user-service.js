import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = 'http://localhost:8080/api/v1'
export const myAxios = axios.create({
    baseURL : BASE_URL,
    withCredentials: true
})

/*
1️⃣ What is axios.interceptors?

    In Axios, .interceptors is an object that holds middleware functions that intercept requests and responses before they reach the .then() or .catch() handlers.

    It has two properties:

    axios.interceptors.request → Intercepts outgoing requests.
    axios.interceptors.response → Intercepts incoming responses.

2️⃣ What is axios.interceptors.response?
        axios.interceptors.response is an object that manages the response interception process. It contains methods like:

        .use() → Adds an interceptor.
        .eject() → Removes an interceptor.

3️⃣ What is .use()?
    .use() is a method of axios.interceptors.response. 
    It registers an interceptor (a function) that modifies or handles responses before they reach the caller.

    ✅ .use(onFulfilled, onRejected)
    .use() takes two callback functions:

    onFulfilled(response): Runs when a request succeeds (2xx status).
    onRejected(error): Runs when a request fails (4xx, 5xx status).



 */


myAxios.interceptors.response.use(
    (response)=>response,
    (error)=>{
        console.log(error);
        
        const {status , message} = error.response?.data
        console.log("Interceptor");
        console.log(status);
        console.log(message);
        
        if (status === 400 && message.trim() === "Your role has been upgraded.Please log in again."){
            toast.error(message)
            console.log(message);
            
            console.log("Inceptor:",message)
            localStorage.removeItem("authToken")
            delete myAxios.defaults.headers.common["Authorization"];
            console.log("Token removed");
            console.log(localStorage.getItem("authToken"));
            
        }
        return Promise.reject(error);
    }
)