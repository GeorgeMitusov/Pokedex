import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
// import { faStar as anotherFaStar  } from '@fortawesome/free-regular-svg-icons'

import { useSpring, animated } from 'react-spring'

import '../style/PokePopup.scss';

export default function PokePopup({ tooglePopupShow, favPopupShow, style }) {

  const props = useSpring({ 
    to: { opacity: 1, y: 0 },
    from: { opacity: 0, y: -500 },
    delay: 300 
  })

  return (
    <animated.div className="popup-box" style={props}>
      <div className="box" style={style}>
        <span className="close-icon" onClick={tooglePopupShow}>
          <FontAwesomeIcon className="popup-delete-icon"
            icon={faTimesCircle} size='sm'
            style={{ cursor: 'pointer' }} 
          />
        </span>
        <h1> Added to Favorites </h1>
      </div>
    </animated.div>
  );
}