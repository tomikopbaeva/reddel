import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Profiles from "../../components/profile/Profiles";
import "./Profile.css";

function Profile() {
  return (
    <div className="favorites">
      <Header />
      <div className="main-content">
        <Profiles />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
