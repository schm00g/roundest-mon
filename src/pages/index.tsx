import { getOptionsForVote } from "@/utils/getRandomPokemonHelper";
import { trpc } from "@/utils/trpc";
import { useEffect, useState } from "react";
import type React from "react";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const btn =
  "inline-flex items-center px-3 ml-5 mt-5 py-1.5 border border-gray-300 shadow-sm font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

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

  const voteMutation = trpc.useMutation(["cast-vote"])

  const voteForRoundest = (selected: number) => {
    if(selected === first){
      voteMutation.mutate({votedFor: first, votedAgainst: second});
    } else {
      voteMutation.mutate({votedFor: second, votedAgainst: first});
    }

    setIds(getOptionsForVote());
  }

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center relative">
      <div className="text-2xl text-center">Which Pokémon is more round?</div>
      <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
        { !firstPokemon.isLoading && 
          !secondPokemon.isLoading &&
          firstPokemon.data &&
          secondPokemon.data && (
            <div className="p-8 flex justify-between items-center max-w-2xl flex-col md:flex-row animate-fade-in">
              <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest("first")}/>
              <div className="p-8">Vs</div>  
              <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest("second")}/>  
              <div className="p-2"/>
            </div>
        )}
      </div>
    </div>
  );
}

type PokemonFromServer = inferQueryResponse<"get-pokemon-from-id">;

const PokemonListing: React.FC<{pokemon: PokemonFromServer, vote: () => void}> = (props) => {
  return (
    <div>
      <img 
          alt="sprite" 
          className="w-32 h-32" 
          src={props.pokemon.sprites.front_default}
      />
      <div className="text-l text-center capitalize pt-1">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  )
}