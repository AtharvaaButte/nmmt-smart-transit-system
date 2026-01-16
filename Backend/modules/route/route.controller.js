import {addRouteInDB} from './route.service.js'

export async function createRoute(req,res) {
    const user = req.user;

    const {route_nm, route_no, estimated_time, stops_info} = req.body;

    const newRoute = await addRouteInDB(route_nm, route_no, estimated_time, stops_info,user.id)

    res.status(200).json({
        status: "success",
        data: {route : newRoute} 
    })
}