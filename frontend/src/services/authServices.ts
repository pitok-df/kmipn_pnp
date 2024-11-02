import axios from "axios"

export const getUserLogin = async () => {
    try {
        const user = await axios.get('/api/v1/user-login', { withCredentials: true });
        return user.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}