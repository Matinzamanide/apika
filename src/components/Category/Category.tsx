'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SquarePlus } from 'lucide-react';

const CategorySlider = () => {
  const data = [
    {
      name: 'الکتروموتور',
      src: 'https://rahabsanat.ir/wp-content/uploads/2017/04/ABBEMotor-100x100.jpg',
    },
    {
      name: 'بوستر پمپ',
      src: 'https://rahabsanat.ir/wp-content/uploads/2016/12/ImageHandler-100x100.png',
    },
    {
      name: 'پمپ شناور',
      src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-12-100x100.jpg',
    },
    {
      name: 'پمپ لجن کش',
      src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-11-100x100.png',
    },
    {
      name: 'دوزینگ پمپ',
      src: 'https://rahabsanat.ir/wp-content/uploads/2019/12/dosing-pump-500-100x100.jpg',
    },
    {
      name: 'گیربکس حلزونی',
      src: 'https://rahabsanat.ir/wp-content/uploads/2024/05/halezooni-gearbox-fav.webp',
    },
    {
      name: 'الکترو پمپ',
      src: 'https://rahabsanat.ir/wp-content/uploads/2016/10/ImageHandler-8-100x100.jpg',
    },
  ];

  return (
    <div className="w-[95%] mx-auto my-10 relative">
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
        {data.map((item, i) => (
          <SwiperSlide key={i}>
            <div className="bg-white rounded-xl py-3 shadow hover:shadow-lg transition duration-300 text-center flex flex-col items-center justify-between group h-full">
              <Link href="/" className="flex flex-col items-center gap-2">
                <div className="bg-gray-100 p-3 rounded-full hover:scale-105 transition">
                  <Image
                    width={70}
                    height={60}
                    alt={item.name}
                    src={item.src}
                    className="rounded-full"
                  />
                </div>
                <p className="font-medium text-gray-900 group-hover:text-blue-400">{item.name}</p>
              </Link>

              {/* آیکون + با انیمیشن مشاهده */}
              <div className="relative mt-2 w-20 h-8">
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-50 group-hover:opacity-0">
                <SquarePlus size={19} className='text-gray-400' />                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <span className="text-[12px] flex items-center font-medium bg-blue-500 text-white py-1 px-3 cursor-pointer rounded">
                    <span className='ml-2'>مشاهده</span>
                    <SquarePlus size={19} />
                  </span>
                </div>
              </div>
              
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* سفارشی‌سازی فلش‌ها */}
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
  );
};

export default CategorySlider;

// 'use client';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation, Autoplay } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
// import { Eye } from 'lucide-react'; // Changed from SquarePlus to Eye for "View"

// const CategorySlider = () => {
//   const data = [
//     {
//       name: 'الکتروموتور',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/04/ABBEMotor-100x100.jpg',
//       link: '/categories/electromotor',
//     },
//     {
//       name: 'بوستر پمپ',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2016/12/ImageHandler-100x100.png',
//       link: '/categories/booster-pump',
//     },
//     {
//       name: 'پمپ شناور',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-12-100x100.jpg',
//       link: '/categories/submersible-pump',
//     },
//     {
//       name: 'پمپ لجن کش',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-11-100x100.png',
//       link: '/categories/sludge-pump',
//     },
//     {
//       name: 'دوزینگ پمپ',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2019/12/dosing-pump-500-100x100.jpg',
//       link: '/categories/dosing-pump',
//     },
//     {
//       name: 'گیربکس حلزونی',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2024/05/halezooni-gearbox-fav.webp',
//       link: '/categories/worm-gearbox',
//     },
//     {
//       name: 'الکترو پمپ',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2016/10/ImageHandler-8-100x100.jpg',
//       link: '/categories/electric-pump',
//     },
//     {
//       name: 'پمپ گریز از مرکز',
//       src: 'https://rahabsanat.ir/wp-content/uploads/2017/05/ImageHandler-14-100x100.png', // Added an extra item for better demonstration
//       link: '/categories/centrifugal-pump',
//     },
//   ];

//   return (
//     <div className="w-[95%] mx-auto my-14 relative px-4 sm:px-0">
//       <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center sm:text-right">
//         دسته‌بندی‌های محبوب
//       </h2>
//       <Swiper
//         modules={[Autoplay, Navigation]}
//         autoplay={{ delay: 2500, disableOnInteraction: false }}
//         loop={true}
//         speed={700}
//         navigation={{
//           nextEl: '.swiper-button-next-custom',
//           prevEl: '.swiper-button-prev-custom',
//         }}
//         breakpoints={{
//           0: {
//             slidesPerView: 2,
//             spaceBetween: 12,
//           },
//           640: {
//             slidesPerView: 3,
//             spaceBetween: 16,
//           },
//           768: {
//             slidesPerView: 4,
//             spaceBetween: 20,
//           },
//           1024: {
//             slidesPerView: 5,
//             spaceBetween: 24,
//           },
//           1280: {
//             slidesPerView: 6,
//             spaceBetween: 28,
//           },
//         }}
//         className="pb-8" // Add some padding for navigation arrows
//       >
//         {data.map((item, i) => (
//           <SwiperSlide key={i}>
//             <Link href={item.link || '/'} className="block h-full">
//               <div className="bg-white rounded-xl py-5 px-3 shadow-md hover:shadow-lg transition-all duration-300 text-center flex flex-col items-center justify-between group h-full border border-gray-100 hover:border-blue-300">
//                 {/* Image and Name */}
//                 <div className="flex flex-col items-center gap-4">
//                   <div className="bg-blue-50 p-4 rounded-full border-2 border-blue-100 group-hover:scale-105 group-hover:border-blue-400 transition-all duration-300 overflow-hidden relative">
//                     <Image
//                       width={80}
//                       height={80}
//                       alt={item.name}
//                       src={item.src}
//                       className="rounded-full object-cover"
//                     />
//                   </div>
//                   <p className="font-semibold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
//                     {item.name}
//                   </p>
//                 </div>

//                 {/* "View" Button with Animated Transition */}
//                 <div className="relative mt-4 w-full flex justify-center h-8 overflow-hidden">
//                   <div className="absolute inset-0 flex items-center justify-center opacity-100 translate-y-0 group-hover:opacity-0 group-hover:-translate-y-full transition-all duration-400 ease-in-out">
//                     {/* Placeholder or initial icon if desired */}
//                   </div>
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 ease-in-out delay-100">
//                     <span className="inline-flex items-center text-sm font-bold bg-blue-600 text-white py-2 px-4 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition-colors">
//                       <span className="ml-2">مشاهده</span>
//                       <Eye size={18} />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </Link>
//           </SwiperSlide>
//         ))}
//         {/* Custom Navigation Buttons */}
//         <div className="swiper-button-prev-custom absolute top-1/2 -left-3 transform -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-50 border border-gray-200">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2.5}
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-700"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
//           </svg>
//         </div>
//         <div className="swiper-button-next-custom absolute top-1/2 -right-3 transform -translate-y-1/2 z-10 hidden sm:flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:bg-blue-50 border border-gray-200">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={2.5}
//             stroke="currentColor"
//             className="w-5 h-5 text-gray-700"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
//           </svg>
//         </div>
//       </Swiper>
//     </div>
//   );
// };

// export default CategorySlider;