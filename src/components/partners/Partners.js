import React, {useEffect, useState} from "react";
import '@splidejs/splide/dist/css/themes/splide-default.min.css'; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "./Partners.css";
import Card from "../card/Card";
import MobSlider from "../mobSlider/MobSlider";

function Partners() {
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
                        newCardArray.push(
                            <Card
                                item_image={"http://185.146.1.93:8000/"+data['restaurants'][i].image}
                                title={data['restaurants'][i].title + '1'}
                                id={data['restaurants'][i].id}
                                slug={"/restauran/" + data['restaurants'][i].slug}
                                tags={data['restaurants'][i].tags}
                                description={data['restaurants'][i].description}
                                key={i}
                                location={data['restaurants'][i].location}
                            />
                        );
                        newCardArray.push(
                            <Card
                                item_image={"http://185.146.1.93:8000/"+data['restaurants'][i].image}
                                title={data['restaurants'][i].title  + '2'}
                                id={data['restaurants'][i].id}
                                slug={"/restauran/" + data['restaurants'][i].slug}
                                tags={data['restaurants'][i].tags}
                                description={data['restaurants'][i].description}
                                key={i}
                                location={data['restaurants'][i].location}
                            />
                        );
                        newCardArray.push(
                            <Card
                                item_image={"http://185.146.1.93:8000/"+data['restaurants'][i].image}
                                title={data['restaurants'][i].title  + '3'}
                                id={data['restaurants'][i].id}
                                slug={"/restauran/" + data['restaurants'][i].slug}
                                tags={data['restaurants'][i].tags}
                                description={data['restaurants'][i].description}
                                key={i}
                                location={data['restaurants'][i].location}
                            />
                        );
                        newCardArray.push(
                            <Card
                                item_image={"http://185.146.1.93:8000/"+data['restaurants'][i].image}
                                title={data['restaurants'][i].title  + '4'}
                                id={data['restaurants'][i].id}
                                slug={"/restauran/" + data['restaurants'][i].slug}
                                tags={data['restaurants'][i].tags}
                                description={data['restaurants'][i].description}
                                key={i}
                                location={data['restaurants'][i].location}
                            />
                        );
                    }
                    setCardArray(newCardArray);
                })
                .catch((error) => {
                    console.error(error);
                });
        };

        fetchData();
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
