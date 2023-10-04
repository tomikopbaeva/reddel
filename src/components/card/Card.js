import React, {useEffect, useState} from 'react';
import './Card.css'; 
import {Link, useNavigate} from 'react-router-dom';


import Regtangle from '../../assets/Rectangle.png';
import location from '../../assets/location2.svg';
import hearts from '../../assets/heart.svg';
import heart3 from '../../assets/heart3.svg';

import image from '../../assets/image.png';
import error from "../error/Error";

function Card(props) {
    const [isLiked, setIsLiked] = useState(props.isLiked);
    const navigate = useNavigate();
    const handleLikeClick = (id: any) => {
        console.log(id)
        if(!localStorage.getItem('userId') || !localStorage.getItem('accessToken'))
            navigate("/profile")
        else
        try {
            fetch('http://86.107.44.200:8076/api/v1/users/' + localStorage.getItem('userId'), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
                }
            })
                .then((response) => {
                    fetch("http://185.146.1.93:8000/add_to_favorite/" + localStorage.getItem('userId') + "/" + id, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                        .then((response) => {
                            console.log("OK")
                            setIsLiked(!isLiked);
                        })
                })
        } catch (error) {
            console.log("ERROR")
            navigate('/profile')
        }

    };

  return (
    <div className={`card ${isLiked ? 'liked' : ''}`}>
      <span className='card-header'>0-0-6</span>
      <img src={props.item_image} alt="random" />
      <div className='tags'>
          {props.tags && props.tags.map((item, index) => (
              <span key={index} className='tag'><p>{item}</p></span>
          ))}
      </div>
        <Link to={props.slug} className="card-body">
          <img src={props.logo} alt="" width="50px"/>
          <h3>{props.title} </h3>
        </Link>
        <Link to={props.slug} className="card-text">{props.description}</Link>
        <Link to={props.slug} className="location">
          <img src={location} alt="random" />
          <span>{props.location}</span>
        </Link>
      <div className="card-footer">
        <button className={`card-button ${isLiked ? 'liked' : ''}`} onClick={() => handleLikeClick(props.id)}>
          <img src={isLiked ? heart3 : hearts} alt="heart" />
        </button>
        <Link to={props.slug} className="card-button">
          <button className="card-button">Посетить в рассрочку</button>
        </Link>
      </div>
    </div>
  );
}

export default Card;
