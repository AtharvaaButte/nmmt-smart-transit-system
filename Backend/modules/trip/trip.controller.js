import {addTripInDB} from './trip.service.js'

export async function createTrip(req,res) {
    const user = req.user;
    const {
        route_id, 
        bus_id,
        driver_id,
        conductor_id,
        start_time,
        end_time,
        status
    } = req.body;

    const newTrip = await addTripInDB
    (   
        route_id, 
        bus_id,
        driver_id,
        conductor_id,
        start_time,
        end_time,
        status,
        user.id
    )
    res.status(200).json({
        status:"success",
        data: {trip: newTrip}
    })
}