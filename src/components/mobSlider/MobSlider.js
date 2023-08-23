import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import Card from '../card/Card';

function MobSlider({ cardArray }) {  
    return (
        <div className='mob'>
            <Splide options={{
                type: 'loop',
                drag: 'free',
                focus: 'start',
                perPage: 3,
                arrows: false,
                pagination: false,
                fixedWidth: '218px',
            }}>
                {cardArray.map((res) => <SplideSlide><Card key={res.id} {...res}/></SplideSlide>)}
            </Splide>
        </div>
    );
  }
  
export default MobSlider;
  