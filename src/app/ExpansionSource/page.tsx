// import ProductCard from "@/components/ProductCard/ProductCard";
// import { IProduct } from "@/Types/Types";

// const ExpansionSource = async () => {
//   const res = await fetch("http://localhost/apitak/get_products.php", {
//     cache: "no-store", 
//   });

//   const data = (await res.json()) as IProduct[];
//    console.log(data[0])
//    const filteredData=data.filter((product)=>
//     product.categories.some((cat)=>cat.includes('منبع انبساط'))
// )
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-[90%] mx-auto my-10">
//       {
      
//       filteredData.map((item) => (
//         <ProductCard key={item.title} {...item} />
//       ))}
//     </div>
//   );
// };

// export default ExpansionSource;
// 'use client';

// import ProductCard from "@/components/ProductCard/ProductCard";
// import SkeletonProductCard from "@/components/SkeletonProductCard/SkeletonProductCard"; // Assuming you have this component
// import { IProduct } from "@/Types/Types"; // Assuming IProduct is correctly defined here
// import { motion } from "framer-motion"; // For animations
// import { useEffect, useState, useMemo } from "react";

// const ExpansionSource = () => {
//   const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBrand, setSelectedBrand] = useState<string>('all'); // 'all', 'تفسان', 'امرا', 'SPRING'
//   const [sortOrder, setSortOrder] = useState<string>('default'); // 'default', 'cheapest', 'most_expensive'

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("http://localhost/apitak/get_products.php", {
//           cache: "no-store",
//         });
//         const data = (await res.json()) as IProduct[];

//         // Filter products by "منبع انبساط" category once after fetching
//         const filteredByCategory = data.filter((product) =>
//           product.categories?.some((cat) => cat.includes('منبع انبساط'))
//         );
//         setOriginalProducts(filteredByCategory);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         // Optionally, handle error state here (e.g., show an error message)
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []); // Empty dependency array means this runs once on mount

//   // Memoize filtered and sorted products to avoid unnecessary re-calculations
//   const filteredAndSortedProducts = useMemo(() => {
//     let currentProducts = [...originalProducts]; // Start with the category-filtered products

//     // Apply brand filter
//     if (selectedBrand !== 'all') {
//       currentProducts = currentProducts.filter(product =>
//         product.brand === selectedBrand
//       );
//     }

//     // Apply sort order
//     if (sortOrder === 'cheapest') {
//       currentProducts.sort((a, b) => Number( a.price )-Number( b.price));
//     } else if (sortOrder === 'most_expensive') {
//       currentProducts.sort((a, b) => Number( b.price) - Number( a.price ));
//     }
//     // 'default' means no specific sorting is applied, maintaining original fetch order

//     return currentProducts;
//   }, [originalProducts, selectedBrand, sortOrder]); // Re-calculate when these dependencies change

//   return (
//     <div className="container mx-auto px-4 py-12" dir="rtl"> {/* Set overall direction to RTL */}
//       {/* Section Header */}
//       <h2 className="text-3xl font-bold text-gray-800 text-center mb-10">
//         منابع انبساط
//       </h2>

//       {/* Filter and Sort Controls */}
//       <div className="flex flex-col md:flex-row-reverse justify-between items-center mb-8 gap-4 p-4 bg-white rounded-lg shadow-sm">
//         {/* Sort Order Buttons (Moved to the right for RTL layout) */}
//         <div className="flex items-center gap-2 w-full md:w-auto">
//           <span className="text-gray-700 font-medium whitespace-nowrap">مرتب‌سازی:</span>
//           <div className="flex gap-2">
//             <button
//               onClick={() => setSortOrder('cheapest')}
//               className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out
//                 ${sortOrder === 'cheapest' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
//                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
//             >
//               ارزان‌ترین
//             </button>
//             <button
//               onClick={() => setSortOrder('most_expensive')}
//               className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out
//                 ${sortOrder === 'most_expensive' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
//                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
//             >
//               گران‌ترین
//             </button>
//             <button
//               onClick={() => setSortOrder('default')}
//               className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ease-in-out
//                 ${sortOrder === 'default' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
//                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
//             >
//               پیش‌فرض
//             </button>
//           </div>
//         </div>

//         {/* Brand Filter (Moved to the left for RTL layout) */}
//         <div className="flex items-center gap-2 w-full md:w-auto md:ml-auto"> {/* md:ml-auto pushes it to the left */}
//           <label htmlFor="brand-filter" className="text-gray-700 font-medium whitespace-nowrap">برند:</label>
//           <select
//             id="brand-filter"
//             value={selectedBrand}
//             onChange={(e) => setSelectedBrand(e.target.value)}
//             className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition w-full md:w-auto"
//           >
//             <option value="all">همه برندها</option>
//             <option value="تفسان">تفسان</option>
//             <option value="امرا">امرا</option>
//             <option value="SPRING">SPRING</option>
//           </select>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {loading ? (
//           // Display skeleton cards while loading
//           Array.from({ length: 4 }).map((_, index) => ( // Show 4 skeleton cards
//             <SkeletonProductCard key={index} />
//           ))
//         ) : filteredAndSortedProducts.length > 0 ? (
//           // Display actual product cards if products are available
//           filteredAndSortedProducts.map((item, index) => (
//             <motion.div
//               key={item.id || item.title} // Use a unique key, preferably item.id
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
//             >
//               <ProductCard {...item} />
//             </motion.div>
//           ))
//         ) : (
//           // Display a message if no products are found after filtering/loading
//           <div className="col-span-full text-center py-10 text-gray-600">
//             <p className="text-xl font-medium">هیچ منبع انبساطی با فیلترهای اعمال شده یافت نشد.</p>
//             <p className="text-md mt-2">لطفاً فیلترها را تغییر دهید یا بعداً دوباره امتحان کنید.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ExpansionSource;

'use client';

import ProductCard from "@/components/ProductCard/ProductCard";
import SkeletonProductCard from "@/components/SkeletonProductCard/SkeletonProductCard";
import { IProduct } from "@/Types/Types";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

const ExpansionSource = () => {
  const [originalProducts, setOriginalProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost/apitak/get_products.php", {
          cache: "no-store",
        });
        const data = (await res.json()) as IProduct[];

        const filteredByCategory = data.filter((product) =>
          product.categories?.some((cat) => cat.includes('منبع انبساط'))
        );
        setOriginalProducts(filteredByCategory);
      } catch (error) {
        console.error("خطا در دریافت محصولات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredAndSortedProducts = useMemo(() => {
    let currentProducts = [...originalProducts];

    if (selectedBrand !== 'all') {
      currentProducts = currentProducts.filter(product =>
        product.brand === selectedBrand
      );
    }

    if (sortOrder === 'cheapest') {
      currentProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortOrder === 'most_expensive') {
      currentProducts.sort((a, b) => Number(b.price) - Number(a.price));
    }

    return currentProducts;
  }, [originalProducts, selectedBrand, sortOrder]);

  return (
    <div className="max-w-[95%] mx-auto py-10" dir="rtl">
      <h2 className="text-3xl font-extrabold text-gray-100 text-center mb-8">منابع انبساط</h2>

      <div className="grid md:grid-cols-4 gap-0">
        {/* Sidebar filters */}
        <div className="bg-[#111] rounded-xl p-4 space-y-6 shadow-lg md:sticky md:top-20 h-fit text-white">
          <h3 className="text-xl font-bold border-b border-gray-700 pb-2">فیلترها</h3>

          <div>
            <label className="block text-sm font-medium mb-1">برند</label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="all">همه برندها</option>
              <option value="تفسان">تفسان</option>
              <option value="امرا">امرا</option>
              <option value="WATES">WATES</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">مرتب‌سازی</label>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setSortOrder('cheapest')}
                className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition 
                ${sortOrder === 'cheapest' ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
              >
                ارزان‌ترین
              </button>
              <button
                onClick={() => setSortOrder('most_expensive')}
                className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition 
                ${sortOrder === 'most_expensive' ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
              >
                گران‌ترین
              </button>
              <button
                onClick={() => setSortOrder('default')}
                className={`w-full rounded-lg px-4 py-2 text-sm font-semibold transition 
                ${sortOrder === 'default' ? 'bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'}`}
              >
                پیش‌فرض
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonProductCard key={index} />
            ))
          ) : filteredAndSortedProducts.length > 0 ? (
            filteredAndSortedProducts.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
              >
                <ProductCard {...item} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              <p className="text-xl font-medium">محصولی با این فیلترها یافت نشد.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpansionSource;
