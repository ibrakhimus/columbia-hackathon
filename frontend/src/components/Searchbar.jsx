import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../App.css'

const Searchbar = ({setSearch}) => {

    const [localSearch, setLocalSearch] = useState("")
     
    // const onClick = () = {
    //     setSearch()
    // }
    return (
        
            <div className="search__container">
                <input className="search__input" type="text" placeholder="Ex: Cars 3" onChange ={(e) =>setLocalSearch(e.target.value)}></input>
                <button className="search__btn" name='movieName' onClick = {() => {setSearch(localSearch)}}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
    );
}

export default Searchbar;
