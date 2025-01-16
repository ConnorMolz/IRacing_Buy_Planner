import {Link} from "react-router";
import Navbar from "../components/Navbar.tsx";
import {useEffect, useState} from "react";
import {load} from "@tauri-apps/plugin-store"

const Home = () =>{

    const [datasetUpdate, setDatasetUpdate] = useState<boolean>(false)

    useEffect(() => {
       checkStore().then();
    });

    const checkStore = async() => {
        const store = await load("store.json", {autoSave:true});

        const newestDataVersion = 1
        await store.set("current-version", newestDataVersion);

        const current = await store.get('data-version')
        if(current != 1){
            await store.set('data-version', 1);
        }

        if(current != newestDataVersion){
            setDatasetUpdate(true);
        }

        // Cars
        const cars = await store.get<any>('cars');
        console.log(cars)
        try {
            if (cars.length < 20) {
                const cars = await import('../data/cars.json');
                console.log(cars.default);
                await store.set('cars', cars.default);
                return;
            }
        }
        catch (e){
            const cars = await import('../data/cars.json');
            console.log(cars.default);
            await store.set('cars', cars.default);
            return;
        }

        //Tracks
        const tracks = await store.get<any>('tracks');
        console.log(tracks)
        try {
            if (tracks.length < 10) {
                let tracks = await import('../data/tracks.json');
                console.log(tracks.default);
                await store.set('tracks', tracks.default);
                await store.set('data-version', 1);
                return;
            }
        }
        catch (e) {
            let tracks = await import('../data/tracks.json');
            console.log(tracks.default);
            await store.set('tracks', tracks.default);
            await store.set('data-version', 1);
            return;
        }

        // Carts
        let carCart = await store.get<any>("carCart");
        let trackCart = await store.get<any>("trackCart");

        if(!carCart){
            await store.set("carCart", []);
        }
        if(!trackCart){
            await store.set("trackCart", []);
        }

        // Schedule
        const schedule = await store.get<any[]>("season");
        try {
            // @ts-ignore
            if (schedule.length < 10) {
                let schedule = await import('../data/season.json');
                console.log(schedule.default);
                await store.set('season', schedule.default);
                return;
            }
        }
        catch (e) {
            let schedule = await import('../data/season.json');
            console.log(schedule.default);
            await store.set('season', schedule.default);
            return;
        }

    }

    return(
        <div>
            <Navbar/>
            {datasetUpdate &&
                <div role="alert" className="alert alert-info">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="h-6 w-6 shrink-0 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span><Link to={"/Options"}>A new dataset update available.</Link></span>
                </div>
            }
            <div className="py-2.5"></div>
            <div className="justify-center flex py-2.5">
                <Link to={"/cars"} className="btn btn-primary h-20 w-4/5">
                    Cars
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-car-front-fill" viewBox="0 0 16 16">
                        <path
                            d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2m10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17s3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
                    </svg>
                </Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/tracks"} className="btn btn-primary h-20 w-4/5">
                    Tracks
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-sign-turn-slight-right" viewBox="0 0 16 16">
                        <path
                            d="m8.335 6.982.8 1.386a.25.25 0 0 0 .451-.039l1.06-2.882a.25.25 0 0 0-.192-.333l-3.026-.523a.25.25 0 0 0-.26.371l.667 1.154-.621.373A2.5 2.5 0 0 0 6 8.632V11h1V8.632a1.5 1.5 0 0 1 .728-1.286z"/>
                        <path fill-rule="evenodd"
                              d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134Z"/>
                    </svg>
                </Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/cart"} className="btn btn-primary h-20 w-4/5">
                    Cart
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-cart" viewBox="0 0 16 16">
                        <path
                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                </Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/Schedule"} className="btn btn-primary h-20 w-4/5">
                    Schedule
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-calendar-week" viewBox="0 0 16 16">
                        <path
                            d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm-5 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                        <path
                            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                    </svg>
                </Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/my-content"} className="btn btn-primary h-20 w-4/5">
                    My Content
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                         className="bi bi-cart-check" viewBox="0 0 16 16">
                        <path
                            d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z"/>
                        <path
                            d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/>
                    </svg>
                </Link>
            </div>


        </div>
    );
}

export default Home;