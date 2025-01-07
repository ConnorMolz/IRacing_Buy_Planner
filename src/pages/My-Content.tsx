import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";
import Navbar from "../components/Navbar.tsx";
import MyCars from "../components/My-Content/MyCars.tsx";
import MyTracks from "../components/My-Content/MyTracks.tsx";

const MyContent = () =>{
    const [carData, setCarData] = useState<any>([]);
    const [render, setRender] = useState(false);
    const [trackData, setTrackData] = useState<any>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            getCars().then();
            getTracks().then(() =>
                setLoading(false)
            );
        }
    );

    useEffect(() => {
        setRender(false)
    },[render]);


    const getCars = async () =>{
        const store = await load('store.json', { autoSave: true });

        let cars = await store.get<any>('cars');
        console.log(cars)
        cars = cars.filter((item: { owned: boolean; }) => item.owned)
            .sort(function(a: { name: string; }, b: { name: string; }) {
                const textA = a.name.toUpperCase();
                const textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        setCarData(cars)
    }

    const getTracks = async () =>{
        const store = await load('store.json', { autoSave: true });

        let tracks = await store.get<any>('tracks');
        console.log(tracks)
        tracks = tracks.filter((item: {owned: boolean; }) => item.owned)
            .sort(function(a: { name: string; }, b: { name: string; }) {
                const textA = a.name.toUpperCase();
                const textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        setTrackData(tracks)
    }

    if(loading){
        return <div>Loading...</div>
    }


    return (
        <div>
            <Navbar />
            <div className="py-8 text-2xl underline underline-offset-1">Cars</div>
            <MyCars cars={carData}/>
            <div className="py-8 text-2xl underline underline-offset-1">Tracks</div>
            <MyTracks tracks={trackData}/>
        </div>
    );
}

export default MyContent;