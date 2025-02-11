import {load} from "@tauri-apps/plugin-store";
import {useEffect, useState} from "react";

interface plan {
    plan: any[],
    tracks: any[],
    trackCart: any[]
}

const Schedule = (plan:plan) => {

    const[render, setRender] = useState(false);
    const[trackCart, setTrackCart] = useState(plan.trackCart);

    useEffect(() =>{
        setRender(false);
    },[render]);

    const distanceFormatter = (laps:any, min:any) => {
        if(laps != null){
            return laps + " Laps"
        }
        return min + " Min"
    }

    const getOwned = (track_id:number): boolean => {
        const track = plan.tracks.filter(item => item.track_id == track_id)[0];
        if(track == null){
            return false;
        }
        return plan.tracks.filter(item => item.package_id == track.package_id)[0].track_owned;
    }

    const addToCart = async (id:any) => {
        const track_id = plan.tracks.filter(item => item.track_id == id)[0].package_id;
        const store = await load('store.json', { autoSave: true });
        if(!trackCart){
            // @ts-ignore
            let trackCartF = [];
            console.log(plan.tracks.filter(item => item.package_id === track_id)[0]);
            trackCartF.push(plan.tracks.filter(item => item.package_id === track_id)[0]);
            await store.set("trackCart", trackCartF);
        }
        console.log(plan.tracks.filter(item => item.package_id === track_id)[0]);
        // @ts-ignore
        let trackCartF = trackCart;
        trackCartF.push(plan.tracks.filter(item => item.package_id === track_id)[0]);
        console.log(trackCartF);
        console.log(plan.tracks);
        await store.set("trackCart", trackCartF);
        setTrackCart(trackCartF);
        setRender(true);
    }

    const checkInCart = (id:any) => {
        const track_id = plan.tracks.filter(item => item.track_id == id)[0].package_id;
        try{
            // @ts-ignore
            for(let i = 0; i < plan.trackCart.length; i++){
                // @ts-ignore
                if(plan.trackCart[i].package_id == track_id){
                    return <p className="text-xl">In Cart</p>
                }
            }
        }
        catch (e){
            console.error(e);
        }
        //@ts-ignore
        return <button onClick={() => addToCart(id)} className="btn-primary btn">
            Add to Cart
        </button>;
    }

    return(
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
                {
                    plan.plan.map((series) =>(

                        <div className="collapse collapse-plus border-base-300 bg-base-100 border">
                            <input type="checkbox" />
                            <div className="collapse-title font-semibold">{series.series_name}</div>
                            <div className="collapse-content text-sm">
                                {series.schedule.map((week:any) =>(
                                    <div key={week.week}>
                                        <div className="font-bold">Week: {week.week}</div>
                                        <div>Race Distance: {distanceFormatter(week.race_lap_limit, week.race_time_limit)}</div>
                                        <div>Start type: {week.start_type} Start</div>
                                        <div>Track: {week.track.track_name}</div>
                                        {
                                            <div className="flex justify-end">
                                                {getOwned(week.track.track_id) ?
                                                    <p className="text-xl accent-green-500">Owned</p> : checkInCart(week.track.track_id)
                                                }
                                            </div>
                                        }
                                        { week.week != 12 &&
                                            <div className="divider" />
                                        }
                                    </div>
                                ))
                                }
                            </div>
                        </div>

                    ))
                }
            </ul>
        </div>
    )
}

export default Schedule;