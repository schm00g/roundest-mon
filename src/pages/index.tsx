import { getOptionsForVote } from "@/utils/getRandomPokemonHelper";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import type React from "react";

export default function Home(){
    
  const [ids, setIds] = useState<Array<number>>([]);

  useEffect(() => {
    setIds(getOptionsForVote());
  }, [])

  console.log(ids)

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", {
    id: ids[0]
  }]);

  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", {
    id: ids[1]
  }]);

  if(firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-32 h-32 bg-pink-300">
          <img 
            alt="sprite" 
            className="w-full" 
            src={firstPokemon.data?.sprites.front_default}
          />
          <div className="text-l text-center capitalize pt-1">
            {firstPokemon.data?.name}
          </div>
        </div>  
        <div className="p-8">Vs</div>  
        <div className="w-32 h-32 bg-blue-300">
          <img 
            alt="sprite" 
            className="w-full"
            src={secondPokemon.data?.sprites.front_default}
          />
          <div className="text-l text-center capitalize pt-1">
            {secondPokemon.data?.name}
          </div>
        </div>  
      </div>
    </div>
  );
}
