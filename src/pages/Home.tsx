import {Link} from "react-router";
import Navbar from "../components/Navbar.tsx";

const Home = () =>{
    return(
        <div>
            <Navbar/>
            <div className="py-2.5"></div>
            <div className="justify-center flex py-2.5">
                <Link to={"/cars"} className="btn btn-primary h-20 w-4/5">Cars</Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/tracks"} className="btn btn-primary h-20 w-4/5">Tracks</Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/cart"} className="btn btn-primary h-20 w-4/5">Cart</Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/my-content"} className="btn btn-primary h-20 w-4/5">My Content</Link>
            </div>


        </div>
    );
}

export default Home;