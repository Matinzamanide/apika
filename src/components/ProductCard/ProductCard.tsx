// 'use client';

// import Image from 'next/image';
// import { ShoppingCart } from 'lucide-react';
// import { useState } from 'react';
// import { IProduct } from '@/Types/Types';

// interface Specification {
//   key: string;
//   label: string;
//   value: string;
// }

// interface Props {
//   title: string;
//   price?: number;
//   before_discount_price?: number;
//   images: string[];
//   brand: string;
//   inventory: number;
//   catalog_url?: string;
//   categories: string[];
//   specifications: Specification[];
// }

// const ProductCard = ({
//   title,
//   price,
//   before_discount_price,
//   images,
// }: IProduct) => {
//   const [hovered, setHovered] = useState(false);

//   const hasDiscount =
//     price && before_discount_price && price < before_discount_price;
//   const showSecondImage = hovered && images.length > 1;

//   return (
//     <div
//       className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md  hover:-translate-y-2 transition-all duration-300 overflow-hidden"
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* تصویر محصول */}
//       <div className="relative w-full h-60">
//         <Image
//           src={showSecondImage ? images[1] : images[0]}
//           alt={title}
//           fill
//           className="object-contain p-4 transition-all duration-300"
//         />
//       </div>

//       {/* محتوای محصول */}
//       <div className="p-4 flex flex-col gap-2">
//         <h3 className="font-medium text-gray-800 line-clamp-2 h-10 text-sm">{title}</h3>

//         {price ? (
//           <div className="flex items-center justify-between mt-2">
//             <div className="flex flex-col">
//               <span className="text-blue-700 font-bold text-base">
//                 {price.toLocaleString()} تومان
//               </span>
//               {hasDiscount && (
//                 <span className="text-sm text-gray-400 line-through">
//                   { before_discount_price?.toLocaleString()} تومان
//                 </span>
//               )}
//             </div>
//             <ShoppingCart className="w-5 h-5 text-blue-600" />
//           </div>
//         ) : (
//           <span className="text-sm text-yellow-600 font-semibold mt-2">
//             استعلام قیمت خرید
//           </span>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;



'use client';

import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { IProduct } from '@/Types/Types';
import Link from 'next/link';

const ProductCard = ({
  title,
  price,
  before_discount_price,
  images,
  inventory,
}: IProduct) => {
  const [hovered, setHovered] = useState(false);

  const hasDiscount =
    typeof price === 'number' &&
    typeof before_discount_price === 'number' &&
    price < before_discount_price;

  const discountPercentage =
    hasDiscount && before_discount_price
      ? Math.round(((before_discount_price - price) / before_discount_price) * 100)
      : null;

  const showSecondImage = hovered && images.length > 1;
  const safeSlug = encodeURIComponent(title);
  const isPriceValid = typeof price === 'number' && price > 0;

  return (
    <Link
      href={`/ProductPage/${safeSlug}`}
      passHref
      className="flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* تصویر محصول */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={showSecondImage ? images[1] : images[0]}
          alt={title}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
        />
        {discountPercentage && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            %{discountPercentage}-
          </span>
        )}
      </div>

      {/* اطلاعات محصول */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        <h3 className="font-medium text-gray-800 line-clamp-2 h-10 text-sm">
          {title}
        </h3>

        {isPriceValid ? (
          <div className="flex flex-col mt-auto pt-2">
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through mb-1">
                {Number(before_discount_price)?.toLocaleString()} تومان
              </span>
            )}
            <span className="text-blue-700 font-bold text-lg">
              {Number(price).toLocaleString()} تومان
            </span>
            {Number(inventory) > 0 ? (
              <span className="text-xs text-green-600 mt-1">موجود در انبار</span>
            ) : (
              <span className="text-xs text-red-600 mt-1">ناموجود</span>
            )}
          </div>
        ) : (
          <div className="mt-auto pt-2">
            
          </div>
        )}
      </div>

      {/* دکمه خرید */}
      <div className="p-4 pt-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`"${title}" clicked`);
            // عمل اضافه به سبد یا ارجاع به تماس...
          }}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-md transition-colors duration-200
            ${isPriceValid ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}
          `}
        >
          <ShoppingCart className="w-5 h-5" />
          {isPriceValid ? 'مشاهده و خرید' : 'استعلام قیمت و خرید'}
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
