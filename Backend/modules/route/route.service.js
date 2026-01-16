import sql from '../../database/db.js'

export async function addRouteInDB(route_nm, route_no, estimated_time, stops_info,creadted_by) {
    const result = await sql`
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
    const route_id = result[0].route_id;
    
    const finalStopsData = stops_info.map(stop =>({
        ...stop,
        route_id
    }));
    const newStops = await sql
    `
     INSERT INTO route_stops ${sql(finalStopsData)}
     RETURNING route_id, stop_id, sequence_no, et_from_previous
    `
    result[0].stops = newStops;
    return result[0];
}