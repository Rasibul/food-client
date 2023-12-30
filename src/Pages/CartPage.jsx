import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
import { FaTrash } from "react-icons/fa";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";


const CartPage = () => {
    const [cart, refetch] = useCart()
    const { user } = useAuth()
    const [cartItems, setCartItems] = useState()


    // calculate prtice

    const calculatePrice = (item) => {
        return item.price * item.quinty
    }



    // increase item
    useEffect(() => {
        setCartItems(cart);
    }, [cart]);

    const handleIncrease = async (item) => {
        try {
            const response = await fetch(`http://localhost:5000/carts/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quinty: item.quinty + 1 }),
            });

            if (response.ok) {
                const updatedCart = cartItems.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            quinty: cartItem.quinty + 1,
                        };
                    }
                    return cartItem;
                });
                refetch();
                setCartItems(updatedCart);
            } else {
                console.error("Failed to update quantity");
            }
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    // dicrease item

    const handleDecrease = async (item) => {
        if (item.quinty > 1) {
            try {
                const response = await fetch(
                    `http://localhost:5000/carts/${item._id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ quinty: item.quinty - 1 }),
                    }
                );

                if (response.ok) {
                    const updatedCart = cartItems.map((cartItem) => {
                        if (cartItem.id === item.id) {
                            return {
                                ...cartItem,
                                quinty: cartItem.quinty - 1,
                            };
                        }
                        return cartItem;
                    });
                    await refetch();
                    setCartItems(updatedCart);
                } else {
                    console.error("Failed to update quantity");
                }
            } catch (error) {
                console.error("Error updating quantity:", error);
            }
        }
    };

    // calculate total price 

    const cartSubTotal = cart.reduce((total, item) => {
        return total + calculatePrice(item)
    }, 0)

    const orderTotal = cartSubTotal


    // const handelDelete = (item) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             fetch(`http://localhost:5000/carts/${item._id}`, {
    //                 method: 'DELETE'
    //             })
    //                 .then(res => res.json())
    //                 .then(data => {
    //                     if (data.deletedCount > 0) {
    //                         Swal.fire(
    //                             'Deleted!',
    //                             'Your Product has been deleted.',
    //                             'success',

    //                         )
    //                         refetch()
    //                     }
    //                 })

    //         }
    //     })

    // }
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:5000/carts/${item._id}`).then(response => {
                    if (response) {
                        refetch();
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    }
                })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    };
    return (
        <div className="section-container">
            <div className="xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
                <div className="py-28 flex items-center justify-center">
                    {/* texts */}
                    <div className="px-8 text-center"> {/* Added text-center class */}
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Items Added To The <span className="text-green">Cart</span>
                        </h2>
                    </div>
                </div>
            </div>
            {/* tabel cart */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-green text-white">
                            <tr>
                                <th>#</th>
                                <th>Food</th>
                                <th>Item Name</th>
                                <th>Quinty</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item?.image} alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item?.name}
                                        </td>
                                        <td>
                                            <button onClick={() => handleDecrease(item)} className="btn btn-xs">-</button>
                                            <input type="number" value={item?.quinty} className="w-10  overflow-hidden text-center" onChange={() => console.log(item?.quinty)} />
                                            <button onClick={() => handleIncrease(item)} className="btn btn-xs">+</button>
                                        </td>
                                        <td>${calculatePrice(item).toFixed(2)}</td>
                                        <th>
                                            <button onClick={() => handleDelete(item)} className="btn btn-ghost text-red btn-xs"><FaTrash></FaTrash></button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            {/* customer details section */}
            <div className="my-12 flex flex-col md:flex-row justify-center items-start">
                <div className="md:w-1/2 space-y-3">
                    <h3 className="font-bold">Customer Details</h3>
                    <p>Name: {user?.displayName}</p>
                    <p>Email: {user?.email}</p>
                    <p>User Id: {user?.uid}</p>
                </div>
                <div className="md:w-1/2 space-y-3">
                    <h3 className="font-bold">Food Details</h3>
                    <p>Total Items: {cart?.length}</p>
                    <p>Total Price: ${orderTotal.toFixed(2)}</p>
                    <Link>
                        <button className="btn bg-green text-white mt-4">
                            Procceed Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>


    );
};

export default CartPage;