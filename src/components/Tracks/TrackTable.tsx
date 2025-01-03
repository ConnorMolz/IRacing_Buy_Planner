import {useEffect, useState} from "react";
import { load } from '@tauri-apps/plugin-store';

const TrackTable = () => {

    const [loading, setLoading] = useState(true);
    const [trackData, setTrackData] = useState<any>([]);
    const [render, setRender] = useState(false)
    const [cart, setCart] = useState<any>([]);

    useEffect(() => {
            if(trackData.length > 20){
                setLoading(false);
            }
            else {
                getTracks().then();
                getCart().then();
            }
        },[trackData]
    );

    useEffect(() => {
            getTracks().then();
            getCart().then();
        }, []
    );

    const getTracks = async () =>{
        const store = await load('store.json', { autoSave: true });

        const tracks = await store.get<any>('tracks');
        console.log(tracks)
        if (!tracks) {
            const tracks = await import('../../data/tracks.json');
            console.log(tracks.default);
            await store.set('tracks', tracks.default);
            setTrackData(tracks);
            return;
        }
        setTrackData(tracks)
    }

    useEffect(() => {
        setRender(false)
        if(render){}
    });

    const getCart = async () =>{
        const store = await load('store.json', { autoSave: true });
        let carCart = await store.get("trackCart");
        setCart(carCart);
    }

    const checkInCart = (id:any) => {
        try{
            // @ts-ignore
            for(let i = 0; i < cart.length; i++){
                // @ts-ignore
                if(cart[i].id == id){
                    return <p className="text-xl">In Cart</p>
                }
            }
        }
        catch (e){
            console.error(e);
        }
        return <button onClick={() => addToCart(id)} className="btn btn-primary">Add to Cart</button>
    }

    const addToCart = async (id:any) => {
        const store = await load('store.json', { autoSave: true });
        let trackCart = await store.get("trackCart");
        if(!trackCart){
            trackCart = []
        }
        // @ts-ignore
        trackCart.push(trackData[id - 1]);
        setCart(trackCart);
        await store.set("trackCart", trackCart);
        setRender(true);
    }

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Track Name</th>
                    <th>Variants</th>
                    <th>Cost</th>
                    <th>Owned</th>
                </tr>
                </thead>
                <tbody>
                {
                    trackData.map((track: any) => (
                        <tr key={track.id}>
                            <td></td>
                            <td>{track.name}</td>
                            <td>{track.variants}</td>
                            <td>{track.cost}</td>
                            <td>{track.owned ?
                                <p className="text-xl accent-green-500">Owned</p> : checkInCart(track.id)}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default TrackTable;