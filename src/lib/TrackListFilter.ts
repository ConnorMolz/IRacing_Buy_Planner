const TrackListFilter = (trackList: {package_id: number}[]) => {
    // Create a Map to track seen package_ids
    const seen = new Map();

    // Filter the array
    return trackList.filter(item => {
        if (!seen.has(item.package_id)) {
            seen.set(item.package_id, true);
            return true; // Keep this item
        }
        return false; // Skip duplicates
    });
}

export default TrackListFilter;