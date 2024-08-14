import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { getPlayerBio } from '@/api/ApiCalls';
import {useRouter} from "next/navigation";

const Search = () => {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const validateTerm = (inputTerm) => {
    let newTerm = "";
    for (let i=0; i < inputTerm.length; i++) {
      if (inputTerm[i] == " "){
        newTerm += "_";
      }
      else {
        newTerm += inputTerm[i];
      }
    }
    return newTerm
  }

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTerm = validateTerm(term)
    const playerData = await getPlayerBio(cleanTerm);
    if (typeof window !== "undefined") {
            sessionStorage.setItem('player', JSON.stringify(playerData));
    }
    const player_name = playerData.player.espnName
    if (player_name !== null) {
      router.push(`/players?player-name=${cleanTerm}`);
    }
    else {
      router.push('/players')
    }
  };

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
    </div>
  );
}

export default Search;