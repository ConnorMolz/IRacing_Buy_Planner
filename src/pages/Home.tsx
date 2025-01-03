import {Link} from "react-router";
import Navbar from "../components/Navbar.tsx";

const Home = () =>{
    return(
        <div>
            <Navbar />
            <Link to={"/cars"} className="btn btn-primary">Cars</Link>
            <Link to={"/tracks"} className="btn-primary btn">Tracks</Link>
        </div>
    );
}

export default Home;