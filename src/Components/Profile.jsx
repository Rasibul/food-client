import toast from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";


const Profile = ({ user }) => {
    // console.log(user)
    const { logOut } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logOut().then(() => {
            // console.log("Logout successful");
            toast.success("logOut Successfully")
            navigate('/')
        }).catch((error) => {
            // console.error("Logout failed", error);
        });
    }
    return (
        <div>
            <div className="drawer drawer-end z-50">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar">
                        {user ? (
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
                            </div>
                        ) : (
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                            </div>
                        )}
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <Link to="/update-profile">
                            <li>
                                <a>Profile</a>
                            </li>
                        </Link>
                        <li>
                            <a>Order</a>
                        </li>
                        <li>
                            <a>Setting</a>
                        </li>
                        <li>
                            <Link to='/dashboard'>Dashboard</Link>
                        </li>
                        <li>
                            <a onClick={handleLogout}>LogOut</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default Profile;