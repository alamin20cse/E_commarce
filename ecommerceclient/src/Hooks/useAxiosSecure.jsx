import axios from "axios";


 const axiosSecure=axios.create({
    baseURL:'http://127.0.0.1:8000'
})
const useAxiosSecure = () => {
    return axiosSecure
   
};

export default useAxiosSecure;