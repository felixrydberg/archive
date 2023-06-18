import axios from "axios";

export default async () => {
    const data = await axios.get(`${process.env.VUE_APP_DB_HOST_URL}/api/authenticate/notAuth`, {withCredentials: true})
    return {
        allowed: data.data,
        message: { 
            status: 'error', 
            message: 'You are already authenticated', 
        }
    }
}