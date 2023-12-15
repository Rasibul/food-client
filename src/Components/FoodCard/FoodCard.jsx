import { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";


const FoodCard = ({ item }) => {
    const [isHeartFiled, setIsHeartFilled] = useState(false)
    const handelHeartClick = () => {
        setIsHeartFilled(!isHeartFiled)
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
                    <button className="btn bg-green text-white">Buy Now</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;