import sql from "../../database/db.js"

export async function addStopInDB(stop_nm,latitude,longitude,createdBy) {
    const result = await sql `
    INSERT INTO stops 
    (
    stop_nm, 
    latitude,
    longitude,
    created_by
    )
    VALUES
    (
    ${stop_nm},
    ${latitude},
    ${longitude},
    ${createdBy}
    )

    RETURNING stop_nm,latitude,longitude
    `
    return result[0];
}