import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Restauran.css";
import CartHeader from "../../components/cartHeader/CartHeader";
import CartMain from "../../components/cartMain/CartMain";
import MobileCartHeader from "../../components/mobileCartHeader/MobileCartHeader";
import MobileCartMain from "../../components/mobileCartMain/MobileCartMain";
import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';

import {useEffect, useState} from "react";

function Restauran() {
    const location = useLocation();

    let { id } = useParams();
    const [data,setData] = useState(0)
    let logo = 0
    useEffect( () => {
        console.log("THIS IS STATE : ")
        console.log(location.state)

        fetch("https://api.reddel.kz/api/get_restaurant_by_slug/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) =>{
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data1) =>{
                setData(data1.data)
                logo = data1.data.logo
                console.log(data1['logo'])
                const link = document.querySelector("link[rel~='icon']");
                link.href = "https://api.reddel.kz"+logo;
            })

    },[]);
  return (
    <div className="favorites">
      <div className="desk">
        <Header className='res' />
        <div className="main-content">
          <CartHeader title={data.title}
                      logo={"https://api.reddel.kz"+data.logo}
                      tags={data.tags}/>
          <CartMain description={data.description}
                    title={data.title}
                    item_image={"https://api.reddel.kz"+data.image}
                    images={data.images}
                    location={data.location}
                    phone_number={data.phone}
                    kitchen={data.kitchen}
                    average={data.average}
                    prices={data.prices}
                    menus={data.menus}
                    work_hours={data.work_hours}
                    slug={data.slug}
                    state={location.state}
          />
        </div>
      </div>
        <div className="mobile">
          <MobileCartHeader/>
          <MobileCartMain title={data.title}
                          insta={data.insta}
                          whatsapp={data.whatsapp}
                          images={data.images}
                          tags={data.tags}
                          logo={"https://api.reddel.kz"+data.logo}
                          description={data.description}
                          item_image={"https://api.reddel.kz"+data.image}
                          location={data.location}
                          phone_number={data.phone}
                          kitchen={data.kitchen}
                          average={data.average}
                          prices={data.prices}
                          menus={data.menus}
                          slug={id}
                          work_hours={data.work_hours}/>

        </div>
      <Footer />
    </div>
  );
}

export default Restauran;
