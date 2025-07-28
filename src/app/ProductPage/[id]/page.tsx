import { ShoppingCart, Download, CheckCircle, Package, Tag } from 'lucide-react';
import TabComponent from '@/components/TabCom/TabComponent';
import Gallery from '@/components/Gallery/Gallery';
import { IProduct } from '@/Types/Types';
import QuantitySelector from '@/components/QuantitySelector/QuantitySelector';
import { Toaster } from 'react-hot-toast';
import Link from 'next/link';

const data = {
  title: 'پمپ آب یک اسب زنیکس مدل CAM100',
  price: 3080000,
  before_discount_price: 3350000,
  inventory: 8,
  brand: 'ZENIX',
  catalog_url: '/download',
  images: [
    'https://rahabsanat.ir/wp-content/uploads/2025/04/pentax-pm-80-water-pump-1.webp',
    'https://rahabsanat.ir/wp-content/uploads/2025/04/pentax-pm-80-water-pump-2.webp',
    'https://rahabsanat.ir/wp-content/uploads/2025/04/pentax-pm-80-water-pump-4.webp',
  ],
  categories: ['الکترو پمپ', 'پمپ آب خانگی'],
  specifications: [
    { spec_key: 'electric_source', spec_label: 'منبع برق', spec_value: 'تک فاز' },
    { spec_key: 'material', spec_label: 'جنس بدنه', spec_value: 'چدن' },
    { spec_key: 'voltage', spec_label: 'ولتاژ', spec_value: '220 ولت' },
    { spec_key: 'pump_outlet_diameter', spec_label: 'قطر خروجی پمپ', spec_value: '1 اینچ' },
    { spec_key: 'pump_inlet_diameter', spec_label: 'قطر ورودی پمپ', spec_value: '1 اینچ' },
    { spec_key: 'pump_power', spec_label: 'قدرت پمپ', spec_value: '1 اسب بخار' },
    { spec_key: 'maximum_suction', spec_label: 'حداکثر مکش', spec_value: '8 متر' },
  ],
  product_features: [
    'کارکرد بی‌صدا و با دوام',
    'مناسب برای منازل و آپارتمان‌ها',
    'دارای بدنه‌ی چدنی با کیفیت',
    'موتور پرقدرت با راندمان بالا',
  ],
};
 interface IProps{
    params:Promise<{id:string}>
 }
