import sql from '../../database/db.js'

export async function addRouteInDB(route_nm, route_no, estimated_time, stops_info,creadted_by) {
    
    const result = await sql.begin(async (tx)=>{
        const result = await  tx`
        INSERT INTO routes 
        (
        route_nm,
        route_no,
        estimated_time,
        created_by
        )
        VALUES
        (
        ${route_nm},
        ${route_no},
        ${estimated_time},
        ${creadted_by}
        )
        RETURNING route_id , route_nm, route_no, estimated_time
        `
        console.log(result);
        
        const route_id = result[0].route_id;
        
        const finalStopsData = stops_info.map(stop =>({
            ...stop,
            route_id
        }));
        const newStops = await tx
        `
         INSERT INTO route_stops ${tx(finalStopsData)}
         RETURNING route_id, stop_id, sequence_no, et_from_previous
        `
        return result[0].stops = newStops;
        

    })
    
    return result;
}