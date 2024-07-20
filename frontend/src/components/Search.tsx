'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

// const Search({ placeholder }: { placeholder: string }) {
  function handleSearch(term: string) {
    console.log(term);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
            className="primary-search peer block border w-3/5 border-gray-200 text-sm outline-2 placeholder:text-gray-500"
            placeholder={"Search players"}
            value={query}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
        />
        {/*<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-full text-gray-500 peer-focus:text-gray-900" />*/}
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search