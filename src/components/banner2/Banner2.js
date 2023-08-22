import './Banner2.css'; 
import point from '../../assets/point.svg';
import whatsapp from '../../assets/whatsapp3.svg';

function Banner() {
  return (
    <div className="banner2">
        <div className="banner2-header">
            <img src={point} alt="!" />
            <h5>Не нашли свое любимое заведение в списке?  Напишите нам </h5>
        </div>
        <div className="banner2-contacts">
            <img src={whatsapp} className='desk' alt="whatsapp" />
            <button className="banner2-button">Заполнить заявку</button>
        </div>
    </div>
  );
}

export default Banner;
