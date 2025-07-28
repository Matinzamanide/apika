import { IChildren } from "@/Types/Types";
import Footer from "../Footer/Footer";
import Header from "../Header/header";

const Layout :React.FC<IChildren> = ({children}) => {
    return ( 
        <div className="bg-[#f0f0f0] min-h-screen">
            <Header/>
            {children}
            <Footer/>
        </div>
     );
}
 
export default Layout ;