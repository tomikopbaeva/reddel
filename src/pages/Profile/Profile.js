import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Profiles from "../../components/profile/Profiles";
import "./Profile.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate ();
    const [certificateArray, setCertificateArray] = useState([]);
    let [user, setUser] = useState({
        "email": "",
        "firstName": "",
        "lastName": "",
        "username": ""
    });
    useEffect(() => {
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
            })
            .catch((error) => {
                navigate('/login')
            })
        });
  return (
    <div className="favorites">
      <Header />
      <div className="main-content">
        <Profiles user={user} certificates={certificateArray}/>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
