import { getOptionsForVote } from "@/utils/getRandomPokemonHelper";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import type React from "react";

const btn =
  "inline-flex items-center px-3 mt-5 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

export default function Home(){
    
  const [ids, setIds] = useState<Array<number>>([]);

  useEffect(() => {
    setIds(getOptionsForVote());
  }, [])
  
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {
    id: ids[0]
  }]);
  
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", {
    id: ids[1]
  }]);
  
  if(firstPokemon.isLoading || secondPokemon.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes
    setIds(getOptionsForVote());
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-2xl text-center">Which Pokémon is more round?</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-32 h-32 bg-pink-300 flex flex-col items-center">
          <img 
            alt="sprite" 
            className="w-full" 
            src={firstPokemon.data?.sprites.front_default}
          />
          <div className="text-l text-center capitalize pt-1">
            {firstPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForRoundest()}>
            Rounder
          </button>
        </div>  
        <div className="p-8">Vs</div>  
        <div className="w-32 h-32 bg-blue-300 flex flex-col items-center">
          <img 
            alt="sprite" 
            className="w-full"
            src={secondPokemon.data?.sprites.front_default}
          />
          <div className="text-l text-center capitalize pt-1">
            {secondPokemon.data?.name}
          </div>
          <button className={btn} onClick={() => voteForRoundest()}>
            Rounder
          </button>
        </div>  
      </div>
    </div>
  );
}
