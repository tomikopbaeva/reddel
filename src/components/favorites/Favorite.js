import React, {useEffect, useState} from "react";
import "./Favorite.css";
import heart1 from "../../assets/heart1.svg";
import Card from "../card/Card";
import MobSlider from "../mobSlider/MobSlider";
import {useNavigate} from "react-router-dom";


function Favorite() {
    const [favoriteItems,setFavoriteItems] = useState([])
    const navigate = useNavigate ();

    useEffect(() => {
        fetch('https://surapid.kz/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'jwt': localStorage.getItem('accessToken')})
        })
            .then((response) => {
                if(response.status != 200){
                    navigate('/login')
                }
                return response.json()
            })
            .then((data) => {
                fetch('https://cloudpaymentsapi.kz/get_favourites/' + data.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then((response) => {
                        return response.json()
                    })
                    .then((data) => {
                        const newCardArray = [];
                        for (let i = 0; i < data['restaurants'].length; ++i) {
                            newCardArray.push(
                                <Card
                                    item_image={"https://cloudpaymentsapi.kz/"+data['restaurants'][i].image}
                                    title={data['restaurants'][i].title}
                                    id={data['restaurants'][i].id}
                                    slug={"/restauran/" + data['restaurants'][i].slug}
                                    tags={data['restaurants'][i].tags}
                                    description={data['restaurants'][i].description}
                                    key={i}
                                    logo={"https://cloudpaymentsapi.kz"+data['restaurants'][i].logo}
                                    location={data['restaurants'][i].location}
                                    isLiked={true}
                                />
                            );
                        }
                        setFavoriteItems(newCardArray);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

            })
            .catch((error) => {
                navigate('/login')
            })
    });
  return (
    <section className="favorite">
      <h2 className="h2">Избранное</h2>
      <div className="desk">
        {favoriteItems.length > 0 ? (
          <div className="favorite-item">
            {favoriteItems}
          </div>
        ) : (
          <div className="empty">
            <img className="favorite-img" src={heart1} alt="Избранное" />
            <p className="favorite-text">
              Здесь можно сохранять заведения, которые вам понравились и вы хотели бы посетить
            </p>
            <button className="favorite-button card-button">Перейти в каталог</button>
          </div>
        )}
      </div>
      <MobSlider cardArray={favoriteItems} />
    </section>
  );
}

export default Favorite;
