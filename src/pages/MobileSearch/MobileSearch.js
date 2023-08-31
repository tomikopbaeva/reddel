import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import MobSearch from "../../components/mobSearch/MobSearch";
// import "./MobileSearch.css";


function MobileSearch() {
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
