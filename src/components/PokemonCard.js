import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'

import '../style/PokemonCard.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function PokemonCard({ pokemon, url, name, toggleListFlip }) {
  
  const [ pokeName, setPokeName ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ pokemonIndex, setPokemonIndex ] = useState('');
  const [ imageLoading, setImageLoading ] = useState(true);
  const [ toManyRequests, setToManyRequests ] = useState(false);

  useEffect(() => {
    const pokemonId = url.split('/')[url.split('/').length -2 ];
    const imgUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonId}.png?raw=true`
    setPokeName(name);
    setImageUrl(imgUrl);
    setPokemonIndex(pokemonId);

  }, [pokemon])

  // 
  return (
    <div className="info-wrap" onClick={toggleListFlip}>
      <div className="overviewInfo">
        <Link to={`pokemon/${pokemonIndex}`}>

          <div className='card-image'>
            { imageUrl ? ( 
                <img
                  onError={() => setToManyRequests(true)} 
                  src={imageUrl}
                  style={ toManyRequests ? { display: 'none' } : 
                    imageLoading ? null : { display: 'block' }
                  }
                />
              ) : ( 
                <div className='poke-card-spinner'>
                  <FontAwesomeIcon icon={faSpinner} size='4x' spin color='lightskyblue'/>
                </div>
              )
            }
          </div>

          <div className='pokemon-request'>
            { toManyRequests ? (
              <h3>
                <span> To Many Requests </span>            
              </h3>) : null 
            }
          </div>

          <div className='card-title-wrap'>
            <h6 className="card-title">
              { pokeName 
                  .toLowerCase()
                  .split(' ')
                  .map( s => s.charAt(0).toUpperCase() + s.substring(1) )
                  .join('')
                }
            </h6>
          </div>

        </Link>
      </div>
    </div>
  );
}