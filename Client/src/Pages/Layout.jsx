import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function Layout() {

  

    return (
        <div>
            <div>
                <Navbar />
                <Outlet />
            </div>
        </div>
    );
}
export default Layout;
