import {load} from "@tauri-apps/plugin-store";

const ResetStore = () => {

    const reset = async () => {
        const store = await load("store.json", {autoSave: true});
        await store.set("carCart", []);
        await store.set("trackCart", []);
        await store.set("cars", []);
        await store.set("tracks", []);
    }

    return(
        <div>
            <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Reset all Lists and Cards</h2>
                    <p></p>
                    <div className="card-actions justify-end">
                        <button onClick={() => reset()} className="btn btn-error">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetStore;