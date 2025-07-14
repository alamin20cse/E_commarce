import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';


const useCart = () => {

    const axiosSecure=useAxiosSecure();
    const {user}=useAuth();


    // transtack query

    const {refetch,data:cart=[]}=useQuery({

        // it shold be uniqe 
        queryKey:['cart',user?.email],
        queryFn: async()=>{

            const res=await axiosSecure.get(`/api/cart?email=${user.email}`);
            return res.data

        }


    })

    return [refetch,cart]
   


};

export default useCart;