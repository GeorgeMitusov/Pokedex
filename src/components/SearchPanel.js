import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import '../style/SearchPanel.scss';

export default function SearchPanel({ searchValue, pokemonSearch }) {
  return (
    <div className='search-panel'>
      <div className="searchBox">
        <input 
          className="searchInput"
          placeholder='Look for a precise pokemon'
          value={searchValue}
          onChange={e => pokemonSearch(e)}
        />
        <button className="searchButton" href="#">
            <i className="material-icons">
              <FontAwesomeIcon icon={faSearch} size='1x' />
            </i>
        </button>
      </div>
    </div>
  );
}