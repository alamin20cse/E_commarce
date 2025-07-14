import { useContext } from "react";


import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useCart from "../Hooks/useCart";
// import useCart from "../../Hooks/useCart";




const FoodCard = ({ item }) => {
    const { name, image, price, product, id } = item;
    const {user}=useAuth()
    const navigate=useNavigate()
    const location=useLocation()
    const from =location.state?.from?.pathname || '/'

    const axiosSecure=useAxiosSecure()
    const [refetch,]=useCart();


    const hendelAddToCart=()=>{
        // console.log(food,user.email);
        if(user&& user.email)
        {
            // ToDo :Send cart ite to the database 
            // console.log(user.email,food);
           const cartItem = {
            menu_id: id,  // ✅ use snake_case to match Django model
            email: user.email,
            name,
            image,
            price,
};

            console.log(cartItem);




               axiosSecure.post('/api/cart/',cartItem)
            .then(res=>{
                console.log(res.data)
                if(res.status===201){
                    Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have add to cart",
                    showConfirmButton: false,
                    timer: 1500
                    });

                    refetch()

                }
            })



        }
        else
        {
            Swal.fire({
  title: "You are not logged",
  text: "Do you want to login",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Login it!"
}).then((result) => {
  if (result.isConfirmed) {

    navigate('/login',{state:{from:location}})
   

  }
});
        }
            
    }
 


    

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="absolute right-0 mr-4 mt-4 px-4 bg-slate-900 text-white">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{product}</p>
                <div className="card-actions justify-end">
                    <button
                    onClick={hendelAddToCart}
                     
                        className="btn btn-outline bg-slate-100 border-0 border-b-4 border-orange-400 mt-4"
                    >Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;