import VariantCounter from "../../lib/VariantCounter.ts";

interface tracks {
    trackList: any[],
    allTracks: any[]
}

const MyTracks = (tracks:tracks) => {
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
                    tracks.trackList.map((track: any) => (
                        <tr key={track.track_id}>
                            <td></td>
                            <td>{track.track_name}</td>
                            <td>{VariantCounter(tracks.allTracks, track.track_name)}</td>
                        </tr>
                    ))
                }
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MyTracks;