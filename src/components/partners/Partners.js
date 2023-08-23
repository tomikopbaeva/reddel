import React from "react";
import '@splidejs/splide/dist/css/themes/splide-default.min.css'; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "./Partners.css";
import Card from "../card/Card";
import MobSlider from "../mobSlider/MobSlider";

function Partners() {
  const cardArray = [];
  for (let i = 0; i < 3; i++) {
    cardArray.push(<Card key={i} />);
  }

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
