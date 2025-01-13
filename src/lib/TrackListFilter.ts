const TrackListFilter = (trackList: {track_name: string}[]) => {
    // Create a Set to track seen track_names
    const seen = new Set();

    // Filter the array
    return trackList.filter(item => {
        if (!seen.has(item.track_name)) {
            seen.add(item.track_name);
            return true; // Keep this item
        }
        return false; // Skip duplicates
    });
}

export default TrackListFilter;