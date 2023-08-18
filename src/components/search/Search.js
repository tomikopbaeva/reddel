import React, { useState } from 'react';
import './Search.css'; 
import search from '../../assets/Search.svg';

function Search() {
  return (
    <div className="search">
        <img src={search} alt="" />
        <input type="text" placeholder="Я ищу..." />
    </div>
  );
}

export default Search;
