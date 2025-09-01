import DarkModeToggle from "./DarkModeToggle";

const Header = () => (
  <header className="flex flex-col md:flex-row justify-between items-center py-6 px-4 bg-gray-100 dark:bg-gray-800">
    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Crypto Dashboard</h1>
    <DarkModeToggle />
  </header>
);

export default Header;
