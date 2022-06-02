import axios from 'axios';
import { useEffect, useState } from 'react';
import '../style/Evolution.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

export default function Evolution({ evolutionData }) {

  const [ data, setData ] = useState();

  // useEffect(() => {
  //   axios.get(`jsonplaceholder.typicode.come/users`).then( item => setData(item.data))
  //   console.log(data);
  // }, [])

  return (
    <div className="evoultuion">
      <h1> Evolution </h1>

    </div>
  );
}
{/* <FontAwesomeIcon icon={faLongArrowAltRight} size='1x' /> */}