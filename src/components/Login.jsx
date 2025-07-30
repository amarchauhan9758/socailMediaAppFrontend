import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/services";
import loader from "../utils/loader";
import { Link, useNavigate } from "react-router-dom";
import ApiErrorMessage from "../utils/ApiErrorMessage";
import Loader from "../utils/loader";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openLoader, setOpenLoader] = useState(false);
  const [email, setEmail] = useState("testuser@gmail.com");
  const [password, setPassword] = useState("testUser@123#");

  const handleLogin = async () => {
    try {
      setOpenLoader(true);
      const response = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response);
      setOpenLoader(false);
      navigate("/post");
      dispatch(addUser(response?.data?.data));
    } catch (error) {
      console.log(error.message);
      setOpenLoader(false);
    }
  };

  return (
    <div className="">
      <div className="min-h-screen flex flex-col md:flex-row ">
        {/* Right side - Login Form */}
        <div className=" w-full flex items-center justify-center bg-gray-100 p-8">
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
              Welcome Back
            </h2>

            <div>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                disabled={openLoader}
                onClick={handleLogin}
                className={`w-full py-2 rounded-lg transition duration-300 ${
                  openLoader
                    ? "bg-purple-500  cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                }`}
              >
                {" "}
                {openLoader ? "Signing In..." : "Sign In"}
              </button>

              <p className="text-center text-sm text-gray-500 mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <Loader openLoader={openLoader} /> */}
      {/* <ApiErrorMessage
        setOpenApiModel={setOpenApiModel}
        openApiModel={openApiModel}
        errorMessage={errorMessage}
      /> */}
    </div>
  );
}

export default Login;
