import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import api from "../Config/Api";
import { useDispatch } from "react-redux";
import { login } from "../App/Features/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const query = new URLSearchParams(window.location.search);
  const urlState = query.get("state");
  const [state, setState] = React.useState(urlState || "login");
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await api.post(`/api/v1/user/${state}`, data);
      const responseData = response.data;

      dispatch(login({ token: responseData.token, user: responseData.user }));
      localStorage.setItem("token", responseData.token);
      toast.success(responseData.message);
      navigate("/app");
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[380px] text-center border border-zinc-300/60 dark:border-zinc-700 rounded-2xl px-8 py-10 bg-white dark:bg-zinc-900 shadow-xl dark:shadow-black/40 transition-all duration-300"
      >
        <h1 className="text-zinc-900 dark:text-white text-3xl font-semibold mb-2">
          {state === "login" ? "Login" : "Register"}
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          Please {state === "login" ? "sign in" : "sign up"} to continue
        </p>

        {state !== "login" && (
          <div className="flex items-center w-full mt-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-4 pr-2 gap-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <FaRegUser className="text-white text-sm" />
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
              name="name"
              value={data.name}
              onChange={onChangeHandler}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-4 pr-2 gap-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <MdOutlineMail className="text-white text-lg" />
          <input
            type="email"
            placeholder="Email id"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="flex items-center mt-4 w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700 h-12 rounded-full overflow-hidden pl-4 pr-2 gap-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
          <IoLockClosedOutline className="text-white text-lg" />
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-zinc-600 dark:text-zinc-200 placeholder-zinc-500 dark:placeholder-zinc-400 outline-none text-sm w-full h-full"
            name="password"
            value={data.password}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mt-5 text-left">
          <a
            className="text-sm text-indigo-500 dark:text-indigo-400 hover:underline transition-colors"
            href="#"
          >
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          className="mt-4 w-full h-12 rounded-full text-white bg-green-600 hover:bg-green-500 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          {state === "login" ? "Login" : "Create Account"}
        </button>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-4">
          {state === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <button
            type="button"
            className="text-indigo-500 dark:text-indigo-400 font-medium hover:underline transition-colors"
            onClick={() =>
              setState((prev) => (prev === "login" ? "register" : "login"))
            }
          >
            {state === "login" ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
