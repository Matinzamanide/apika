"use client";
import { IProduct } from "@/Types/Types";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import SectionHeader from "../SectionSeperator/SectionSeperator";
import { GitPullRequest } from "lucide-react";
const NewestProduct = () => {
  const [data, setData] = useState<IProduct[]>([]);
  useEffect(() => {
    axios("http://localhost/apitak/get_products.php").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <div className="">
                    <SectionHeader title="جدیدترین محصولات" icon={<GitPullRequest />} linkHref="HouseholdPump"/>

      <div className="w-[95%] mx-auto">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          speed={600}
          navigation={true}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {data.map((item,i) => {
            return  <SwiperSlide key={i}> <ProductCard {...item} /></SwiperSlide>;
          })}
        </Swiper>


        <style jsx global>{`
        .swiper-button-prev,
        .swiper-button-next {
          background: white;
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
          color: #222;
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 14px;
          font-weight: bold;
        }

        .swiper-button-prev {
          left: -10px;
        }

        .swiper-button-next {
          right: -10px;
        }

        @media (max-width: 640px) {
          
        }
      `}</style>
      </div>
    </div>
  );
};

export default NewestProduct;
