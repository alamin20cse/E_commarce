
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import p1 from '../assets/1.webp'
import p2 from '../assets/2.webp'
import p3 from '../assets/3.webp'
import p4 from '../assets/4.avif'
import p5 from '../assets/5.webp'
import p6 from '../assets/6.avif'

const Bannar = () => {
    return (
        <div>
            <Carousel showArrows={true} autoPlay={true} infiniteLoop={true}>
                <div>
                    <img src={p1} alt="Slide 1" />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img src={p2} alt="Slide 2" />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img src={p3} alt="Slide 3" />
                    <p className="legend">Legend 3</p>
                </div>
                <div>
                    <img src={p4} alt="Slide 4" />
                    <p className="legend">Legend 4</p>
                </div>
                <div>
                    <img src={p5} alt="Slide 5" />
                    <p className="legend">Legend 5</p>
                </div>
                <div>
                    <img src={p6} alt="Slide 6" />
                    <p className="legend">Legend 6</p>
                </div>
            </Carousel>
        </div>
    );
};

export default Bannar;