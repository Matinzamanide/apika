// import Image from "next/image";
// import Link from "next/link";
// import SectionHeader from "../SectionSeperator/SectionSeperator";
// import { GitPullRequest, GitPullRequestDraft } from "lucide-react";

// const categories = [
//   {
//     title: "پمپ آب خانگی",
//     href: "/product-category/pump/home/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/leo_pump-1.webp",
//   },
//   {
//     title: "مکانیکال سیل",
//     href: "/product-category/mechanical-seal/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/mechanical_seal-1.webp",
//   },
//   {
//     title: "انبساط",
//     href: "/product-category/expansion/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/enbesat-1.webp",
//   },
//   {
//     title: "گیربکس صنعتی",
//     href: "/product-category/gearbox/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/gearbox_sanati.webp",
//   },
//   {
//     title: "موتور کولر",
//     href: "/product-category/cooler-motor/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/cooler_motor-1.webp",
//   },
//   {
//     title: "ست کنترل",
//     href: "/product-category/control-set/",
//     src: "https://rahabsanat.ir/wp-content/uploads/2025/03/control-set.webp",
//   },
// ];

// const PumpCategory = () => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 py-6 px-4 rounded-xl my-8 ">

//       {categories.map((cat, index) => (
//         <Link
//           key={index}
//           href={cat.href}
//           className="flex flex-col items-center justify-center text-center group"
//         >
//           <div className="relative lg:w-[200px] lg:h-[200px] flex items-center justify-center bg-[#cee6ff] rounded-full shadow  transition-transform duration-300">
//             <Image
//               src={cat.src}
//               alt={cat.title}
//               width={550}
//               height={250}
//               className="rounded-full  hover:-translate-y-4 duration-500"
//             />
//           </div>
//           <span className="mt-2 text-lg text-[#333] group-hover:text-[#0183FF] transition-colors duration-300">
//             {cat.title}
//           </span>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default PumpCategory;


import Image from "next/image";
import Link from "next/link";
// Assuming SectionHeader is correctly implemented and provides a title/separator
// import SectionHeader from "../SectionSeperator/SectionSeperator"; 
// import { GitPullRequest, GitPullRequestDraft } from "lucide-react"; // Icons not directly used in the card logic

const categories = [
  {
    title: "پمپ آب خانگی",
    href: "/HouseholdPump",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/leo_pump-1.webp",
  },
  {
    title: "مکانیکال سیل",
    href: "/product-category/mechanical-seal/",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/mechanical_seal-1.webp",
  },
  {
    title: "انبساط",
    href: "/ExpansionSource",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/enbesat-1.webp",
  },
  {
    title: "گیربکس صنعتی",
    href: "/product-category/gearbox/",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/gearbox_sanati.webp",
  },
  {
    title: "موتور کولر",
    href: "/product-category/cooler-motor/",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/cooler_motor-1.webp",
  },
  {
    title: "ست کنترل",
    href: "/SetControl",
    src: "https://rahabsanat.ir/wp-content/uploads/2025/03/control-set.webp",
  },
];

const PumpCategory = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* If you have a SectionHeader component, you can use it here */}
      {/* <SectionHeader title="دسته‌بندی‌های اصلی" /> */} 
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">دسته‌بندی‌های اصلی</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 justify-items-center">
        {categories.map((cat, index) => (
          <Link
            key={index}
            href={cat.href}
            className="flex flex-col items-center justify-center text-center group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 w-full max-w-[220px]"
          >
            <div className="relative w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center bg-blue-50 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 shadow-inner">
              <Image
                src={cat.src}
                alt={cat.title}
                fill // Use fill to make image cover the div, combined with object-contain
                sizes="(max-width: 768px) 100px, 150px" // Optimize image loading
                className="object-contain p-2 transition-transform duration-500 ease-in-out" // Added padding for better fit
              />
              {/* Optional: Add a subtle overlay on hover for a richer effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-200 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full"></div>
            </div>
            <span className="mt-4 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
              {cat.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PumpCategory;