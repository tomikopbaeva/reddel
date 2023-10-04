import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Restauran.css";
import CartHeader from "../../components/cartHeader/CartHeader";
import CartMain from "../../components/cartMain/CartMain";
import MobileCartHeader from "../../components/mobileCartHeader/MobileCartHeader";
import MobileCartMain from "../../components/mobileCartMain/MobileCartMain";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";

function Restauran() {
    let { id } = useParams();
    const [data,setData] = useState(0)
    useEffect( () => {
        fetch("https://cloudpaymentsapi.kz/get_restaurant_by_slug/" + id, {
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
            .then((data) =>{
                setData(data.data)
                console.log(data.data.images)
            })
    },[]);
  return (
    <div className="favorites">
      <div className="desk">
        <Header className='res' />
        <div className="main-content">
          <CartHeader title={data.title}
                      logo={"https://cloudpaymentsapi.kz"+data.logo}
                      tags={data.tags}/>
          <CartMain description={data.description}
                    title={data.title}
                    item_image={"https://cloudpaymentsapi.kz"+data.image}
                    images={data.images}
                    location={data.location}
                    phone_number={data.phone}
                    kitchen={data.kitchen}
                    average={data.average}
                    prices={data.prices}
                    menus={data.menus}
          />
        </div>
      </div>
        <div className="mobile">
          <MobileCartHeader/>
          <MobileCartMain title={data.title}
                          images={data.images}
                          tags={data.tags}
                          logo={"https://cloudpaymentsapi.kz"+data.logo}
                          description={data.description}
                          item_image={"https://cloudpaymentsapi.kz"+data.image}
                          location={data.location}
                          phone_number={data.phone}
                          kitchen={data.kitchen}
                          average={data.average}
                          prices={data.prices}
                          menus={data.menus}/>
        </div>
      <Footer />
    </div>
  );
}

export default Restauran;
