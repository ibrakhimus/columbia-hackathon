import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../App.css'

const Searchbar = () => {
    return (
            <div class="search__container search__container--landing">
                <input class="search__input" type="text" placeholder="Ex: Cars 3" onchange ="onSearchChange(event)"></input>
                <button class="search__btn" name='movieName'>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
    );
}

export default Searchbar;
