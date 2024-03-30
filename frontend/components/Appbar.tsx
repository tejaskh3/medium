import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/blogvista.png";

export const Appbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");

    // Redirect to the login page
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-300 border-slate-500 relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a
          href="/blogs"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={image} className="w-26 h-14 rounded-md" alt="" />
        </a>

        <div className="flex ">
          <div className="pr-5">
            <Link
              to="/blog/publish"
              className="bg-green-700 hover:bg-green-800 text-white font-medium rounded-md text-lg px-4 py-3 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Publish
            </Link>
          </div>
          <div className="relative">
            <img
              onClick={toggleDropdown}
              className="w-10 h-9 rounded-full border-2 border-slate-800 cursor-pointer"
              src="https://miro.medium.com/v2/resize:fill:270:181/1*P85gowan0ZBnI1RgfPgeiw.png"
              alt="user photo"
            />

            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div
                className="z-10 absolute top-full  left-1 bg-white divide-y divide-gray-100 rounded-lg shadow w-22 dark:bg-gray-700"
                onClick={closeDropdown}
              >
                <ul className="py-1 text-md text-gray-500 dark:text-gray-200">
                  {/* <li>
                    <Link
                      to="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Profile
                    </Link>
                  </li> */}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
