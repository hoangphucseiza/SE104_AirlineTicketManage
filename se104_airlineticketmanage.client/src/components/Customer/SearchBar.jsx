import React from "react";

const SearchBar = ({ text_search, onTextSearchChange }) => {
  const handleChange = (event) => {
    onTextSearchChange(event.target.value);
  };

  return (
    <div className="home-flights-left">
      <div className="home-flights-left-search mb-2">
        <i className="fa-solid fa-magnifying-glass me-2" />
        <input placeholder={text_search} onChange={handleChange} />
      </div>
    </div>
  );
};

export default SearchBar;
