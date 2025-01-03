import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";
import Navbar from "../components/Navbar.tsx";

const MyContent = () =>{
    const [carData, setCarData] = useState<any>([]);
    const [render, setRender] = useState(false)
    const [trackData, setTrackData] = useState<any>([]);


    useEffect(() => {
            getCars().then();
            getTracks().then()
        }
    );

    useEffect(() => {
        setRender(false)
    },[render]);


    const getCars = async () =>{
        const store = await load('store.json', { autoSave: true });

        let cars = await store.get<any>('cars');
        console.log(cars)
        cars = cars.filter((item: { owned: boolean; }) => item.owned);
        setCarData(cars)
    }

    const getTracks = async () =>{
        const store = await load('store.json', { autoSave: true });

        let tracks = await store.get<any>('tracks');
        console.log(tracks)
        tracks = tracks.filter((item: {owned: boolean; }) => item.owned);
        setTrackData(tracks)
    }

    return (
        <div>
            <Navbar />
            <div className="py-8 text-2xl underline underline-offset-1">Cars</div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Car Name</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        carData.map((car: any) => (
                            <tr key={car.id}>
                                <td></td>
                                <td>{car.name}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
            <div className="py-8 text-2xl underline underline-offset-1">Tracks</div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                    <tr>
                        <th></th>
                        <th>Track Name</th>
                        <th>Variants</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        trackData.map((track: any) => (
                            <tr key={track.id}>
                                <td></td>
                                <td>{track.name}</td>
                                <td>{track.variants}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MyContent;