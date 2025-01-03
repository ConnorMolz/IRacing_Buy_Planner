import {useEffect, useState} from "react";
import { load } from '@tauri-apps/plugin-store';

const CarTable = () => {

    const [loading, setLoading] = useState(true);
    const [carData, setCarData] = useState<any>([]);

    useEffect(() => {
            if(carData.length > 20){
                setLoading(false);
            }
            else {
                getCars().then();
            }
        },[carData]
    );

    useEffect(() => {
        getCars().then();
    }, []
    );

    const getCars = async () =>{
        const store = await load('store.json', { autoSave: false });

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
                        <td>{car.owned ? <p className="text-xl accent-green-500">Owned</p> : <button className="btn btn-primary">Add to Cart</button>}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    </div>
    );
}

export default CarTable;