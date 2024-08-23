import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import React, { useState, useEffect } from 'react';
import { getPlayerBio, getAllPlayers } from '@/api/ApiCalls';
import {useRouter} from "next/navigation";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";

const NextSearchBar = () => {
  const [term, setTerm] = useState('');
  const [defaultItems, setDefaultItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayerList = async () => {
      try {
        const data = await getAllPlayers()
        // const jsonString = data.player_stats.replace(/\\/g, "");
        // const parsedPlayerStats: PlayerStats = JSON.parse(jsonString);
        let jsonString = data.player_list;

      // If the string is double-escaped, fix it
        try {
          jsonString = JSON.parse(jsonString);
        } catch (e) {
          console.warn('First JSON parse failed, trying to clean the string...');
          jsonString = jsonString.replace(/\\"/g, '"'); // Replace \" with "
          jsonString = jsonString.replace(/\\\\/g, '\\'); // Replace \\ with \
        }

        let playerList;
        try {
          playerList = JSON.parse(jsonString); // Attempt parsing again
        } catch (parseError) {
          console.error('Final JSON parsing error:', parseError.message);
          return; // Exit early if parsing fails
        }
        if (playerList.body) {
        // Only map if body exists
          const items = playerList.body.map(player => ({
          label: player.espnName,
          value: player.espnName, // Use espnName as both label and value, or adjust as needed
          }));

          setDefaultItems(items);
        } else {
        console.error('body is undefined');
        }
      } catch (error) {
        console.error('Error fetching player list:', error);
      }
    };
    fetchPlayerList();
  }, []);

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
        <div className={"primary-search-container"}>
          <Autocomplete
              placeholder="Search players ..."
              variant="bordered"
              defaultItems={defaultItems}
              startContent={<MagnifyingGlassIcon className="h-[18px] w-[18px]" />}
              className="max-w-xs"
            >
              {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
          </Autocomplete>
        </div>
        <div className={"search-button-div"}><button className={"button-submit"} type="submit">Search</button></div>
      </form>
    </div>
  );
}

export default NextSearchBar;