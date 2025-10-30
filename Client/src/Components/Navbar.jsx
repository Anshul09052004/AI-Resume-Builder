import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../App/Features/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logoutUser = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <header className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-zinc-700 sticky top-0 z-50 transition-all">
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-extrabold text-green-600 dark:text-green-400 cursor-pointer tracking-wide">
          Resume<span className="text-gray-900 dark:text-white">AI</span>
        </div>

        {/* Right side: User info + logout */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-medium whitespace-nowrap">
            Hi,&nbsp;
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {user?.name?.split(" ")[0] || "Guest"}
            </span>
          </p>

          <button
            onClick={logoutUser}
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
