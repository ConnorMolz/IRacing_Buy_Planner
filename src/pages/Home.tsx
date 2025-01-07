import {Link} from "react-router";
import Navbar from "../components/Navbar.tsx";
import {useEffect} from "react";
import {load} from "@tauri-apps/plugin-store"

const Home = () =>{

    useEffect(() => {
       checkStore().then();
    });

    const checkStore = async() => {
        const store = await load("store.json", {autoSave:true});

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
                return;
            }
        }
        catch (e) {
            let tracks = await import('../data/tracks.json');
            console.log(tracks.default);
            await store.set('tracks', tracks.default);
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
    }

    return(
        <div>
            <Navbar/>
            <div className="py-2.5"></div>
            <div className="justify-center flex py-2.5">
                <Link to={"/cars"} className="btn btn-primary h-20 w-4/5">Cars</Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/tracks"} className="btn btn-primary h-20 w-4/5">Tracks</Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/cart"} className="btn btn-primary h-20 w-4/5">Cart</Link>
            </div>
            <div className="justify-center flex py-2.5">
                <Link to={"/my-content"} className="btn btn-primary h-20 w-4/5">My Content</Link>
            </div>


        </div>
    );
}

export default Home;