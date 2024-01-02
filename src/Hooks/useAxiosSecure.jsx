import axios from "axios"
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logOut } = useAuth()

    axiosSecure.interceptors.request.use(function (config) {
        // Do somethhing before request is sent
        const token = localStorage.getItem("access token")
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    })

    // add a responsive interceptor
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status
        if (status === 401 || status === 403) {
            await logOut()
            navigate('/signup')
        }
        return Promise.reject(error)
    })
    return axiosSecure
};

export default useAxiosSecure;