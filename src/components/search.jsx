import React from "react";

const Search = ({search, setSearch,handleClick}) => {
  return (
    <div className="search-engine">
      <input
        type="text"
        className="search-bar"
        placeholder="Enter city name"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      <button className="button"
              onClick={handleClick}      
      >
      Search
      </button>
    </div>
  );
};

export default Search;
