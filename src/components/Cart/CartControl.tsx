import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";

const CartControl = () => {

    const [carCart, setCarCart] = useState<any[]>([])
    const [trackCart, setTrackCart] = useState<any[]>([])

    useEffect(() => {
            getCarts().then();
        }
    );

    const getCarts = async () =>{
        const store = await load('store.json', { autoSave: true });
        let carCartFunc = await store.get("carCart");
        let trackCartFunc = await store.get("trackCart");
        // @ts-ignore
        setCarCart(carCartFunc);
        // @ts-ignore
        setTrackCart(trackCartFunc);
    }

    const calcPrice = () => {
        let price = 0;
        for(let i = 0; i < carCart.length; i++){
            price = carCart[i].cost + price;
        }
        for(let i = 0; i < trackCart.length; i++){
            price = trackCart[i].cost + price;
        }
        return price.toFixed(2);
    }

    const buy = async () => {
        const store = await load('store.json', { autoSave: true });
        let carCartFunc = await store.get("cars");
        let trackCartFunc = await store.get("tracks");
        for(let i = 0; i < carCart.length; i++){
            // @ts-ignore
            carCartFunc[carCart[i].id - 1].owned = true;
        }
        for(let i = 0; i < trackCart.length; i++){
            // @ts-ignore
            trackCartFunc[trackCart[i].id - 1].owned = true;
        }

        await store.set("cars", carCartFunc);
        await store.set("tracks", trackCartFunc);
        await store.set("carCart", []);
        await store.set("trackCart", []);
    }

    return(
        <div>
            <div className="flex w-full flex-col border-opacity-50">
                <div className="card bg-base-300 rounded-box grid h-30 place-items-center">
                    Total Price without VAT: {calcPrice()}$
                    <button onClick={() => buy()} className="btn btn-primary">Buy Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CartControl;