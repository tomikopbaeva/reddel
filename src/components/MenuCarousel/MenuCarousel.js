import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './MenuCarousel.css'
function MenuCarousel({ menus, onClose }) {
    return (
        <div className="menu-carousel">

            <div className="carousel-content">
                <Carousel>

                    {menus.map((menu, index) => (
                        <div key={index} className="image">
                            <div className="image1">
                                <img src={"https://cloudpaymentsapi.kz"+menu.image} alt={menu.name} />
                            </div>
                        </div>
                    ))}
                </Carousel>
                <div className="close-button" onClick={onClose}>
                    <p>закрыть</p>
                </div>
            </div>
        </div>
    );
}

export default MenuCarousel;
