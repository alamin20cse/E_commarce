import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import FoodCard from "./FoodCard";

const OrderTab = ({ items }) => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="grid md:grid-cols-3 gap-10">
                        {items.map(item => (
                            <FoodCard key={item.id} item={item} />
                        ))}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default OrderTab;
