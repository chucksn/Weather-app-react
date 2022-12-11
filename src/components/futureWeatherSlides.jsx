import FutureWeatherCard from "./futureWeatherCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Navigation } from "swiper";
import "../styles/index.css";

function FutureWeatherSlides() {
  return (
    <div className="outer-swiper-container">
      <i className="fa-solid fa-chevron-right"></i>
      <i className="fa-solid fa-chevron-left"></i>
      <div className="inner-swiper-container">
        <Swiper
          //   slidesPerView={6}
          spaceBetween={50}
          modules={[Navigation]}
          navigation={{
            nextEl: ".fa-chevron-right",
            prevEl: ".fa-chevron-left",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            1900: { slidesPerView: 8 },
            1710: { slidesPerView: 7 },
            1480: { slidesPerView: 6 },
            1240: { slidesPerView: 5 },
            1010: { slidesPerView: 4 },
            778: { slidesPerView: 3 },
            680: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
          <SwiperSlide>
            <FutureWeatherCard />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default FutureWeatherSlides;
