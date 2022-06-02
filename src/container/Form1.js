import { useState, useEffect } from 'react';
import useLocalStorage from './UseLocalStorage';

export default function Form() {
  
    const [ name, setName ] = useLocalStorage('name', '');

    // useEffect(() => {
    //     localStorage.setItem('name', JSON.stringify(name));
    // }, [name])

    // function addItem(e) {
    //     e.preventDefault()
    //     localStorage.setItem('name', JSON.stringify(name));
    //     setName('')
    // }

  return (
    <form className="form">
        <h1> { name } </h1>
        <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='Full name'
            aria-label='fullname'
        />
        <input type='submit' value="Submit"
            >
             {/* onClick={e => addItem(e)} */}
        </input>
    </form>
  );
}