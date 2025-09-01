const SearchBar = ({ searchQuery, setSearchQuery }) => (
  <div className="my-4 px-4">
    <input
      type="text"
      placeholder="Search cryptocurrency..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none"
    />
  </div>
);

export default SearchBar;
