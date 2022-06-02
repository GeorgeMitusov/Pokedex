import React, { useEffect, useContext, useState } from "react";
import { Route, Routes, useLocation, Link } from 'react-router-dom';

import TestTwo from "./Test2";
import TestThree from "./Test3";
import TestFour from "./Test4";

import './style/Test.scss';

import { useSpring, animated, useTransition, config } from 'react-spring'

export default function Test() {

  let location = useLocation();

  console.log(location.pathname);

  const transitions = useTransition( location, location => location.pathname, {
    from: { opacity: 0, transform: 'translateY(-100%)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(50%)' },
    // config: { delay: 2000},
    // delay: 2000
  })


  return (
    <div className="test">
      <animated.div style={styles}>I will fade in and out</animated.div>
      <ul>

        <li>
          <Link to="/"> Home </Link>
        </li>

        <li>
          <Link to="/test-three"> Three </Link>
        </li>

        <li>
          <Link to="/test-four"> Four </Link>
        </li>

      </ul>

      <hr />

      <div> 
        { transitions(( props, item ) => (
            <animated.div styles={props}>
              <Routes location={item}>
                <Route path="/" exact element={ <TestTwo/> } />
                <Route path="/test-three" element={ <TestThree /> } />
                <Route path="/test-four" element={ <TestFour /> } />
              </Routes> 
            </animated.div>
          ))
        }
      </div>

{/* 
      <Routes>
          <Route path="/" element={ <TestTwo/> } />
          <Route path="/test-three"  element={ <TestThree /> } />
          <Route path="/test-four" exact element={ <TestFour /> } />
      </Routes>  */}

    </div>
  )
}



// export default function Test() {

//   const [ isOpen, setIsOpen ] = useState(true)


//   const togglePopup = () => {
//     setIsOpen(!isOpen)
//   }

//   const rightMenuAnimation = useSpring({
//     opacity: isOpen ? 1 : 0,
//     transform: isOpen ? `translateX(0)` : `translateX(100%)`
//   });

//   const leftMenuAnimation = useSpring({
//     opacity: isOpen ? 1 : 0,
//     transform: isOpen ? `translateX(0)` : `translateX(100%)`
//   })


//   return (
//     <div className="app">

//       <button onClick={togglePopup}> { isOpen ? 'hide' : 'show' } </button>
//       <Test2 style={leftMenuAnimation} />

// {/* 
//       <button
//         className="menu-button"
//         onClick={togglePopup}
//       >
//         {isOpen ? "Close" : "Side Menu"}
//       </button>

//       <MenuRight style={rightMenuAnimation} /> */}
     
//     </div>
//   );
// }


// SPRING CODE 
/*
import { useTrail, animated as a } from "react-spring";

-> out of component
const items = ["Item1", "Item2", "Item3", "Item4"];
const config = { mass: 5, tension: 2000, friction: 200 };

const [toggle, set] = useState(true);
const trail = useTrail(items.length, {
  config,
  opacity: toggle ? 1 : 0,
  x: toggle ? 0 : 20,
  height: toggle ? 80 : 0,
  from: { opacity: 0, x: 20, height: 0 }
});

render*
    <div className="trails-main" onClick={() => set(state => !state)}>

  <div>
        {trail.map(({ x, height, ...rest }, index) => (
          <a.div
            key={items[index]}
            className="trails-text"
            style={{
              ...rest,
              transform: x.interpolate(x => `translate3d(0,${x}px,0)`)
            }}
          >
            <a.div style={{ height }}>{items[index]}</a.div>
          </a.div>
        ))}
      </div>
  </div>


*/


// import { useSpring, animated } from 'react-spring'
// import { useEffect, useState } from "react"

// const fruits = [
//   "Apple",
//   "Orange",
//   "Guava",
//   "Mango",
//   "Grapes",
//   "Kiwi",
//   "Strawberry",
// ]

// function App() {
//   const [name, setName] = useState("")
//   const [userData, setUserData] = useState()
//   const [editMode, setEditMode] = useState(false)

