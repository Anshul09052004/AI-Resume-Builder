import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = { name: "John Doe" };

  const logoutUser = () => {
    navigate("/");
  };

  return (
    <header className="w-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-md border-b border-gray-200 dark:border-zinc-700 sticky top-0 z-50 transition-all">
      <nav className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => navigate("/dashboard")}
          className="text-3xl font-extrabold text-green-600 dark:text-green-400 cursor-pointer tracking-wide hover:scale-105 transition-transform"
        >
          Resume<span className="text-gray-900 dark:text-white">AI</span>
        </div>

        {/* Right side: User info + logout */}
        <div className="flex items-center gap-6">
          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-medium">
            Hi,{" "}
            <span className="text-green-600 dark:text-green-400 font-semibold">
              {user.name}
            </span>
          </p>
          <button
            onClick={logoutUser}
            className="px-5 py-2.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
