import React, {useEffect, useState} from "react";
import '@splidejs/splide/dist/css/themes/splide-default.min.css'; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "./Partners.css";
import Card from "../card/Card";
import MobSlider from "../mobSlider/MobSlider";

function Partners() {
    const [cardArray, setCardArray] = useState([]);

    useEffect(() => {
        fetch('https://api.reddel.kz/api/getAllRestaurants', {
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
                    newCardArray.push(
                        <Card
                            item_image={"https://api.reddel.kz"+data['restaurants'][i].image}
                            title={data['restaurants'][i].title}
                            id={data['restaurants'][i].id}
                            slug={"/restauran/" + data['restaurants'][i].slug}
                            tags={data['restaurants'][i].tags}
                            description={data['restaurants'][i].description}
                            key={i}
                            logo={"https://api.reddel.kz"+data['restaurants'][i].logo}
                            location={data['restaurants'][i].location}
                        />
                    );
                }
                setCardArray(newCardArray);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

  return (
    <section className="partners">
      <div className="partners-header">
        <span>NEW!</span>
        <h2 className="h2">Новые партнеры</h2>
      </div>
      <div className='desk'>
        <div className="partners-list">{cardArray}</div>
      </div>
      <MobSlider cardArray={cardArray} />
    </section>
  );
}

export default Partners;
