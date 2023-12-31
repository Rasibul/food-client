import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaEdit, FaUsers } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import logo from '/logo.png'


const DashBordLayOut = () => {
    return (
        <div>
            <div className="drawer sm:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
                    <div className="flex items-center justify-between mx-4">
                        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                            <MdDashboard />
                        </label>
                        <button className="btn px-6 rounded-full bg-green text-white sm:hidden">Log Out</button>
                    </div>
                    <Outlet />
                </div>

                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li>
                            <Link to='/dashbord' className="flex justify-start mb-3">
                                <img src={logo} className="w-20" />
                                <span className="badge badge-primary">Admin</span>
                            </Link>
                        </li>
                        <hr></hr>
                        <li className="mb-3">
                            <Link to='/dashbord'> <MdDashboard /> DashBoard</Link>
                        </li>
                        <li>
                            <Link to='/dashbord'> <CiShoppingCart /> Mange Booking</Link>
                        </li>
                        <li>
                            <Link to='/dashbord'> <IoIosAddCircleOutline /> Add Item</Link>
                        </li>
                        <li>
                            <Link to='/dashbord'> <FaEdit /> Menu Items</Link>
                        </li>
                        <li>
                            <Link to='/dashbord/users'> <FaUsers /> All User</Link>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBordLayOut;