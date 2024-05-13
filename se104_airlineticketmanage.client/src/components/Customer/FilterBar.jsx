import React from "react";

const FilterBar = ({ filterOptions, onTextFilterChange }) => {
  const handleChange = (event) => {
    onTextFilterChange(event.target.value);
  };

  return (
    <div className="home-flight-left-filters mb-4">
      {filterOptions.map((option, index) => (
        <div key={index} className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
          >
            {option.label}
          </button>
          <ul className="dropdown-menu">
            {option.values.map((value, idx) => (
              <li key={idx}>{value}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
