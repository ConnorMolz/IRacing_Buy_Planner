import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store";

const UpdateData = () => {

    const [currentVersion, setCurrentVersion] = useState<number>(0);
    const [newestVersion, setNewestVersion] = useState<number>(0);
    const [loading, setLoading] = useState(true)

    useEffect(() =>{
        getVersions().then(() => setLoading(false));
    })

    const getVersions = async () => {
        const store = await load("store.json", {autoSave: true});
        const current = await store.get<number>("data-version");
        const newest = await store.get<number>("current-version");
        // @ts-ignore
        setCurrentVersion(current);
        // @ts-ignore
        setNewestVersion(newest);
    }

    const update = async () => {
        const store = await load("store.json", {autoSave: true});
        const currentCarData = await store.get("cars");
        const currentTrackData = await store.get("tracks");
        const currentSessionData = await store.get("");
        // Implement with update
        console.log(currentCarData, currentTrackData, currentSessionData);
    }

    if(loading){
        return (
            <div>loading...</div>
        )
    }

    return(
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Update all Data sets</h2>
                    <p></p>
                    <div className="card-actions justify-start">
                        <ul>
                            <li>Your current version is: v{currentVersion}</li>
                            <li>The newest Version is: v{newestVersion}</li>
                            <li>
                                <button onClick={() => update()} className="btn btn-primary">Update</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateData;