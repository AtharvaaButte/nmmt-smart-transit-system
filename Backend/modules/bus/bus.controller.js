import {addBusInDB} from './bus.service.js'

export async function createBus(req,res) {
    const user = req.user;
    const {bus_no,status} = req.body;

    const newBus = await addBusInDB(bus_no,status,user.id);

    res.status(200).json({
        status: 'success',
        data: {bus: newBus}
    })
}