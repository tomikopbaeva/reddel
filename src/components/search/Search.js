import React, {useEffect, useState} from 'react';
import './Search.css'; 
import search from '../../assets/Search2.svg';
import arrow from "../../assets/arrow.svg";

function Search({ placeholder}) {
    const [searchValue, setSearchValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [suggestions, setSuggestions] =useState(null);
    let i = 0;
    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);

        // Filter suggestions based on the input value
        const filtered = suggestions.filter((suggestion) =>
            suggestion.title.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredSuggestions(filtered);
    };
    useEffect(() => {
        fetch('https://surapid.kz/api/getAllRestaurants', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // console.log(data)
                setSuggestions(data['restaurants']);
                // console.log(data['restaurants'])
                // console.log(++i)
            })
    });

    return (
        <div className="search1">
            <div className="search">
                <img src={search} alt="" />
                <input
                    className="search-input"
                    type="text"
                    placeholder={placeholder}
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </div>
            { searchValue ? (
            <div className="dropdown">
                {filteredSuggestions.filter(item => {
                    return searchValue && (item.title.toLowerCase().includes(searchValue.toLowerCase()))
                }).map((suggestion, index) => (
                    <a href={"/restauran/" + suggestion.slug} key={index} className="card_search">
                        <img className="image_search" src={"https://surapid.kz" + suggestion.image} width="80px" height="40px"></img>
                        <p className="title">{suggestion.title}</p>
                        <img src={arrow} alt="" />
                    </a>
                ))}
            </div>) : (<a></a>)
            }
        </div>
    );
}

export default Search;
