import {useEffect, useState} from "react";
import { load } from '@tauri-apps/plugin-store';
import trackListFilter from "../../lib/TrackListFilter.ts";
import VariantCounter from "../../lib/VariantCounter.ts";

const TrackTable = () => {

    const [loading, setLoading] = useState(true);
    const [trackData, setTrackData] = useState<any>([]);
    const [render, setRender] = useState(false)
    const [cart, setCart] = useState<any>([]);
    const [fullTrackList, setFullTrackList] = useState<any>([])

    useEffect(() => {
            if(trackData.length > 20){
                setLoading(false);
                getCart().then()
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
        try {
            if (tracks.length < 10) {
                let tracks = await import('../../data/tracks.json');
                console.log(tracks.default);
                await store.set('tracks', tracks.default);
                setTrackData(
                    trackListFilter(
                        tracks.default.filter(item => !item.track_owned)
                            .sort(function(a, b) {
                                const textA = a.track_name.toUpperCase();
                                const textB = b.track_name.toUpperCase();
                                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                            })
                    )
                );
                setFullTrackList(tracks.default);
                return;
            }
        }
        catch (e) {
            let tracks = await import('../../data/tracks.json');
            console.log(tracks.default);
            await store.set('tracks', tracks.default);
            setTrackData(
                trackListFilter(
                    tracks.default.filter(item => !item.track_owned)
                        .sort(function(a, b) {
                            const textA = a.track_name.toUpperCase();
                            const textB = b.track_name.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        })
                )
            );
            setFullTrackList(tracks.default);
            return;
        }
        setTrackData(
            trackListFilter(
                tracks.filter((item: { track_owned: boolean; }) => !item.track_owned)
                    .sort(function(a: { track_name: string; }, b: { track_name: string; }) {
                        const textA = a.track_name.toUpperCase();
                        const textB = b.track_name.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    })
            )
        );
        setFullTrackList(tracks);
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
                if(cart[i].package_id == id){
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
        console.log(id);
        const store = await load('store.json', { autoSave: true });
        let trackCart = await store.get("trackCart");
        if(!trackCart){
            trackCart = []
        }
        // @ts-ignore
        trackCart.push(trackData.filter(item => item.package_id === id)[0]);
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
                        <tr key={track.package_id}>
                            <td></td>
                            <td>{track.track_name}</td>
                            <td>{VariantCounter(fullTrackList, track.track_name)}</td>
                            <td>{track.track_price}$</td>
                            <td>{track.owned ?
                                <p className="text-xl accent-green-500">Owned</p> : checkInCart(track.package_id)}
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