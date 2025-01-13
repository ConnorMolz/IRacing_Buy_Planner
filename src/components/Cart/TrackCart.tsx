import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";
import VariantCounter from "../../lib/VariantCounter.ts";

const TrackCart = () =>{

    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState<any[]>([]);
    const [fullTrackList, setFullTrackList] = useState<any>([]);

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
        let trackCart = await store.get("trackCart");
        let tracks = await store.get("tracks");
        // @ts-ignore
        setCart(trackCart);
        setFullTrackList(tracks);
    }

    const calcPrice = () => {
        let price = 0;
        for(let i = 0; i < cart.length; i++){
            price = cart[i].track_price + price;
        }
        return price.toFixed(2);
    }

    const removeFromCart = async (id:any) => {
        setCart(cart.filter(item => item.package_id !== id));
        const store = await load("store.json", {autoSave: true});
        await store.set("trackCart", cart.filter(item => item.package_id !== id));
    }

    if(loading){
        return (
            <div>
                <div className="py-8 text-2xl underline underline-offset-1">Tracks</div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                        <tr>
                            <th></th>
                            <th>Track Name</th>
                            <th>Variants</th>
                            <th>Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td><p>Tracks in Cart: {cart.length}</p></td>
                            <td></td>
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
            <div className="py-8 text-2xl underline underline-offset-1">Tracks</div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Track Name</th>
                            <th>Variants</th>
                            <th>Cost</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            cart.map((track: any) => (
                                <tr key={track.id}>
                                    <td>
                                        <button className="btn btn-error"
                                                onClick={() => removeFromCart(track.track_id)}>
                                            Remove
                                        </button>
                                    </td>
                                    <td>{track.track_name}</td>
                                    <td>{VariantCounter(fullTrackList, track.track_name)}</td>
                                    <td>{track.track_price}$</td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td></td>
                            <td><p>Tracks in Cart: {cart.length}</p></td>
                            <td></td>
                            <td><p>Price without VAT: {calcPrice()}$</p></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="divider"></div>
            </div>
    );
}

export default TrackCart;