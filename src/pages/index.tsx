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

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-2xl text-center">Which Pokemon is rounder?</div>
      <div className="p-2"/>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        <div className="w-16 h-16 bg-red-500">{ids[0]}</div>  
        <div className="p-8">Vs</div>  
        <div className="w-16 h-16 bg-pink-600">{ids[1]}</div>  
      </div>
    </div>
  );
}
