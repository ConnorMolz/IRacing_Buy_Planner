import {useEffect, useState} from "react";
import { load } from '@tauri-apps/plugin-store';

const CarTable = () => {

    const [loading, setLoading] = useState(true);
    const [carData, setCarData] = useState<any>([]);
    const [render, setRender] = useState(false)
    const [cart, setCart] = useState<any>([]);

    useEffect(() => {
            if(carData.length > 20){
                setLoading(false);
            }
            else {
                getCars().then();
                getCart().then();
            }
        },[carData]
    );

    useEffect(() => {
        getCars().then();
        getCart().then();
    }, []
    );

    useEffect(() => {
        setRender(false)
    },[render]);

    const getCart = async () =>{
        const store = await load('store.json', { autoSave: true });
        let carCart = await store.get("carCart");
        setCart(carCart);
    }

    const getCars = async () =>{
        const store = await load('store.json', { autoSave: true });

        const cars = await store.get<any>('cars');
        console.log(cars)
       if (!cars) {
            const cars = await import('../../data/cars.json');
            console.log(cars.default);
            await store.set('cars', cars.default);
            setCarData(cars);
            return;
       }
       setCarData(cars)
    }

    if(loading){
        return (
            <div>Loading...</div>
        )
    }

    const checkInCart = (id:any) => {
        try{
            // @ts-ignore
            for(let i = 0; i < cart.length; i++){
                // @ts-ignore
                if(cart[i].id == id){
                    return <p className="text-xl">In Cart</p>
                }
            }
        }
        catch (e){
            console.error(e);
        }
        return <button onClick={() => addToCart(id)} className="btn btn-primary">Add to Cart</button>
    }

    const addToCart = async (id:any) => {
        const store = await load('store.json', { autoSave: true });
        let carCart = await store.get("carCart");
        if(!carCart){
            carCart = []
        }
        // @ts-ignore
        carCart.push(carData[id - 1]);
        await store.set("carCart", carCart);
        setCart(carCart);
        setRender(true);
    }

    return (
    <div className="overflow-x-auto">
        <table className="table">
            {/* head */}
            <thead>
            <tr>
                <th></th>
                <th>Cars Name</th>
                <th>Cost</th>
                <th>Owned</th>
            </tr>
            </thead>
            <tbody>
            {
                carData.map((car: any) => (
                    <tr key={car.id}>
                        <td></td>
                        <td>{car.name}</td>
                        <td>{car.cost}</td>
                        <td>{car.owned ?
                            <p className="text-xl accent-green-500">Owned</p> : checkInCart(car.id)}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    );
}

export default CarTable;