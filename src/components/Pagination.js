import '../style/Pagination.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'

export default function Pagination({ goToPrevPage, goToNextPage }) {
  return (
    <div className="pagination">
      <div className='pgn-btn-wrap'>

        <button className='pgn-left-btn' onClick={goToPrevPage}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} size='1x' />
        </button> 
        <button className='pgn-right-btn' onClick={goToNextPage}>
          <FontAwesomeIcon icon={faLongArrowAltRight} size='1x' />
        </button>
      </div>
    </div>
  );
}