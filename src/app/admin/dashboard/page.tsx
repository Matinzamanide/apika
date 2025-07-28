// app/admin/dashboard/page.tsx

import OrderDetails, { IsOrder } from "@/components/OrderDetails/OrderDetails";
import OrderItem from "@/components/OrderItem/orderItem";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage =async () => {
  const cookieStore = cookies();
  const session = cookieStore.get("PHPSESSID");
  // ``;
  const res=await fetch('http://localhost/apitak/orders/submit_order.php');
  const data=await res.json() as IsOrder[];

  console.log(data);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">داشبورد ادمین</h1>
      <p>شما وارد شده‌اید!</p>
      {
        data.map((item)=>{
          return <OrderDetails key={item.id} {...item} />
        })
      }
      
    </div>
  );
};
export default DashboardPage;
