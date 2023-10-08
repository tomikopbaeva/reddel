import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Profiles from "../../components/profile/Profiles";
import "./Profile.css";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Card from "../../components/card/Card";

function Profile() {
    const navigate = useNavigate ();
    const [certificateArray, setCertificateArray] = useState([]);
    const [restaurants, setRestaurants] = useState([])
    let [user, setUser] = useState({
        "email": "",
        "firstName": "",
        "lastName": "",
        "username": ""
    });
    useEffect(() => {
        fetch('https://surapid.kz/api/getAllRestaurants', {
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
                console.log(data)
                setRestaurants(data['restaurants']);
            })
            .catch((error) => {
                console.error(error);
            });
        console.log(localStorage.getItem('accessToken'))
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
                console.log(data)
                setUser(data)
                fetch('https://86.107.44.200:9000/api/get_certificates_by_id/' + data.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(r => {
                    return r.json()
                })
                    .then(data => {
                        console.log(data.certificates)
                        setCertificateArray(data.certificates)
                    })
            })
            .catch((error) => {
                navigate('/login')
            })
        }, []);
  return (
    <div className="favorites">
      <Header />
      <div className="main-content">
        <Profiles user={user} restaurants={restaurants} certificates={certificateArray}/>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
