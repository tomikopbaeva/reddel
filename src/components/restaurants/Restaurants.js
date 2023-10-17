import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import './Restaurants.css';
import Card from '../card/Card';
import MobSlider from '../mobSlider/MobSlider';
import "../../components/categories/Сategories.css";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { useParams } from 'react-router-dom';

function Restaurants() {
    const [shownCount, setShownCount] = useState(9); // Initially, show 9 elements
    const [cardArray, setCardArray] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Все"); // Default to "Все" category
    const [categories, setCategories] = useState([
        "Все",
        "Рестораны и бары",
        "Тойхана",
        "Зоны отдыха",
        "Караоке",
        "Салоны красоты"
    ]);

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
                setCategories(data['tags'])
                const newCardArray = data['restaurants'].map((restaurant, index) => (
                    <Card
                        item_image={"https://surapid.kz" + restaurant.image}
                        title={restaurant.title}
                        id={restaurant.id}
                        slug={"/restauran/" + restaurant.slug}
                        tags={restaurant.tags}
                        description={restaurant.description}
                        key={index}
                        location={restaurant.location}
                        logo={"https://surapid.kz"+restaurant.logo}
                    />
                ));
                setCardArray(newCardArray);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const handleShowAll = () => {
        setShownCount(100); // When clicking the button, show all 100 elements
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Filter cards based on selected category
    const filteredCards = selectedCategory === "Все"
        ? cardArray
        : cardArray.filter((card) => card.props.tags.includes(selectedCategory));

    return (
        <section className='place'>
            <div className="categories">
                <h2 className="h2">Категории</h2>
                <div className="desk">
                    <div className="categories-list">
                        {categories.map((category, index) => (
                            <span
                                key={index}
                                style={selectedCategory === category ? {backgroundColor: "#91A3E2"} : {}}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="mob">
                    <Splide options={{
                        // type: 'loop',
                        drag: 'free',
                        focus: 'start',
                        perPage: 4,
                        arrows: false,
                        pagination: false,
                        fixedWidth: 'default',
                        gap: '6px',
                    }}>
                        {categories.map((category, index) => (
                            <SplideSlide key={index}>
                                <div className="categories-list">
                                    <span
                                        style={selectedCategory === category ? {backgroundColor: "#91A3E2"} : {}}
                                        onClick={() => handleCategoryChange(category)}
                                    >
                                        {category}
                                    </span>
                                </div>
                            </SplideSlide>
                        ))}
                    </Splide>
                </div>
            </div>
            <div className='place-header'>
                <h2 className='h2'>Заведения</h2>
                <button className='place-button' onClick={handleShowAll}>Показать все</button>
            </div>
            <div className='desk'>
                <div className='place-list'>
                    {filteredCards}
                </div>
            </div>
            <MobSlider cardArray={filteredCards} />
        </section>
    );
}

export default Restaurants;

