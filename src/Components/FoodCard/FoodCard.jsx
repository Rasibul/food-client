import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";


const FoodCard = ({ item }) => {
    const {name,recipe,image,price,_id} = item
    const [isHeartFiled, setIsHeartFilled] = useState(false)
    const {user} = useAuth()
    const handelHeartClick = () => {
        setIsHeartFilled(!isHeartFiled)
    }

    const handelAddToCArt = async (item) =>{
        // console.log(item)
        if(user && user?.email){
            const cartItem = {
                menuItemId:_id,
                price,image,recipe,name,
                email:user.email
            }
            // console.log(cartItem);

            const allCart = await axios.post('http://localhost:5000/carts',cartItem)
            // console.log(allCart)
            if(allCart.data.insertedId){
                Swal.fire({
                    title: `${name} Added Successfully`,
                    text: "You clicked the button!",
                    icon: "success"
                  });
            }
        }
    }

    return (
        <div className="card md:w-96 bg-base-100 shadow-xl relative">
            <div onClick={handelHeartClick} className={`rating gap-1 absolute right-2 top-2 p-4 bg-green heartStar ${isHeartFiled ? "text-rose-500" : "text-white"}`}>
                <FaHeart className="h-5 w-5 cursor-pointer"></FaHeart>
            </div>
            <Link to={`/menu/${item._id}`}>
                <figure>
                    <img
                        src={item?.image}
                        alt="food img"
                        className="hover:scale-105 transition-all duration-200  md:h-72"
                    />
                </figure>
            </Link>
            <div className="card-body p-4">
                <h2 className="card-title text-lg md:text-xl">{item?.name}</h2>
                <p className="hidden md:block">{item?.recipe}</p>
                <div className="card-actions flex justify-between items-center mt-2">
                    <h5 className="font-semibold">Price: <span className="text-sm text-red">$</span>{item.price}</h5>
                    <button onClick={()=>handelAddToCArt(item)} className="btn bg-green text-white">Add To Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;