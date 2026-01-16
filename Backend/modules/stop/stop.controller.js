import {addStopInDB} from './stop.service.js'

export async function createStop(req,res) {
    const user = req.user;
    const {stop_nm, latitude, longitude} = req.body;

    const newStop = await addStopInDB(stop_nm,latitude,longitude,user.id);
    console.log(newStop);
    
    res.status(200).json({
        status:"success",
        data: {stop: newStop}
    })
}