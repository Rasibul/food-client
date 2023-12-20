import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar/NavBar";
import "../App.css"
import Footer from "../Pages/Home/Footer";
import { Toaster } from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "../Components/LoadingSpinner";


const MainLayOut = () => {
    const { loading } = useAuth()

    return (
        <div>
            {
                loading ? <LoadingSpinner/> :
                    <>
                        <NavBar></NavBar>
                        <div className="min-h-screen">
                            <Outlet></Outlet>
                        </div>
                        <Footer></Footer>
                        <Toaster
                            position="bottom-left"
                            reverseOrder={false}
                        />
                    </>
            }
        </div>
    );
};

export default MainLayOut;