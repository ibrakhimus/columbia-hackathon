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
            <input className="search__input" type="text" placeholder="Ex: Cars 3" defaultValue = {localSearch} onChange={(e) => setLocalSearch(e.target.value)}></input>
            <button
                className="search__btn"
                name='movieName'
                onClick={() => {
                    if (nav_funct) {
                        setSearch(localSearch);
                        nav_funct();
                    } else {
                        setSearch(localSearch);
                    }
                }}
            >

                <FontAwesomeIcon icon={faSearch} />
            </button>
        </div>
    );
}

export default Searchbar;
