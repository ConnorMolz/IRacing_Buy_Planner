import {load} from "@tauri-apps/plugin-store";
import {useEffect, useState} from "react";

interface plan {
    plan: any[],
    tracks: any[]
}

const Schedule = (plan:plan) => {

    const[render, setRender] = useState(false);

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
        let trackCart = await store.get("trackCart");
        if(!trackCart){
            trackCart = []
        }
        // @ts-ignore
        trackCart.push(trackData.filter(item => item.package_id === track_id)[0]);
        await store.set("trackCart", trackCart);
        setRender(true);
    }

    return(
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
                {
                    plan.plan.map((series) =>(

                        <div tabIndex={0}
                             className="collapse collapse-plus border-base-300 bg-base-100 border">
                            <div className="collapse-title font-semibold">{series.series_name}</div>
                            <div className="collapse-content text-sm">
                                {series.schedule.map((week:any) =>(
                                    <div key={week.week}>
                                        <div className="font-bold">Week: {week.week}</div>
                                        <div>Race Distance: {distanceFormatter(week.race_lap_limit, week.race_time_limit)}</div>
                                        <div>Start type: {week.start_type} Start</div>
                                        <div>Track: {week.track.track_name}</div>
                                        {
                                            !getOwned(week.track.track_id)&&
                                            <div className="flex justify-end">
                                                <button onClick={() => addToCart(week.track.track_id)} className="btn-primary btn">
                                                    Add to Cart
                                                </button>
                                            </div>
                                        }
                                        {
                                            getOwned(week.track.track_id)&&
                                            <div className="flex justify-end">Owned</div>
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