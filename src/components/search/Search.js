import React, { useState } from 'react';
import './Search.css'; 
import search from '../../assets/Search2.svg';

function Search({ placeholder}) {
  return (
    <div className="search">
        <img src={search} alt="" />
        <input className='search-input' type="text" placeholder={placeholder} />
    </div>
  );
}

export default Search;
