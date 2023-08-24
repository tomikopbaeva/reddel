import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import "./Restauran.css";
import CartHeader from "../../components/cartHeader/CartHeader";
import CartMain from "../../components/cartMain/CartMain";
import MobileCartHeader from "../../components/mobileCartHeader/MobileCartHeader";
import MobileCartMain from "../../components/mobileCartMain/MobileCartMain";

function Restauran() {
  return (
    <div className="favorites">
      <div className="desk">
        <Header className='res' />
        <div className="main-content">
          <CartHeader />
          <CartMain />
        </div>
      </div>
        <div className="mobile">
          <MobileCartHeader/>
          <MobileCartMain/>
        </div>
      <Footer />
    </div>
  );
}

export default Restauran;
