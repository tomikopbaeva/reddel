import './Banner2.css'; 
import point from '../../assets/point.svg';
import whatsapp from '../../assets/whatsapp3.svg';
import { useTranslation } from "react-i18next"

function Banner() {
    const {t, i18n} = useTranslation();

    return (
    <div className="banner2">
        <div className="banner2-header">
            <img src={point} alt="!" />
            <h5>{t("Не нашли свое любимое заведение в списке?  Напишите нам")} </h5>
        </div>
        <div className="banner2-contacts">
            <a href="https://wa.me/77077528313"><img src={whatsapp} className='desk' alt="whatsapp" /></a>
            <a href="https://wa.me/77077528313">
                <button className="banner2-button">{t("Заполнить заявку")}</button>
            </a>
        </div>
    </div>
);
}

export default Banner;
