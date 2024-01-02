import { useQuery } from "@tanstack/react-query";
import { MdDelete } from "react-icons/md";
import { FaUsers } from "react-icons/fa"
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";


const Users = () => {
    const axiosSecure = useAxiosSecure()
    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });

    // make  a admin
    const handelMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${user.name} is now Admin`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            })

    }

    // user delete by admin

    const handelUserDelete = user => {
        axiosSecure.delete(`/users/${user._id}`)
            .then(() => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: `${user.name} is removed from database`,
                    showConfirmButton: false,
                    timer: 1500
                })
                refetch()
            })
    }

    return (
        <div>
            <div className="flex items-center justify-between m-4">
                <h5>All Users</h5>
                <h5>Total Users {users.length}</h5>
            </div>
            {/* user tabel */}
            <div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra md:w-[870px]">
                        {/* head */}
                        <thead className="bg-green text-white">
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                users.map((user, index) => (
                                    <tr key={index}>
                                        <th>{index + 1}</th>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user?.role === 'admin' ? 'Admin' : (
                                                    <button onClick={() => handelMakeAdmin(user)} className=" rounded btn-xs bg-indigo-500 text-white">
                                                        <FaUsers />
                                                    </button>
                                                )
                                            }
                                        </td>
                                        <td>
                                            <button onClick={() => handelUserDelete(user)} className=" rounded btn-xs bg-orange-500 text-white">
                                                <MdDelete />
                                            </button>
                                        </td>
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

export default Users;