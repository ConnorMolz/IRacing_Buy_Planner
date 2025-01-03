import Navbar from "../components/Navbar.tsx";
import TrackCart from "../components/Cart/TrackCart.tsx";
import CarCart from "../components/Cart/CarCart.tsx";
import CartControl from "../components/Cart/CartControl.tsx";

const Cart = () => {
    return(
        <div>
            <Navbar />
            <CarCart />
            <TrackCart />
            <CartControl />
        </div>
    )
}

export default Cart;