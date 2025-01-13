const VariantCounter = (trackList: {track_name: string}[], target_name: string)=> {
    let counter: number = 0;

    for(let i = 0; i < trackList.length; i++){
        if(trackList[i].track_name == target_name){
            counter++;
        }
    }

    return counter;
}

export default VariantCounter