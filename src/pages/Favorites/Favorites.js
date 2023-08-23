import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Favorite from "../../components/favorites/Favorite";
import "./Favorites.css";

function Favorites() {
  return (
    <div className="favorites">
      <Header />
      <div className="main-content">
        <Favorite />
      </div>
      <Footer />
    </div>
  );
}

export default Favorites;
