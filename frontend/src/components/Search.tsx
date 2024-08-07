'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { getPlayerData } from '@/api/ApiCalls';
import {useRouter} from "next/navigation";

const Search = () => {
  const [term, setTerm] = useState('');
  const [player, setPlayer] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const playerData = await handleSearch(term);
    setPlayer(playerData.name);
    router.push(`/players/${playerData.name}`);
  };

  const handleSearch = async (term: string) => {
    const playerData = await getPlayerData(term);
    console.log(playerData)
    return playerData;
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
            type={"text"}
            className="primary-search peer block border w-3/5 border-gray-200 text-sm outline-2 placeholder:text-gray-500"
            placeholder={"Search players"}
            value={term}
            onChange={handleChange}
        />
        {/*<MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-full text-gray-500 peer-focus:text-gray-900" />*/}
          <div className={"search-button-div"}><button className={"button-submit"} type="submit">Search</button></div>
      </form>
      {player && (
        <div>
          {/* Render player data here */}
          <div className={"bg-white"}>{JSON.stringify(player)}</div>
        </div>
      )}
    </div>
  );
}

export default Search;