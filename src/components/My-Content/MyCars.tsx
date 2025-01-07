const MyCars = (cars: any[]) => {
    console.log(cars.cars);
    if (cars.length == 0) {
        return (
            <div></div>
        )
    }
    return (
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
                    cars.cars.map((car: any) => (
                        <tr key={car.id}>
                            <td></td>
                            <td>{car.name}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default MyCars;