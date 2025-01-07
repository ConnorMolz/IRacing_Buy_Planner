interface cars {
    carList: any[],
}

const MyCars = (cars: cars) => {
    console.log(cars.carList);
    if (cars.carList.length == 0) {
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
                    cars.carList.map((car: any) => (
                        <tr key={car.id}>
                            <td>{car.name}</td>
                        </tr>
                    ))
                }
                <tr></tr>
                </tbody>
            </table>
        </div>
    )
}

export default MyCars;