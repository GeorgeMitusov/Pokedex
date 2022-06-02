import { useState } from 'react';
import '../style/PokeList.scss';

import { useSpring, animated, config } from 'react-spring'

import PokemonCard from './PokemonCard';

export default function PokeList({ pokemon, searchValue, toggleListFlip }) {

  const leftMenuAnimation = useSpring({
    from: { opacity: 0, transform: `scale(2)`},
    to: { opacity: 1, transform: `scale(1)` },
    config: config.gentle,
  })
  
  return (
    <animated.div className="poke-list" style={leftMenuAnimation}>
      { pokemon.length == 0 ? 
        (
          <animated.div className="empty-wrap">
            <h1 className='empty-info'> Empty Favorite List  </h1>
          </animated.div>
        ) : (
            pokemon.filter( poke => {
              if ( searchValue === '' ) {
                return poke
              } else {
                const result = poke.name.toLowerCase().includes(searchValue.toLowerCase())
                if ( result ) {
                  return poke
                }
              }
              }).map(( p, index ) => (
                  <PokemonCard 
                    key={index}
                    pokemon={p}
                    url={p.url}
                    name={p.name}
                    toggleListFlip={toggleListFlip}
                  />
              ))
         )
      }
    </animated.div>
  );
}