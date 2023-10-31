import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './MenuCarousel.css'
import close from '../../assets/close.png'
function MenuCarousel({ menus, onClose }) {
    return (
        <div className="menu-carousel">

            <div className="carousel-content">
                <Carousel>

                    {menus.map((menu, index) => (
                        <div key={index} className="image">
                            <div className="image1">
                                <div className="close_div" onClick={onClose}>
                                    <img src={close}/>
                                </div>
                                <img src={"https://api.reddel.kz"+menu.image} alt={menu.name} />
                            </div>
                        </div>
                    ))}
                </Carousel>

            </div>
        </div>
    );
}

export default MenuCarousel;
