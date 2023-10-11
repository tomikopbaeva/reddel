import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MobSearch from "../../components/mobSearch/MobSearch";
import {useEffect} from "react";
// import "./MobileSearch.css";


function MobileSearch() {
    useEffect(() => {
        document.title = 'Reddel.kz'; // Set the page title here
    }, []);
  return (
    <div className="favorites">
        <Header/>
        <div className="mob">
            <MobSearch/>
        </div>
      <Footer />
    </div>
  );
}

export default MobileSearch;
