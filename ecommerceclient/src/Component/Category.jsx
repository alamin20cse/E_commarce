

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import p1 from '../assets/1.webp'
import p2 from '../assets/2.webp'
import p3 from '../assets/3.webp'
import p4 from '../assets/4.avif'
import p5 from '../assets/5.webp'



// import required modules
import { Pagination } from 'swiper/modules';
import SectionTitle from '../Shared/SectionTitle';


const Category = () => {
    return (


<section className='py-10'>
    
       <SectionTitle heading="From 10 AM to 10 PM" subheading="Order online" />
        <div className=''>
            
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide><img src={p1} alt=""  />
        <h3 className='text-4xl uppercase text-center -mt-32 pb-16 text-white text-shadow-2xs'>Fashion</h3>
         </SwiperSlide>
        <SwiperSlide><img src={p2} alt=""  />  <h3 className='text-4xl uppercase text-center -mt-32  text-white text-shadow-2xs'>Electronics</h3></SwiperSlide>
        <SwiperSlide><img src={p3} alt=""  /> <h3 className='text-4xl uppercase text-center -mt-32  text-white text-shadow-2xs'>HomeKitchen</h3> </SwiperSlide>
        <SwiperSlide><img src={p4} alt=""  /> <h3 className='text-4xl uppercase text-center -mt-32  text-white text-shadow-2xs'>Beauty</h3> </SwiperSlide>
        <SwiperSlide><img src={p5} alt=""  />  <h3 className='text-4xl uppercase text-center -mt-32  text-white text-shadow-2xs'>Stationery</h3></SwiperSlide>
        
      </Swiper>
  
            
        </div>
</section>
    );
};

export default Category;