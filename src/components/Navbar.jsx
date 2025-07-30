import { Bell, Mail, Briefcase, Users, Home, Search } from "lucide-react";
import { BASE_URL } from "../utils/services";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/searchSlice";
import { removeUser } from "../redux/userSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.search.searchTerm);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", "", {
        withCredentials: true,
      });

      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" sticky top-0 z-50 ">
      <nav className="   bg-white  px-6 py-3 flex  justify-evenly items-center ">
        {/* Left: Logo + Search */}
        <div className="flex  items-center gap-4">
          <Link to="/" className="text-purple-600 font-bold text-xl">
            Connecting Media
          </Link>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-500 w-4 h-4" />
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Middle: Navigation Icons */}
        <div className="flex gap-8 text-sm text-gray-700">
          <div className="flex flex-col items-center cursor-pointer hover:text-purple-600">
            <Home size={20} />
            <Link to="/">Home</Link>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-purple-600">
            <Users size={20} />
            <span>My Network</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-purple-600">
            <Briefcase size={20} />
            <span>Jobs</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-purple-600">
            <Mail size={20} />
            <span>Messaging</span>
          </div>
          <div className="relative flex flex-col items-center cursor-pointer hover:text-purple-600">
            <Bell size={20} />
            <span>Notifications</span>
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
              0
            </span>
          </div>
        </div>

        {/* Right: Me + Business */}
        <div className="flex items-center gap-6 text-sm text-gray-700">
          <div className="flex flex-col items-center cursor-pointer hover:text-purple-600">
            <Link
              to="/profile"
              className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold uppercase"
            >
              {user?.profileURL}
            </Link>
            <Link>{user?.firstName}</Link>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-purple-600">
            <span className="font-semibold">For Business</span>
          </div>
          <div className="flex flex-col items-center cursor-pointer hover:text-purple-600">
            <span onClick={handleLogOut} className="font-semibold">
              Logout
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
