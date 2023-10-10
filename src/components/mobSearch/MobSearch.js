import React, {useEffect, useState} from "react";
import "./MobSearch.css";
import myata from "../../assets/myata.png";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import image from "../../assets/image.png";
import arrow from "../../assets/arrow.svg";
import search from '../../assets/Search2.svg';


function MobSearch() {
    const cardArray = [1,2,3,4];
    const [searchValue, setSearchValue] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [suggestions, setSuggestions] =useState([]);
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
                setSuggestions(data['restaurants']);
            })
    }, []);

  return (
    <section className="mob-search">
        <div className="mob-search-title">
            <h2>Поиск</h2>
            {/*<Search placeholder={"Название заведения или категории"} />*/}
            <div className="search">
                <img src={search} alt="" />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Название заведения или категории"
                    value={searchValue}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
        <div className="mob-search-main">
            <h2>Популярные места</h2>
            <div className="mob-search-main-blocks">
                <Splide options={{
                // type: 'loop',
                drag: 'free',
                focus: 'start',
                perPage: 4,
                arrows: false,
                pagination: false,
                fixedWidth: '90px',
                }}>
                    {suggestions.map((suggestion, index) => (
                    <SplideSlide>
                        <a href={"restauran/" + suggestion.slug} className="mob-search-main-block">
                            <div className="storimage">
                                <img src={"https://surapid.kz"+suggestion.logo} alt="" width="80px"/>
                            </div>
                            <span>{suggestion.title}</span>
                        </a>
                    </SplideSlide>))
                    }
                </Splide>
            </div>
            <div className="mob-search-main-res">
                <h2>Результаты поиска</h2>
                {filteredSuggestions.filter(item => {
                    return searchValue && (item.title.toLowerCase().includes(searchValue.toLowerCase()))
                }).map((suggestion, index) => (
                <a href={"/restauran/" + suggestion.slug} className="mob-search-main-res-block shadow">
                    <div>
                        <img className="image" src={"https://cloudpaymentsapi.kz" + suggestion.image} width="80px" height="40px" alt="" />
                        <h4>{suggestion.title}</h4>
                    </div>
                    <img src={arrow} alt="" />
                </a>
                ))}
            </div>
        </div>

    </section>
  );
}

export default MobSearch;
