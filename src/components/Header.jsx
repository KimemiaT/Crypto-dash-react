import { useAuth } from "../context/authContext";

import { Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../firebase/auth";
import DarkModeToggle from "./DarkModeToggle";

const Header = ({ search, setSearch }) => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  return (
    <>
      {/* Main Header */}
      <header className="flex flex-col md:flex-row justify-between items-center p-6 shadow-md bg-white dark:bg-gray-800 rounded-b-xl">
        <h1 className="text-3xl font-bold mb-4 md:mb-0 text-gray-900 dark:text-white">
          Crypto Dashboard
        </h1>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search coin..."
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-60"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <DarkModeToggle />
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/login");
              });
            }}
            className="px-4 py-2 bg-blue-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
