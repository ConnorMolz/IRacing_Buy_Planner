import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";

const CartControl = () => {

    const [carCart, setCarCart] = useState<any[]>([])
    const [trackCart, setTrackCart] = useState<any[]>([])
    const [club40, setClub40] = useState(false);
    const [club97, setClub97] = useState(false);

    useEffect(() => {
            getCarts().then();
            getClubs().then();
        }
    );

    const getClubs = async () => {
        const store = await load('store.json', { autoSave: true });
        let cars = await store.get("cars");
        let tracks = await store.get("tracks");
        // @ts-ignore
        cars = cars.filter((item: { owned: boolean, free: boolean }) => item.owned && !item.free);
        // @ts-ignore
        tracks = tracks.filter((item: { owned: boolean, free: boolean }) => item.owned && !item.free);
        // @ts-ignore
        if(cars.length + tracks.length >= 97){
            setClub97(true);
            setClub40(false);
            return;
        }
        // @ts-ignore
        if(cars.length + tracks.length >= 40){
            setClub97(false);
            setClub40(true);
            return;
        }
        setClub97(false);
        setClub40(false);
        return;
    }

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

        if(club40){
            price = price * 0.8;
            return price.toFixed(2);
        }

        if(club97){
            price = price * 0.7;
            return price.toFixed(2);
        }

        if(carCart.length + trackCart.length > 2 && carCart.length + trackCart.length < 6){
            price = price * 0.9;
            return price.toFixed(2);
        }
        if(carCart.length + trackCart.length >= 6){
            price = price * 0.85;
            return price.toFixed(2);
        }
        return price.toFixed(2);
    }

    const buy = async () => {
        const store = await load('store.json', { autoSave: true });
        let carCartFunc = await store.get("cars");
        let trackCartFunc = await store.get("tracks");
        for(let i = 0; i < carCart.length; i++){
            // @ts-ignore
            for(let j = 0; j < carCartFunc.length; j++){
                // @ts-ignore
                if(carCartFunc[j].id == carCart[i].id){
                    // @ts-ignore
                    carCartFunc[j].owned = true;
                    break;
                }
            }
        }
        for(let i = 0; i < trackCart.length; i++){
            // @ts-ignore
            for(let j = 0; j < trackCartFunc.length; j++){
                // @ts-ignore
                if(trackCartFunc[j].id == trackCart[i].id){
                    // @ts-ignore
                    trackCartFunc[j].owned = true;
                    break;
                }
            }
        }

        await store.set("cars", carCartFunc);
        await store.set("tracks", trackCartFunc);
        await store.set("carCart", []);
        await store.set("trackCart", []);

        window.location.reload();
    }

    return(
        <div>
            <div className="flex w-full flex-col border-opacity-50">
                <div className="card bg-base-200 rounded-box grid h-30 place-items-center">
                    Total Price without VAT: {calcPrice()}$ (With Discount if possible)
                    <button onClick={() => buy()} className="btn btn-primary">Buy Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CartControl;