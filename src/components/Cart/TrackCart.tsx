import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";

const TrackCart = () =>{

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
        let trackCart = await store.get("trackCart");
        // @ts-ignore
        setCart(trackCart);
    }

    const calcPrice = () => {
        let price = 0;
        for(let i = 0; i < cart.length; i++){
            price = cart[i].cost + price;
        }
        return price.toFixed(2);
    }

    if(loading){
        return <p>loading...</p>
    }
    return(
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
                                <td></td>
                                <td>{track.name}</td>
                                <td>{track.variants}</td>
                                <td>{track.cost}</td>
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