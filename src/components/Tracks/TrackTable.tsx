import {useEffect, useState} from "react";
import { load } from '@tauri-apps/plugin-store';

const TrackTable = () => {

    const [loading, setLoading] = useState(true);
    const [trackData, setTrackData] = useState<any>([]);

    useEffect(() => {
            if(trackData.length > 20){
                setLoading(false);
            }
            else {
                getCars().then();
            }
        },[trackData]
    );

    useEffect(() => {
            getCars().then();
        }, []
    );

    const getCars = async () =>{
        const store = await load('store.json', { autoSave: false });

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
                            <td>{track.owned ? <p className="text-xl accent-green-500">Owned</p> : <button className="btn btn-primary">Add to Cart</button>}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default TrackTable;