import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../App.css'

const Searchbar = () => {
    return (
            <div className="search__container">
                <input className="search__input" type="text" placeholder="Ex: Cars 3" onChange ="onSearchChange(event)"></input>
                <button className="search__btn" name='movieName'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
    );
}

export default Searchbar;
