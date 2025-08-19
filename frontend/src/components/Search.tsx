import {MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import React, {ChangeEvent, Dispatch, FormEvent, SetStateAction, useState} from 'react';
import {getPlayerBio} from '@/api/ApiCalls';
import {useRouter} from "next/navigation";
import {PlayerInfoProp} from "@/interfaces/playerInfo";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

const validateTerm = (inputTerm: string) => inputTerm.replace(/ /g, "_")

const createHandleChange = (setTerm: Dispatch<SetStateAction<string>>) =>
    (e: ChangeEvent<HTMLInputElement>)=> setTerm(e.target.value);

const createHandleSubmit = (
    term: string,
    setError: Dispatch<SetStateAction<boolean>>,
    router: AppRouterInstance
) => async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleanTerm = validateTerm(term);
    const playerData: PlayerInfoProp = await getPlayerBio(cleanTerm);
    if (playerData) {
        setError(false);
        router.push(`/players?player-name=${cleanTerm}`);
    } else {
        setError(true);
    }
};

const Search = () => {
    const [term, setTerm] = useState('');
    const [searchError, setSearchError] = useState(false);
    const router = useRouter();

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <form className="search-form" onSubmit={createHandleSubmit(term, setSearchError, router)}>
                <div className={"primary-search-container"}>
                    <MagnifyingGlassIcon
                        className="absolute h-[18px] w-[18px] -translate-y-full text-gray-500 peer-focus:text-gray-900"
                        style={{top: '29%', left: '17%'}}/>
                    <input
                        type={"text"}
                        className="primary-search peer block border border-gray-200 text-sm w-full outline-2 placeholder:text-gray-500"
                        placeholder={"Search players"}
                        value={term}
                        onChange={createHandleChange(setTerm)}
                    />
                </div>
                {searchError && <div><p>{"Invalid player. Please try again."}</p></div>}
                <div className={"search-button-div"}>
                    <button className={"button-submit"} type="submit">Search</button>
                </div>
            </form>
        </div>
    );
}

export const MiniSearch = () => {
    const [term, setTerm] = useState('');
    const [searchError, setSearchError] = useState(false);
    const router = useRouter();

    return (
        <div>
            <form className="mini-search-form" onSubmit={createHandleSubmit(term, setSearchError, router)}>
                <input
                    type={"text"}
                    className="mini-search"
                    placeholder={"Search players"}
                    value={term}
                    onChange={createHandleChange(setTerm)}
                />
                <button className={"mini-submit"} type="submit">Search</button>
            </form>
        </div>
    )
}

export default Search;