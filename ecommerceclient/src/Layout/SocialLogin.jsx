import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";


import { useNavigate } from "react-router-dom";
import { AuthContex } from "../AuthProvider/AuthProvider";



const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContex)
    // const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
        .then(result =>{
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            // axiosPublic.post('/api/users/', userInfo)
            // .then(res =>{
            //     console.log(res.data);
                
            // })
            console.log(userInfo);

           
        })
         navigate('/');
    }

    return (
        <div className="p-8">
            <div className="divider"></div>
            <div>
                <button onClick={handleGoogleSignIn} className="btn">
                    <FaGoogle className="mr-2"></FaGoogle>
                    Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;