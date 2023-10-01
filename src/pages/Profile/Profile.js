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
        fetch('http://86.107.44.200:8075/api/v1/users/' + localStorage.getItem('userId'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
            }
        })
            .then((response) => {
                if(!response.ok)
                    navigate('/login')
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setUser(data);
            })
            .catch((error) => {
                console.error(error); // Handle any errors that occurred during the fetch
                navigate('/login')
            });
    }, []);
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
