import ProductCard from "@/components/ProductCard/ProductCard";
import { IProduct } from "@/Types/Types";

const SetControl =async () => {
    const res = await fetch("http://localhost/apitak/get_products.php", {
        cache: "no-store", 
      });
    
      const data = (await res.json()) as IProduct[];
       console.log(data[0])
    
       const filteredData=data.filter((product)=>
        product.categories.some((cat)=> cat.includes('ست کنترل پمپ'))
      )
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-[90%] mx-auto my-10">
          {
          
          filteredData.map((item) => (
            <ProductCard key={item.title} {...item} />
          ))}
        </div>
      );
}
 
export default SetControl;