import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../App.css'

const Searchbar = ({search, setSearch, nav_funct }) => {

    const [localSearch, setLocalSearch] = useState(search)

    // const onClick = () = {
    //     setSearch()
    // }
    return (
        <div className="search__container">
          <div style={{ position: 'relative' }}>
            <input 
              className="search__input" 
              type="text" 
              placeholder="DACA Act" 
              defaultValue={localSearch} 
              onChange={(e) => setLocalSearch(e.target.value)}
            />
            <FontAwesomeIcon 
              icon={faSearch} 
              style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer', padding: '5px', fontSize: '3rem', marginRight: '20px'}} 
              onClick={() => {
                if (nav_funct) {
                  setSearch(localSearch);
                  nav_funct();
                } else {
                  setSearch(localSearch);
                }
              }}
            />
          </div>
        </div>
      );
}

export default Searchbar;
