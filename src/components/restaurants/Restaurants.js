import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import React, { useEffect, useState } from 'react';
import './Restaurants.css';
import Card from '../card/Card';
import MobSlider from '../mobSlider/MobSlider';
import { useParams } from 'react-router-dom';


function Restaurants() {
    const [shownCount, setShownCount] = useState(9); // Initially, show 9 elements
    const [cardArray, setCardArray] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            fetch('http://185.146.1.93:8000/getAllRestaurants', {
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
                    const newCardArray = [];
                    for (let i = 0; i < data['restaurants'].length; ++i) {
                        console.log("127.0.0.1:8000"+data['restaurants'][i].image)
                        newCardArray.push(
                            <Card
                                item_image={"http://185.146.1.93:8000/"+data['restaurants'][i].image}
                                title={data['restaurants'][i].title}
                                id={data['restaurants'][i].id}
                                slug={"/restauran/" + data['restaurants'][i].slug}
                                tags={data['restaurants'][i].tags}
                                description={data['restaurants'][i].description}
                                key={i}
                                location={data['restaurants'][i].location}
                            />
                        );
                    }
                    console.log(newCardArray)
                    setCardArray(newCardArray);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchData();
    }, []);

    const handleShowAll = () => {
        setShownCount(100); // When clicking the button, show all 100 elements
    };

    return (
        <section className='place'>
            <div className='place-header'>
                <h2 className='h2'>Заведения</h2>
                <button className='place-button' onClick={handleShowAll}>Показать все</button>
            </div>
            <div className='desk'>
                <div className='place-list'>
                    {cardArray.slice(0, shownCount)}
                </div>
            </div>
            <MobSlider cardArray={cardArray} />
        </section>
    );
}

export default Restaurants;
