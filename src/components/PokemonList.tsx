import { useState } from "react";

interface PokemonListProps {
  pokemon: string[];
  heading: string;
}

function PokemonList({ pokemon, heading }: PokemonListProps) {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  return (
    <>
      <h1>{heading}</h1>

      {/* // Checking if there is a pokemon list found */}

      {pokemon.length === 0 && <p>No pokemon list found</p>}

      <ul className="list-group">
        {/* displaying the resul/ts */}
        {pokemon.map((poke, index) => (
          <li
            key={poke}
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
            }}
          >
            {poke}
          </li>
        ))}
      </ul>
    </>
  );
}

export default PokemonList;
