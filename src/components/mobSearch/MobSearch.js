import React from "react";
import "./MobSearch.css";
import Search from "../../components/search/Search";
import myata from "../../assets/myata.png";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import image from "../../assets/image.png";
import arrow from "../../assets/arrow.svg";


function MobSearch() {
    const cardArray = [1,2,3,4];

  return (
    <section className="mob-search">
        <div className="mob-search-title">
            <h2>Поиск</h2>
            <Search placeholder = "Название заведения или категория"/>
        </div>
        <div className="mob-search-main">
            <h2>Популярные места</h2>
            <div className="mob-search-main-blocks">
                <Splide options={{
                type: 'loop',
                drag: 'free',
                focus: 'start',
                perPage: 4,
                arrows: false,
                pagination: false,
                fixedWidth: '80px',
                }}>
                    {cardArray.map((res) =>
                    <SplideSlide>
                        <div key={res.id} {...res} className="mob-search-main-block">
                            <img src={myata} alt="" />
                            <span>Мята Lounge</span>
                        </div>
                    </SplideSlide>)}
                </Splide>
            </div>
            <div className="mob-search-main-res">
                <h2>Результаты поиска</h2>
                <div className="mob-search-main-res-block shadow">
                    <div>
                        <img src={image} alt="" />
                        <h4>Название заведения</h4>
                    </div>
                    <img src={arrow} alt="" />
                </div>
            </div>
        </div>

    </section>
  );
}

export default MobSearch;
