import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContex } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";




// Only logged-in users will see data
const useUser = () => {
    const { user, loading: authLoading,  } = useContext(AuthContex);
     const axiosSecure = useAxiosSecure()

    const { refetch, data: users = [], isLoading: queryLoading } = useQuery({
        queryKey: ['user', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; // Avoid querying if email is not available

            // Fixed template literal syntax
            const res = await axiosSecure.get(`/api/user?email=${user.email}`);
            return res.data;
        },
        enabled: !authLoading && !!user?.email, // Ensure AuthContext is loaded before querying
    });

    const loading = authLoading || queryLoading;
    return [users, loading, refetch];
};

export default useUser;