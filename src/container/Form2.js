import { useState, useEffect } from 'react';
import useLocalStorage from './UseLocalStorage';

export default function Form2() {
  
    const [ name, setName ] = useLocalStorage('name', '');
    const [ checked, setChecked ] = useLocalStorage('checked', false);

    return (
        <form className="form-second" style={{ display: 'flex', flexDirection: 'column', width: '30%', margin: '50px 35%'}}>
            <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Full name'
                aria-label='fullname'
            />
            <label>
                <input 
                    type='checkbox'
                    checked={checked}
                    onChange={e => setChecked(e.target.checked)}
                />{' '}
                Not a robot?
            </label>
            <input type='submit' value="Submit"
                onClick={e => addItem(e)}>
            </input>
        </form>
    );
}