//   useEffect(() => {
//     // Fetch the user data from the localStorage and set it to the local state userData
//     try {
//       const user = window.localStorage.getItem("user")

//       if (!user) {
//         setUserData(null)
//       } else {
//         const parsedData = JSON.parse(user)
//         setUserData(parsedData)
//         if (parsedData.favorites.length === 0) {
//           setEditMode(true)
//         }
//       }
//     } catch (error) {
//       console.log(error)
//       setUserData(null)
//     }
//   }, [])

//   const onFruitChecked = (e, fruit) => {
//     // Check if the fruit exists in the current list of favorites
//     const index = userData.favorites.indexOf(fruit)
//     // If the checkbox is checked and fruit is not part of favorites
//     if (e.target.checked && index === -1) {
//       setUserData(prevValues => {
//         // Add the fruit to the current list of favorites
//         return { ...prevValues, favorites: [...prevValues.favorites, fruit] }
//       })
//     } else if (!e.target.checked && index !== -1) {
//       // If the checkbox is unchecked and fruit is part of favorites
//       setUserData(prevValues => {
//         // Remove the fruit from the current list of favorites
//         return {
//           ...prevValues,
//           favorites: [
//             ...prevValues.favorites.slice(0, index),
//             ...prevValues.favorites.slice(index + 1),
//           ],
//         }
//       })
//     }
//   }

//   const formSubmitHandler = e => {
//     e.preventDefault()
//     try {
//       setUserData({ name, favorites: [] })
//       setEditMode(true)
//       window.localStorage.setItem(
//         "user",
//         JSON.stringify({ name, favorites: [] })
//       )
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const props = useSpring({
//      to: { opacity: 1 }, 
//      from: { opacity: 0 },
//      delay: 1000,
//     })

//   return (
//     <div>
//       <animated.div style={props}>
//         I will fade in
//         <div>
//           <h1> shade </h1>  
//           <button> fade </button>
//         </div>
//       </animated.div>
//       {userData === null && (
//         <div>
//           <form onSubmit={formSubmitHandler}>
//             <input
//               id="Name"
//               placeholder="Name"
//               type="Name"
//               value={name}
//               onChange={e => setName(e.target.value)}
//             />
//             <button intent="primary" text="Submit"  type="submit">submit</button>
//           </form>
//         </div>
//       )}
//       {userData && editMode && (
//         <div>
//           <p>
//             Welcome <strong>{userData.name}</strong>, choose your favorite
//             fruits:
//           </p>
//           {fruits.map(fruit => {
//             return (
//               <input
//                 type='checkbox'
//                 key={fruit}
//                 label={fruit}
//                 inline={true}
//                 className="space"
//                 checked={userData.favorites.indexOf(fruit) !== -1}
//                 onChange={e => {
//                   onFruitChecked(e, fruit)
//                 }}
//               />
//             )
//           })}
//           <button intent="primary" text="Save"  type="submit"> submit </button>
//         </div>
//       )}
//     </div>
//   )
// }

// export default App

// // import axios from 'axios';
// // import { useState, useEffect } from 'react';
// // import { useFetch } from './useFetch';

// // export default function Test() {

// //   const [ data, setData ] = useState({ email: '', password: '' });
// //   const [ count, setCount ] = useState(() => 
// //     JSON.parse(localStorage.getItem('count'))
// //   );
// //   const { info, loading } = useFetch(`http://numbersapi.com/${count}`);

// //   useEffect(() => {
// //     // localStorage.setItem('count', JSON.stringify(count))
// //     localStorage.setItem('count', count)
// //   }, [count])

// //   return (
// //     <div className="test" style={{ textAlign: 'center' }}>
// //       Test
// //       <div>
// //         { !info ? "Loading" : info }
// //         <hr/>
// //         { count }
// //         <button onClick={ () => setCount( prev => prev + 1 )}> Count ++  </button>
// //         <button onClick={ () => setCount(0)}> reset </button>
// //       </div>
// //     </div>
// //   );
// // }

