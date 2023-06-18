import axios from "axios";


export default async () => {
    const data = await axios.get(`${process.env.VUE_APP_DB_HOST_URL}/api/authenticate/auth`, {withCredentials: true})
    return {
        allowed: data.data,
        message: { 
            status: 'error', 
            message: 'Please login to access this page', 
        }
    }
}