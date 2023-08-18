import Header from "../../components/header/Header";
import Banner from "../../components/banner/Banner";
import "./Main.css";

function Main() {
  return (
    <div className="main">
      <Header />
      <div className="main-content">
        <Banner />
      </div>
    </div>
  );
}

export default Main;
