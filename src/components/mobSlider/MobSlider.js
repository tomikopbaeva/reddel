import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Card from '../card/Card';

function MobSlider({ cardArray }) {  
    return (
        <div className='mob'>
            <Splide options={{
                // type: 'loop',
                drag: 'free',
                focus: 'start',
                perPage: 3,
                arrows: false,
                pagination: false,
                fixedWidth: '240px',
            }}>
                {cardArray.map((res) => <SplideSlide>{res}</SplideSlide>)}
            </Splide>
        </div>
    );
  }
  
export default MobSlider;
  