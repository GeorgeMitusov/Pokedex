import axios from 'axios';
import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as anotherFaStar  } from '@fortawesome/free-regular-svg-icons'

import './style/Main.scss';

export default function Main() {

  const [ userData, setUserData ] = useState([]);
  const [ favorite, setFavorite ] = useState([]);
  const [ show, setShow ] = useState(false);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then( res => {
        setUserData(res.data)
      })
  }, [])

  useEffect(() => {
    // CURRENT HOOKS RUNS FIRST 
    const data = localStorage.getItem('favs');
    if ( data ) {
      const result = JSON.parse(data);
      setFavorite( result )
    }
  }, [])

  useEffect(() => {
    // SECOND TURN TO RUN  
    localStorage.setItem('favs', JSON.stringify(favorite))
  }, [favorite])

  function removeItem(id) {
    console.log(id);
    setFavorite(() => (
      [ 
        ...favorite.slice(0, id ),
        ...favorite.slice( id + 1 )
      ]
    ))
  }

  function addFav(id) {
   console.log(userData);
   console.log(id);
    // const fav = userData.find( el => el.id == id);
    // console.log(fav);
    // if ( favorite.includes(fav)) {
    //   alert('Already exist')
    //   return fav
    // } else {
    //   setFavorite([ ...favorite, fav])
    // }
   
  }
    
    // const fav = userData.find( el => el.id == id);
    // if ( favorite.includes(fav)) {
    //   return fav
    // } else {
    //   setFavorite([ ...favorite, fav])
    //   localStorage.setItem("favorite", JSON.stringify(favorite));
    // }

    // localStorage.setItem("testKey", JSON.stringify(value));
    // var test = JSON.parse(localStorage.getItem("testKey"));

  // function AddToFavorites() {

  //   var currentFavorites = localStorage.getItem('Favorites');

  //   if (currentFavorites == null){
  //     setFavs()
  //     localStorage.setItem('Favorites',  name)
  //   } else {
  //     console.log(currentFavorites);
  //     currentFavorites.toString()
  //     currentFavorites += '@' + name
  //     localStorage.setItem('Favorites',  currentFavorites)
  //   }

  // }

  // function handle() {
  //   localStorage.setItem('Name', name);
  //   localStorage.setItem('Password', password);
  //   setName('');
  //   setPassword('');
  // }

  // function remove() {
  //   localStorage.removeItem('Name');
  //   localStorage.removeItem('Password');
  // }


  return (
    <div className="main">
      <h1> Main </h1>
      <button onClick={() => setShow( !show )}> { show ? 'hide' : 'show' } </button>

      <div style={{ backgroundColor: 'red'}}>
        { favorite.map(( item, index ) => (
          <p key={index}>
            { show ? (
              <FontAwesomeIcon 
                icon={faStar}
                size='sm'
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <FontAwesomeIcon 
                icon={anotherFaStar}
                size='sm'
                style={{ cursor: 'pointer' }}
              />
            )}
            
            {item.name}
            <button onClick={() => removeItem(index)}> x </button>
          </p>
        ))}
      </div>
      
      <div className='wrap'>

        <div>
          {
            userData.map(( user, index ) => (
              <div key={user.id}>
                <div style={{ display: 'flex'}}>
                  <h1> {user.name} </h1>
                  <button onClick={() => addFav(user.id)}> fav </button>
                </div>
              </div>
            ))
          }
        </div>

        {/* <div>
          <h1> { name } </h1>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Type your name'
          />

          <h1> { password } </h1>
          <input
            value={ password }
            onChange={e => setPassword(e.target.value)}
            placeholder='Type your password'
          />

          <div>
            <button onClick={handle}> Done </button>
          </div>

          { localStorage.getItem('Password') && (
            <div> 
              Password: <p> {localStorage.getItem('Password')} </p>
            </div>
          )}

          { localStorage.getItem('Name') && (
            <div> 
              Name: <p> {localStorage.getItem('Name')} </p>
            </div>
          )}

          <div>
            <button onClick={remove}> Remove </button>
          </div>

        </div> */}

        {/* <div>
          {
            favorite.map( user => (
              <div key={user.id}>
                <div style={{ display: 'flex'}}>
                  <h1> {user.name} </h1>
                  <button onClick={() => removeItem(user.id)}> X </button>
                </div>
              </div>
            ))
          }
        </div> */}

      </div>

    </div>
  );
}


// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import Form from './container/Form1';
// import Form2 from './container/Form2';

// import './style/Main.scss';

// export default function Main() {

//   const [ pokemon, setPokemon ] = useState([]);

//   return (
//     <div className="main">
//       <h1> Main </h1>
//       <div>
//         <Form/>
//         <Form2/>
//       </div>
//     </div>
//   );
// }

// import axios from 'axios';
// import { useState, useEffect } from 'react';

// import './style/Main.scss';

// // import PokeList from './components/PokeList';
// // import Pokemon from './components/Pokemon';

// export default function Main() {

//   const [ pokemon, setPokemon ] = useState([]);
//   const [ value, setValue ] = useState('');
//   const [ currentPageUrl, setCurrentPageUrl ] = useState('https://pokeapi.co/api/v2/pokemon');
//   const [ loading, setLoading ] = useState(true);

//   // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20

//   useEffect(() => {
//     setLoading(true);
//     let cancel
//     axios.get(currentPageUrl, {
//       cancelToken: new axios.CancelToken(c => cancel = c)
//     }).then( res => {
//       setLoading(false)
//       setPokemon(res.data.results.map(p => p.name))
//     })

//     return () => cancel()

//   }, [currentPageUrl])


//   if (loading) return 'Loading...'

//   function handleChange(e) {
//     setValue(e.target.value)
//   }

//   return (
//     <div className="main">
//       <div className='wrap'>
//           <input
//             placeholder='Search precise pokemon'
//             value={value}
//             onChange={handleChange}
//           />
//         <div>
//           { pokemon.filter(poke => {
//               if ( value === '' ) {
//                 return poke
//               } else {
//                 const result = poke.toLowerCase().includes(value.toLowerCase())
//                 return result
//               }
//             }).map(( el, index) => <p key={index}>{el}</p>)
//           } 
//         </div>
//       </div>
//     </div>
//   );
// }



// export default function Main() {

//   const [ pokemon, setPokemon ] = useState([]);
//   const [ currentPageUrl, setCurrentPageUrl ] = useState('https://pokeapi.co/api/v2/pokemon');
//   const [ nextPageUrl, setNextPageUrl ] = useState('');
//   const [ prevPageUrl, setPrevPageUrl ] = useState('');
//   const [ loading, setLoading ] = useState(true);

//   // https://pokeapi.co/api/v2/pokemon?offset=20&limit=20


//   useEffect(() => {
//     setLoading(true);
//     let cancel
//     axios.get(currentPageUrl, {
//       cancelToken: new axios.CancelToken(c => cancel = c)
//     }).then( res => {
//       setLoading(false)
//       setNextPageUrl(res.data.next)
//       setPrevPageUrl(res.data.previous)
//       setPokemon(res.data.results.map(p => p.name))
//     })

//     return () => cancel()

//   }, [currentPageUrl])

//   function goToNextPage() {
//     setCurrentPageUrl(nextPageUrl)
//   }

//   function goToPrevPage() {
//     if ( currentPageUrl !== 'https://pokeapi.co/api/v2/pokemon') {
//       setCurrentPageUrl(prevPageUrl)
//     } 
//   }


//   if (loading) return 'Loading...'

//   return (
//     <div className="main">
//       <h1> Main </h1> 
//       { pokemon.map(( el, index) => <p key={index}>{el}</p>)} 
//       <div>
//         { goToPrevPage && <button onClick={goToPrevPage}>
//             Previous 
//           </button> 
//         }
//         <button onClick={goToNextPage}> Next </button>
//       </div>
//     </div>
//   );
// }
