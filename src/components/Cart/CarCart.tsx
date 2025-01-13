import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";

const CarCart = () =>{

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<any[]>([])

    useEffect(() => {
            if(cart.length != 0){
                setLoading(false);
            }
            else {
                getCart().then();
            }
        },[cart]
    );

    useEffect(() => {
            getCart().then();
        }, []
    );

    const getCart = async () =>{
        const store = await load('store.json', { autoSave: true });
        let carCart = await store.get("carCart");
        // @ts-ignore
        setCart(carCart);
    }

    const calcPrice = () => {
        let price = 0;
        for(let i = 0; i < cart.length; i++){
            price = cart[i].car_price + price;
        }
        return price.toFixed(2);
    }

    const removeFromCart = async (id:any) => {
        setCart(cart.filter(item => item.car_id !== id));
        const store = await load("store.json", {autoSave: true});
        await store.set("carCart", cart.filter(item => item.car_id !== id));
    }

    if(loading){
        return (
            <div>
                <div className="py-8 text-2xl underline underline-offset-1">Cars</div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Cars Name</th>
                            <th>Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td><p>Cars in Cart: {cart.length}</p></td>
                            <td><p>Price without VAT: {calcPrice()}$</p></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="divider"></div>
            </div>
        )
    }
    return (
        <div>
            <div className="py-8 text-2xl underline underline-offset-1">Cars</div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Cars Name</th>
                        <th>Cost</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        cart.map((car: any) => (
                            <tr key={car.car_id}>
                                <td>
                                    <button className="btn btn-error" onClick={() => removeFromCart(car.car_id)}>
                                        Remove
                                    </button>
                                </td>
                                <td>{car.car_name}</td>
                                <td>{car.car_price}$</td>
                            </tr>
                        ))
                    }
                    <tr>
                        <td></td>
                        <td><p>Cars in Cart: {cart.length}</p></td>
                        <td><p>Price without VAT: {calcPrice()}$</p></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="divider"></div>
        </div>
    );
}

export default CarCart;