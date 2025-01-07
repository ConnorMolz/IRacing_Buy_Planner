const MyTracks = (tracks:any[]) => {
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                <tr>
                    <th></th>
                    <th>Track Name</th>
                    <th>Variants</th>
                </tr>
                </thead>
                <tbody>
                {
                    tracks.tracks.map((track: any) => (
                        <tr key={track.id}>
                            <td></td>
                            <td>{track.name}</td>
                            <td>{track.variants}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default MyTracks;