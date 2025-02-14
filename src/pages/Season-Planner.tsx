import {useEffect, useState} from "react";
import Navbar from "../components/Navbar.tsx";
import {load} from "@tauri-apps/plugin-store";
import Schedule from "../components/Season-Planner/Schedule.tsx";

const SeasonPlanner = () => {
    const [plan, setPlan] = useState<any>([]);
    const [tracks, setTracks] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [trackCart, setTrackCart] = useState<any>([]);
    useEffect(() => {
        getSeasonPlan().then(() => setLoading(false));
    }, []);

    const getSeasonPlan = async () => {
        const store = await load("store.json", {autoSave: true});

        const content = await store.get("season");
        const trackList = await store.get("tracks");
        const trackCartFunc = await store.get("trackCart");
        setTracks(trackList);
        setPlan(content);
        setTrackCart(trackCartFunc);
    }

    if(loading){
        return(
            <div>loading...</div>
        )
    }

    return (
        <div>
            <Navbar />
            <Schedule plan={plan} tracks={tracks} trackCart={trackCart} />
        </div>
    )

}

export default SeasonPlanner;