import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Profiles from "../../components/profile/Profiles";
import "./Profile.css";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

function Profile() {
    const navigate = useNavigate ();

    let [user, setUser] = useState({
        "email": "",
        "firstName": "",
        "lastName": "",
        "username": ""
    });
    useEffect(() => {
        console.log(localStorage.getItem('accessToken') + " token")
        fetch('http://86.107.44.200:8076/api/v1/users/' + localStorage.getItem('userId'), {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken') // Correct the 'Bearer_' to 'Bearer '
            }
        })
            .then((response) => {
                // Check if the response status code indicates success (status code 200)
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                setUser(data);
                console.log(user.firstName)
                console.log(data);
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
        <Profiles user={user}/>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
