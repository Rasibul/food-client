import { Outlet } from "react-router-dom";
import NavBar from "../Components/Shared/NavBar/NavBar";


const MainLayOut = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <h2>Footer</h2>
        </div>
    );
};

export default MainLayOut;