import React from "react";
import '@splidejs/splide/dist/css/themes/splide-default.min.css'; 
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "./Partners.css";
import Card from "../card/Card";

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
      <div className='mob'>
            <Splide options={{
                type: 'loop',
                drag: 'free',
                focus: 'start',
                perPage: 2,
                arrows: false,
                pagination: false,
                fixedWidth: '218px',
            }}>
                {cardArray.map((card) => <SplideSlide><Card key={card.id} {...card}/></SplideSlide>)}
            </Splide>
      </div>
    </section>
  );
}

export default Partners;
