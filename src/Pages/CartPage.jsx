import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
import { FaTrash } from "react-icons/fa";


const CartPage = () => {
    const [cart, refetch] = useCart()

    const handelDelete = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Product has been deleted.',
                                'success',

                            )
                            refetch()
                        }
                    })

            }
        })

    }
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
                                        <td>{item?.quinty}</td>
                                        <td>{item?.price}</td>
                                        <th>
                                            <button onClick={() => handelDelete(item)} className="btn btn-ghost text-red btn-xs"><FaTrash></FaTrash></button>
                                        </th>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );
};

export default CartPage;