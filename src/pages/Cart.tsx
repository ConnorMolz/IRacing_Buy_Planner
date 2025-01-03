import Navbar from "../components/Navbar.tsx";
import TrackCart from "../components/Cart/TrackCart.tsx";
import CarCart from "../components/Cart/CarCart.tsx";

const Cart = () => {
    return(
        <div>
            <Navbar />
            <CarCart />
            <TrackCart />
        </div>
    )
}

export default Cart;