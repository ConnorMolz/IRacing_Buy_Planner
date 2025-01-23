import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";
import Navbar from "../components/Navbar.tsx";
import MyCars from "../components/My-Content/MyCars.tsx";
import MyTracks from "../components/My-Content/MyTracks.tsx";
import trackListFilter from "../lib/TrackListFilter.ts";

const MyContent = () =>{
    const [freeCarData, setFreeCarData] = useState<any>([]);
    const [paidCarData, setPaidCarData] = useState<any>([])
    const [render, setRender] = useState(false);
    const [freeTrackData, setFreeTrackData] = useState<any>([]);
    const [paidTrackData, setPaidTrackData] = useState<any>([]);
    const [fullTrackList, setFullTrackList] = useState<any>([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
            getCars().then();
            getTracks().then(() =>
                setLoading(false)
            );
        },[]
    );

    useEffect(() => {
        setRender(false)
    },[render]);


    const getCars = async () =>{
        const store = await load('store.json', { autoSave: true });

        let cars = await store.get<any>('cars');
        const freeCars = cars.filter((item: { car_owned: boolean; free:boolean}) => item.car_owned && item.free)
            .sort(function(a: { car_name: string; }, b: { car_name: string; }) {
                const textA = a.car_name.toUpperCase();
                const textB = b.car_name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        const paidCars = cars.filter((item: { car_owned: boolean; free:boolean}) => item.car_owned && !item.free)
            .sort(function(a: { car_name: string; }, b: { car_name: string; }) {
                const textA = a.car_name.toUpperCase();
                const textB = b.car_name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        setFreeCarData(freeCars);
        setPaidCarData(paidCars);

    }

    const getTracks = async () =>{
        const store = await load('store.json', { autoSave: true });

        let tracks = await store.get<any>('tracks');
        const freeTracks = tracks.filter((item: {track_owned: boolean; free:boolean }) => item.track_owned && item.free)
            .sort(function(a: { track_name: string; }, b: { track_name: string; }) {
                const textA = a.track_name.toUpperCase();
                const textB = b.track_name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        const paidTracks = tracks.filter((item: {track_owned: boolean; free:boolean }) => item.track_owned && !item.free)
            .sort(function(a: { track_name: string; }, b: { track_name: string; }) {
                const textA = a.track_name.toUpperCase();
                const textB = b.track_name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });
        setFreeTrackData(trackListFilter(freeTracks));
        setPaidTrackData(trackListFilter(paidTracks));
        setFullTrackList(tracks);
    }

    if(loading){
        return <div>Loading...</div>
    }


    return (
        <div>
            <Navbar/>
            <div className="py-4 divider divider-start text-3xl underline underline-offset-1">Your Paid Content</div>
            <div className="py-8 text-2xl underline underline-offset-1">Cars</div>
            <MyCars carList={paidCarData}/>
            <div className="py-8 text-2xl underline underline-offset-1">Tracks</div>
            <MyTracks trackList={paidTrackData} allTracks={fullTrackList}/>
            <div className="flex w-full flex-col">
                <div className="divider divider-start py-12 text-3xl underline underline-offset-1">Free Content</div>
            </div>
            <div className="py-8 text-2xl underline underline-offset-1">Cars</div>
            <MyCars carList={freeCarData}/>
            <div className="py-8 text-2xl underline underline-offset-1">Tracks</div>
            <MyTracks trackList={freeTrackData} allTracks={fullTrackList}/>
        </div>
    );
}

export default MyContent;