interface plan {
    plan: any[],
    tracks: any[]
}

const Schedule = (plan:plan) => {
    console.log(plan)
    const distanceFormatter = (laps:any, min:any) => {
        if(laps != null){
            return laps + " Laps"
        }
        return min + " Min"
    }

    return(
        <div>
            <ul className="list bg-base-100 rounded-box shadow-md">
                {
                    plan.plan.map((series) =>(

                            <div tabIndex={0}
                                 className="collapse collapse-plus border-base-300 bg-base-100 border">
                                <div className="collapse-title font-semibold">{series.series_name}</div>
                                <div className="collapse-content text-sm">
                                    {series.schedule.map((week:any) =>(
                                        <div key={week.week}>
                                            <div className="font-bold">Week: {week.week}</div>
                                            <div>Race Distance: {distanceFormatter(week.race_lap_limit, week.race_time_limit)}</div>
                                            <div>Start type: {week.start_type} Start</div>
                                            <div>Track: {week.track.track_name}</div>
                                            { week.week != 12 &&
                                                <div className="divider" />
                                            }
                                        </div>
                                        ))
                                    }
                                </div>
                            </div>

                    ))
                }
            </ul>
        </div>
    )
}

export default Schedule;