const dataLightPage:React.FC<IProps> = async (props) => {
    const {id}=await props.params;
    console.log(id)


    const res=await fetch(`http://localhost/apitak/get_products.php?title=${id}`);
    const [data]=await res.json();

    console.log(data);


  const hasDiscount = data.price < data.before_discount_price;
  const discountPercentage = hasDiscount
    ? Math.round(((data.before_discount_price - data.price) / data.before_discount_price) * 100)
    : 0;
  const isInStock = data.inventory > 0;
  const stockMessage = isInStock
    ? data.inventory > 5
      ? 'موجود در انبار'
      : `تنها ${data.inventory} عدد باقی مانده!`
    : 'ناموجود';

  const tabs = [
    { key: 'specs', label: 'مشخصات فنی' },
    { key: 'features', label: 'ویژگی‌ها' },
    { key: 'comments', label: 'نظرات کاربران' },
    { key: 'questions', label: 'سوالات کاربران' },
  ];

//   const handleQuantityChange = (e:any) => {
//     const value = Math.max(1, Math.min(parseInt(e.target.value, 10) || 1, data.inventory));
//     setQuantity(value);
//   };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white min-h-screen text-[#1a1a1a] py-12 px-4 sm:px-6 lg:px-8">
      <button className='bg-emerald-600 text-emerald-300 px-10 rounded py-1'>
        <Link href={`/Products/${data.id}/edit`} target='_blank'>ویرایش</Link>
      </button>
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
        {/* Product Image Gallery */}
        <Gallery GalleryProps={data} />

        {/* Product Details */}
        <div className="flex flex-col gap-6 lg:gap-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
            {data.title}
          </h1>

          {/* Price Section */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <span className="text-green-700 text-3xl sm:text-4xl font-bold">
              {
                data.price !=0 &&(
              data.price.toLocaleString() + 'تومان'
                )
              } 
            </span>
            {hasDiscount && (
              <div className="flex items-center gap-3">
                <span className="text-lg sm:text-xl line-through text-gray-400">
                  {data.before_discount_price.toLocaleString()} تومان
                </span>
                <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  %{discountPercentage}-
                </span>
              </div>
            )}
          </div>

          {/* Availability, Brand, Categories */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {
                data.price !=0 &&(

            <div className={`flex items-center gap-1 ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
              <Package size={18} />
              
              <span className="font-semibold">{stockMessage}</span> ({data.inventory} عدد)
            </div>
                )
            }
            <div className="flex items-center gap-1 text-gray-700">
              <Tag size={18} />
              <span className="font-semibold">برند:</span> {data.brand}
            </div>
            <div className="flex items-center gap-1 text-gray-700">
              <span className="font-semibold">دسته‌بندی‌ها:</span>
              {data.categories.map((cat:string, i:string) => (
                <span key={i} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Download Catalog */}
          <a
            href={data.catalog_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-fit gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold px-5 py-2 rounded-lg transition duration-200 ease-in-out shadow-sm hover:shadow-md"
          >
            <Download size={20} />
            دانلود کاتالوگ محصول
          </a>

          {/* Add to Cart Section */}
        <QuantitySelector props={data.inventory} id_p={data.id} />

          {/* Product Features */}
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">ویژگی‌های برجسته محصول:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700 text-base">
              {data.product_features.map((f :string, i:string) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="text-green-500 w-5 h-5 mt-1 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs for Specifications, Features, Comments, Questions */}
     <TabComponent TabProps={data} />
     <Toaster position='top-center' />
    </div>
  );
};

export default dataLightPage;


// 'use client';

// import Image from 'next/image';
// import { useState } from 'react';
// import {
//   ShoppingCart,
//   Download,
//   CheckCircle,
//   Info,
// } from 'lucide-react';

// const data = {
//   title: 'پمپ آب یک اسب زنیکس مدل CAM100',
//   price: 3080000,
//   before_discount_price: 3350000,
//   inventory: 8,
//   brand: 'ZENIX',
//   catalog_url: '/download',
//   images: [
//     'https://rahabsanat.ir/wp-content/uploads/2025/04/pentax-pm-80-water-pump-1.webp',
//     'https://rahabsanat.ir/wp-content/uploads/2025/04/pentax-pm-80-water-pump-2.webp',
//     'https://rahabsanat.ir/wp-content/uploads/2025/04/pentax-pm-80-water-pump-4.webp',
//   ],
//   categories: ['الکترو پمپ', 'پمپ آب خانگی'],
//   specifications: [
//     { spec_key: 'electric_source', spec_label: 'منبع برق', spec_value: 'تک فاز' },
//     { spec_key: 'material', spec_label: 'جنس بدنه', spec_value: 'چدن' },
//     { spec_key: 'voltage', spec_label: 'ولتاژ', spec_value: '220 ولت' },
//     { spec_key: 'pump_outlet_diameter', spec_label: 'قطر خروجی پمپ', spec_value: '1 اینچ' },
//     { spec_key: 'pump_inlet_diameter', spec_label: 'قطر ورودی پمپ', spec_value: '1 اینچ' },
//     { spec_key: 'pump_power', spec_label: 'قدرت پمپ', spec_value: '1 اسب بخار' },
//     { spec_key: 'maximum_suction', spec_label: 'حداکثر مکش', spec_value: '8 متر' },
//   ],
//   product_features: [
//     'کارکرد بی‌صدا و با دوام',
//     'مناسب برای منازل و آپارتمان‌ها',
//     'دارای بدنه‌ی چدنی با کیفیت',
//     'موتور پرقدرت با راندمان بالا',
//   ],
// };

// const tabs = [
//   { key: 'specs', label: 'مشخصات فنی' },
//   { key: 'features', label: 'ویژگی‌ها' },
//   { key: 'comments', label: 'نظرات کاربران' },
//   { key: 'questions', label: 'سوالات کاربران' },
// ];

// const dataLightPage = () => {
//   const [activeImage, setActiveImage] = useState(data.images[0]);
//   const [activeTab, setActiveTab] = useState('specs');

//   const hasDiscount =
//     data.price < data.before_discount_price;

//   return (
//     <div className="bg-[#f9f9f9] min-h-screen text-[#1a1a1a] py-10 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
//         {/* گالری تصاویر */}
//         <div>
//           <div className="relative w-full h-[420px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-md transition-all duration-300">
//             <Image
//               src={activeImage}
//               alt={data.title}
//               fill
//               className="object-contain p-6 transition duration-500 ease-in-out"
//             />
//           </div>

//           <div className="flex gap-3 mt-4">
//             {data.images.map((img, i) => (
//               <button
//                 key={i}
//                 onClick={() => setActiveImage(img)}
//                 className={`w-20 h-20 border rounded-md p-1 transition-all duration-200 ${
//                   activeImage === img
//                     ? 'ring-2 ring-blue-500'
//                     : 'hover:ring-1 hover:ring-gray-300'
//                 }`}
//               >
//                 <Image
//                   src={img}
//                   alt={`gallery-${i}`}
//                   width={80}
//                   height={80}
//                   className="object-contain"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* اطلاعات محصول */}
//         <div className="flex flex-col gap-6">
//           <h1 className="text-3xl font-bold leading-snug">{data.title}</h1>

//           <div className="flex items-center gap-4">
//             <span className="text-green-600 text-2xl font-semibold">
//               {data.price.toLocaleString()} تومان
//             </span>
//             {hasDiscount && (
//               <span className="text-base line-through text-gray-400">
//                 {data.before_discount_price.toLocaleString()} تومان
//               </span>
//             )}
//           </div>

//           <p className="text-sm text-gray-500">
//             موجودی: <strong>{data.inventory}</strong> عدد | برند: {data.brand}
//           </p>

//           <a
//             href={data.catalog_url}
//             target="_blank"
//             className="flex items-center text-blue-600 hover:text-blue-800 transition text-sm font-medium underline gap-1"
//           >
//             <Download size={16} />
//             دانلود کاتالوگ
//           </a>

//           {/* افزودن به سبد خرید */}
//           <div className="flex gap-4 items-center mt-2">
//             <input
//               type="number"
//               defaultValue={1}
//               min={1}
//               max={data.inventory}
//               className="w-16 py-2 px-3 rounded-md border border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-blue-500"
//             />
//             <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition shadow-sm">
//               <ShoppingCart size={18} />
//               افزودن به سبد خرید
//             </button>
//           </div>
//         </div>
//       </div>
//             <div>
//             <h3 className="text-lg font-semibold mb-3">ویژگی‌های محصول:</h3>
//             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-700 text-sm">
//               {data.product_features.map((f, i) => (
//                 <li key={i} className="flex items-center gap-2">
//                   <CheckCircle className="text-green-500 w-4 h-4" />
//                   {f}
//                 </li>
//               ))}
//             </ul>
//           </div>

//        {/* تب‌ها */}
//        <div className="max-w-5xl mx-auto mt-16">
//          <div className="flex flex-wrap gap-2 border-b border-gray-200 mb-6">
//            {tabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => setActiveTab(tab.key)}
//               className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
//                 activeTab === tab.key
//                   ? 'border-blue-600 text-blue-600'
//                   : 'border-transparent text-gray-500 hover:text-blue-500'
//               }`}
//             >
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <div className="bg-white border rounded-lg p-5 shadow-sm text-sm text-gray-700">
//           {activeTab === 'specs' && (
//             <table className="w-full text-sm">
//               <tbody>
//                 {data.specifications.map((spec, i) => (
//                   <tr key={i} className="border-t border-gray-100">
//                     <td className="bg-gray-50 text-gray-500 p-2 w-1/3">
//                       {spec.spec_label}
//                     </td>
//                     <td className="p-2 text-gray-800">{spec.spec_value}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}

//           {activeTab === 'features' && (
//             <ul className="list-disc pl-5 space-y-1">
//               {data.product_features.map((f, i) => (
//                 <li key={i}>{f}</li>
//               ))}
//             </ul>
//           )}

//           {activeTab === 'comments' && (
//             <div className="text-gray-600">
//               <p>هنوز نظری ثبت نشده است.</p>
//             </div>
//           )}

//           {activeTab === 'questions' && (
//             <div className="text-gray-600">
//               <p>هیچ سوالی ثبت نشده. شما اولین نفر باشید!</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default dataLightPage;
