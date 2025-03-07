import React from 'react';

function SearchFilter({ search, setSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search jobs..."
      className="w-full p-2 border rounded"
    />
  );
}

export default SearchFilter;