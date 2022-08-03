import axios from 'axios';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

import PokePopup from './PokePopup';

import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as anotherFaStar  } from '@fortawesome/free-regular-svg-icons'

import { useSpring, animated, config } from 'react-spring'

import '../style/Pokemon.scss';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default function Pokemon({ favPokesData, addFav, removeItem,
    tooglePopupShow, favPopupShow, toggleListFlip }) {

  const [ pokeId, setPokeId ] = useState('');
  const [ pokeImage, setPokeImage ] = useState('');
  const [ evolutionData, setEvolutionData ] = useState('');
  const [ speciesData, setSpeciesData ] = useState({ 
    description: '',
    genderRatioFemale: '',
    genderRatioMale: '',
    catchRate: '',
    eggGroups: '',
    hatchSteps: '',
    evolution: ''
  });
  const [ pokeDetails, setPokeDetails ] = useState({
    name: '',
    pIndex: '',
    pImgUrl: '',
    types: [],
    stats: {
      hp: '',
      attack: '',
      defense: '',
      spped: '',
      specialAttack: '',
      specialDefense: '',
    },
    height: '',
    weight: '',
    themeColor: '',
    abilities: [],
    evs: '',
  });
  
  let { pokemonIndex } = useParams();
  let { hp, attack, defense, speed, specialAttack, specialDefense } = '';

  useEffect(() => {

    setPokeId(pokemonIndex);

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`; 
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

    axios.get(pokemonUrl).then( res => {
      const pokemonDetails = res.data;
      setPokeImage(pokemonDetails.sprites.front_default)

      pokemonDetails.stats.map( stat => {
        switch (stat.stat.name) {
          case 'hp':
            hp = stat['base_stat'];
            break;
            
          case 'attack':
            attack = stat['base_stat'];
            break;
            
          case 'defense':
            defense = stat['base_stat'];
            break;

          case 'speed':
            speed = stat['base_stat'];
            break;

          case 'special-attack':
            specialAttack = stat['base_stat'];
            break;

          case 'special-defense':
            specialDefense = stat['base_stat'];
            break;
        
          default:
            break;
        }
      })

    const height =
      Math.round((pokemonDetails.height * 0.328084 + 0.00001) * 100) / 100;

    const weight =
      Math.round((pokemonDetails.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonDetails.types.map(type => type.type.name);

    const abilities = pokemonDetails.abilities
      .map(ability => {
        return ability.ability.name 
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })

    const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

    const evs = pokemonDetails.stats
      .filter(stat => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map(stat => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', ');


    setPokeDetails({ 
        ...pokeDetails,
        name: pokemonDetails.name,
        pImgUrl: pokemonDetails.sprites.front_default,
        pIndex: pokemonIndex,
        height,
        weight,
        evs,
        themeColor,
        abilities: [...abilities],
        types: [ ...types ],
        stats: {
          hp, 
          attack, 
          defense, 
          speed,
          specialAttack,
          specialDefense
        }
      })
    });

    axios.get(pokemonSpeciesUrl).then( res => {
        const pokemonSpeciasDetails = res.data;
        let description = '';
        pokemonSpeciasDetails.flavor_text_entries.some(flavor => {
          if (flavor.language.name === 'en') {
            description = flavor.flavor_text;
            return;
          }
        });

        const femaleRate = res.data['gender_rate'];
        const genderRatioFemale = 12.5 * femaleRate; 
        const genderRatioMale = 12.5 * ( 8 - femaleRate );

        const evolution = pokemonSpeciasDetails.evolution_chain.url;

        const catchRate = Math.round(( 100 / 255 ) * res.data[`capture_rate`]);
        const hatchSteps = 255 * (res.data['hatch_counter'] + 1);
        const eggGroups= res.data['egg_groups']
          .map( group => {
            return group.name
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ');
          })
    
        setSpeciesData({ 
          ...speciesData,
          description,
          genderRatioFemale,
          genderRatioMale,
          catchRate,
          eggGroups,
          hatchSteps,
          evolution
        })

        setEvolutionData([
          ...evolutionData,
          evolution
        ])
    
    })
    .catch( error => { console.log(error) })

    // axios.get(speciesData.evolution).then( res => {
    //   const evolutionDetails = res.data;
    //   console.log(evolutionDetails);
    //   setEvolutionData(evolutionDetails)
    // })
    // .catch( error => { console.log(error) })

  }, [])

  const { name, height, weight, stats, abilities, types, themeColor, evs} = pokeDetails;
  const { description, genderRatioFemale, genderRatioMale,
    catchRate, eggGroups, hatchSteps } = speciesData;

  const leftMenuAnimation = useSpring({
    from: { opacity: 0, transform: `translateY(100%)`},
    to: { opacity: 1, transform: `translateY(0)` },
    config: config.wobbly,
  })

  const btnSettings = useSpring({
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: -300 },
    delay: 1200 
  })

  return (
    <animated.div style={leftMenuAnimation} className="pokemon">
      <div className='pokemon-wrap'>
        <div className='pokemon-definition' style={{ backgroundColor: `#${themeColor}`}}>
          <h1> 
            { name
              .toLowerCase()
              .split(' ')
              .map( letter => letter.charAt(0).toUpperCase() + letter.substring(1))
              .join(' ')
            }
          </h1>
          <div className='fav-btn-wrap' >
            { favPopupShow && <PokePopup
                  favPopupShow={favPopupShow} 
                  tooglePopupShow={tooglePopupShow}
                  style={{ backgroundColor: `#${themeColor}`}}
                />
            }
            { favPokesData.find( el => el.name == name ) ? (
                <button className='btnFavRemove' onClick={() => removeItem(name, pokeId)}>
                  <FontAwesomeIcon icon={faStar} className="highlight" 
                    size='lg' style={{ cursor: 'pointer' }}
                  /> 
                </button>
              ) : (
                  <button className='btnFavAdd' onClick={() => addFav(name)}>
                    <FontAwesomeIcon className="highlight-reg"
                      icon={anotherFaStar} size='lg'
                      style={{ cursor: 'pointer' }} 
                    />
                  </button>
              ) 
            }
          </div>

        </div>
        
        <div className='poke-main-details'>
          
          <div className='main-top'>

            <div className='poke-image'>
              <img src={ pokeImage } />
            </div>
              
            <div className='poke-main-second-section'>
                <div className='poke-types'>
                    <div className='poke-type-wrap' style={ types.length == 1 ? { justifyContent: 'center' } : { justifyContent: 'space-between' } }>
                      {
                        types.map(( type, index) => (
                          <span 
                            className='poke-type'
                            key={index}
                            style={{ backgroundColor: `#${TYPE_COLORS[type]}`, color: 'white'}}
                          >
                            { type.toLowerCase()
                                .split(' ')
                                .map( letter => letter.charAt(0).toUpperCase() + letter.substring(1))
                                .join(' ')
                              }
                          </span>
                        ))
                      }
                    </div>
                </div>
                <div className='poke-stats'>

                  <div className="poke-stat">
                    <div className='poke-definition'>
                      HP: 
                    </div>
                    <div className='poke-progress'>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${stats.hp}%`,
                            backgroundColor: `#${themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="poke-stat">
                    <div className='poke-definition'>
                      ATTACK: 
                    </div>
                    <div className='poke-progress'>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${stats.attack}%`,
                            backgroundColor: `#${themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.attack}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="poke-stat">
                    <div className='poke-definition'>
                      DEFENSE: 
                    </div>
                    <div className='poke-progress'>
                      <div className="progress">
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{
                            width: `${stats.defense}%`,
                            backgroundColor: `#${themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.defense}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="poke-stat">
                    <div className='poke-definition'>
                      SPEED: 
                    </div>
                    <div className='poke-progress'>
                      <div className="progress">
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{
                            width: `${stats.speed}%`,
                            backgroundColor: `#${themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.speed}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="poke-stat">
                    <div className='poke-definition'>
                      SPECIAL ATTACK: 
                    </div>
                    <div className='poke-progress'>
                      <div className="progress">
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{
                            width: `${stats.specialAttack}%`,
                            backgroundColor: `#${themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.specialAttack}</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="poke-stat">
                    <div className='poke-definition'>
                      SPECIAL DEFENSE: 
                    </div>
                    <div className='poke-progress'>
                      <div className="progress">
                        <div
                          className="progress-bar "
                          role="progressbar"
                          style={{
                            width: `${stats.specialDefense}%`,
                            backgroundColor: `#${themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.specialDefense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>

            <div className='poke-main-third-section'>

              <h1> { pokeId } </h1>
              
            </div>

          </div>

          <div className='poke-description'>
            <p> { description } </p>
          </div>

        </div>


        <div className='pokeSpecDetails'>

          <div className='poke-profile'>
            <div className='poke-profile-def'
              style={{ backgroundColor: `#${themeColor}`}}
            >
              <h1> Profile: </h1>
            </div>

            <div className='poke-profile-wrap'>

              <div className='poke-prof-left'>

                <div className='poke-spec-stat'>
                  <div className='poke-spec-definition'>
                    <h6> Height: </h6>
                  </div>
                  <div className='poke-spec-value'>
                    <span> { height } ft </span>
                  </div>
                </div>

                <div className='poke-spec-stat'>
                  <div className='poke-spec-definition'>
                    <h6> Weight: </h6>
                  </div>
                  <div className='poke-spec-value'>
                    <span> { weight } ft </span>
                  </div>
                </div>

                <div className='poke-spec-stat'>
                  <div className='poke-spec-definition'>
                    <h6> Cache Rate: </h6>
                  </div>
                  <div className='poke-spec-value'>
                    <span> { catchRate } ft </span>
                  </div>
                </div>

                <div className="poke-spec-stat">
                  <div className='poke-spec-definition'>
                    <h6> GENDER RATIO: </h6> 
                  </div>

                  <div className='poke-progress'>

                    <div className="progress">

                      <div className='progress-wrap'>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${genderRatioFemale}%`,
                            backgroundColor: `#c2185b`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          >
                          <small>{genderRatioFemale}</small>
                        </div>

                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${genderRatioMale}%`,
                            backgroundColor: `#${themeColor}`
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          >
                          <small>{genderRatioMale}</small>
                        </div>
                      </div>
                      
                    </div>
                  
                  </div>

                </div>
              </div>

              <div className='poke-prof-right' style={{ backgroundColor: `#${themeColor}`}} >
                <div className='poke-data-wrap'>
                  <div className='poke-details-descr'>
                    <h6> Egg Groups: </h6>
                  </div>
                  <div className='poke-data-def'>
                    <h6> { eggGroups } </h6>
                  </div>
                </div>

                <div className='poke-data-wrap'>
                  <div className='poke-details-descr'>
                    <h6> Hatch Steps: </h6>
                  </div>
                  <div className='poke-data-def'>
                    <h6> { hatchSteps } </h6>
                  </div>
                </div>

                <div className='poke-data-wrap'>
                  <div className='poke-details-descr'>
                    <h6> ABILITIES: </h6>
                  </div>
                  <div className='poke-data-def'>
                    <div className='poke-abilities'>
                      {
                        abilities.map((el, index) => <p key={index}> { el } </p>)
                      }
                    </div>
                  </div>
                </div>

                <div className='poke-data-wrap'>
                  <div className='poke-details-descr'>
                    <h6> EV's: </h6>
                  </div>
                  <div className='poke-data-def'>
                    <h6> { evs } </h6>
                  </div>
                </div>

              </div>

            </div>
            
          </div>
        </div>
        
      </div>
      <animated.div className="pokemon-goback-button-wrap" style={btnSettings}>
        <Link to="/">
          <span 
            className='pokemon-goback-button'
            style={{ color: `#${themeColor}` }}
            onClick={toggleListFlip}
          >
            <FontAwesomeIcon icon={faArrowLeft} size='6x' />
          </span> 
        </Link>
      </animated.div>


    </animated.div>
  );
}

