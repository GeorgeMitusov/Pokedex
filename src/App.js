import axios from 'axios';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

import PokeList from './components/PokeList';
import Pokemon from './components/Pokemon';
import Pagination from './components/Pagination';
import SearchPanel from './components/SearchPanel';

import './style/App.scss';

export default function App() {

  const [ pokemon, setPokemon ] = useState([]);
  const [ currentPageUrl, setCurrentPageUrl ] = useState('https://pokeapi.co/api/v2/pokemon');
  const [ nextPageUrl, setNextPageUrl ] = useState('');
  const [ prevPageUrl, setPrevPageUrl ] = useState('');
  const [ searchValue, setSearchValue ] = useState('');
  const [ favPopupShow, setFavPopupShow ] = useState(false);
  const [ favPokesData, setFavPokesData ] = useState([])
  const [ showFavorites, setShowFavorites] = useState(false);
  
  const [ allPokes, setAllPokes ] = useState('https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000');
  const [ allPokemons, setAllPokemons ] = useState([]);
  const [ favoritePokemons, setFavoritePokemons ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then( res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results)
    })

    axios.get(allPokes, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then( res => {
      setLoading(false)
      setAllPokemons(res.data.results)
    })
    
    return () => cancel()
    
  }, [currentPageUrl])

  useEffect(() => {
    // CURRENT HOOKS RUNS FIRST 
    const data = localStorage.getItem('favorite');
    if ( data ) {
      const result = JSON.parse(data);
      setFavPokesData( result )
    }
  }, [])


  useEffect(() => {
    localStorage.setItem( 'favorite', JSON.stringify(favPokesData))
  });

  function addFav(name) {
    const fav = pokemon.find( el => el.name == name );
    // searches for a similar to clicked name inside the poke array 

    if ( !favPokesData.includes(fav)) {
      // alert('Pokemon successfully added to FAV')
      setFavPokesData([ ...favPokesData, fav])
      setFavPopupShow(true)
    } 
  }

  function removeItem(name) {
    if ( favPokesData.find( el => el.name == name )) {
      alert('Removing')
      const items = favPokesData.filter( item => item.name !== name);
      setFavPokesData( items )
      // setFavPopupShow(false)

    } else {
      alert('Add it first')
    }
  }

  function handleClick () {
    setShowFavorites(!showFavorites)

    var favoritePokes = localStorage.getItem('favorite')

    setFavoritePokemons(
      allPokemons.filter( poke => {
        if (favoritePokes.includes(poke.name)) 
        {
          return poke
        }
      })
    )
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }

  function goToPrevPage() {
    if ( currentPageUrl !== 'https://pokeapi.co/api/v2/pokemon') {
      setCurrentPageUrl(prevPageUrl)
    } 
  }

  if (loading) return 'Loading...'

  const location = useLocation();

  function pokemonSearch(e) {
    setSearchValue(e.target.value)
  }

  function tooglePopupShow() {
    setFavPopupShow(!favPopupShow)
  }

  function toggleListFlip() {
    setListFlip(!listFlip)
  }

  return (
    <div className="App" >
      { location.pathname.includes('/pokemon/') ? null : (
        <div className='search-bar'>
          <SearchPanel searchValue={searchValue} pokemonSearch={pokemonSearch} />
          <button className='showFavButton' onClick={handleClick}> Show Fav </button>
        </div>
      )}
      <Routes>
        <Route exact path="/" element={
        <PokeList pokemon={ showFavorites ? favoritePokemons : pokemon } 
          searchValue={searchValue}  pokemonSearch={pokemonSearch}
          toggleListFlip={toggleListFlip}
        />}
      />
        <Route path="/pokemon/:pokemonIndex" element={
          <Pokemon 
            addFav={addFav}
            favPokesData={favPokesData}
            removeItem={removeItem} 
            tooglePopupShow={tooglePopupShow}
            favPopupShow={favPopupShow}
            toggleListFlip={toggleListFlip}
          />} 
        />
      </Routes> 
      { location.pathname.includes('/pokemon/') ? null : (
        <Pagination 
          goToNextPage={nextPageUrl ? goToNextPage : null } 
          goToPrevPage={prevPageUrl ? goToPrevPage : null }
        />
      )}
    </div>
  );
}