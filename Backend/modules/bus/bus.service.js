import sql from '../../database/db.js'

export async function addBusInDB(bus_no,status,created_by) {
    const result = await sql `
    INSERT INTO bus 
    (
    bus_no,
    status,
    created_by
    )
    VALUES
    (
    ${bus_no},
    ${status},
    ${created_by}
    )
    RETURNING bus_no, status
    `
    return result[0];
    
}