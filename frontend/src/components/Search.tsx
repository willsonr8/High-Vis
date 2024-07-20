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

  function handleSearch(term: string) {
    console.log(term);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
            type={"text"}
            className="primary-search peer block border w-3/5 border-gray-200 text-sm outline-2 placeholder:text-gray-500"
            placeholder={"Search players"}
            value={query}
            onChange={handleChange}
        />
        {/*<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-full text-gray-500 peer-focus:text-gray-900" />*/}
          <div className={"search-button-div"}><button className={"button-submit"} type="submit">Search</button></div>
      </form>
    </div>
  );
}

export default Search;