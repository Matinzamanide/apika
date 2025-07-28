import ProductCard from "@/components/ProductCard/ProductCard";
import { IProduct } from "@/Types/Types";

const HouseholdPump = async () => {
  const res = await fetch("http://localhost/apitak/get_products.php", {
    cache: "no-store", 
  });

  const data = (await res.json()) as IProduct[];
   console.log(data[0])

   const filteredData=data.filter((product)=>
    product.categories.some((cat)=> cat.includes('پمپ آب خانگی'))
  )
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-[90%] mx-auto my-10">
      {
      
      filteredData.map((item) => (
        <ProductCard key={item.title} {...item} />
      ))}
    </div>
  );
};

export default HouseholdPump;

// 'use client';

// import ProductCard from "@/components/ProductCard/ProductCard";
// import SkeletonProductCard from "@/components/SkeletonProductCard/SkeletonProductCard";
// import { IProduct } from "@/Types/Types"; // Assuming IProduct is correctly defined here
// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";



// const HouseholdPump = () => {
//   const [products, setProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true); // New loading state

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("http://localhost/apitak/get_products.php", {
//           cache: "no-store",
//         });
//         const data = (await res.json()) as IProduct[];

//         // Filter products with "پمپ آب خانگی" category
//         const filtered = data.filter((product) =>
//           product.categories?.some((cat) => cat.includes("پمپ آب خانگی"))
//         );

//         setProducts(filtered);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         // Optionally, handle error state here (e.g., show an error message)
//       } finally {
//         setLoading(false); // Set loading to false after fetch (success or failure)
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="container mx-auto px-4 py-12">
//       {/* Section Header */}
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
//         پمپ‌های آب خانگی
//       </h2>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           // Display skeleton cards while loading
//           Array.from({ length: 4 }).map((_, index) => ( // Show 4 skeleton cards
//             <SkeletonProductCard key={index} />
//           ))
//         ) : products.length > 0 ? (
//           // Display actual product cards if products are available
//           products.map((item, index) => (
//             <motion.div
//               key={item.title} // Consider using item.id if available and unique
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
//             >
//               <ProductCard {...item} />
//             </motion.div>
//           ))
//         ) : (
//           // Display a message if no products are found after loading
//           <div className="col-span-full text-center py-10 text-gray-600">
//             <p className="text-xl font-medium">هیچ پمپ آب خانگی در حال حاضر یافت نشد.</p>
//             <p className="text-md mt-2">لطفاً بعداً دوباره امتحان کنید یا سایر دسته‌بندی‌ها را بررسی نمایید.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HouseholdPump;