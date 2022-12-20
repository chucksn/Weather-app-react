import FutureWeatherCard from "./futureWeatherCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Navigation } from "swiper";
import "../styles/index.css";
import { useContext } from "react";
import { FWeatherContext } from "./currentWeather";
import { icons } from "../weatherIcon";

function FutureWeatherSlides() {
  const myContext = useContext(FWeatherContext);
  let fWeather = myContext.value1;
  let unit = myContext.value2;
  let dateFormat = myContext.value3;
  let amPmFormat = myContext.value4;
  let futureWeatherList = fWeather.list;
  console.log("lv 3:", fWeather);

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
          {/* {futureWeatherList.map((card, index) => (
            <SwiperSlide>
              <FutureWeatherCard
                key={index}
                fTemp={parseInt(card.main.temp)}
                fTempSymbol={unit.tempUnitSymbol}
                fDate={dateFormat(new Date(card.dt * 1000))}
                fTime={amPmFormat(new Date(card.dt * 1000))}
                fIcon={icons[card.weather[0].icon]}
              />
            </SwiperSlide>
          ))} */}
        </Swiper>
      </div>
    </div>
  );
}

export default FutureWeatherSlides;
