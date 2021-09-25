const conn = require('../../config/connect')

const listAllDevices = async () => {
    const [devices] = await conn.execute(`SELECT d.id AS id, d.name AS name,
    d.color AS color, d.part_number AS part_number, c.name AS category FROM device AS d 
    INNER JOIN category AS c ON c.id = d.id_category`);

    return devices;
}

const listAllDevicesFilter = async (id) => {
    const [devices] = await conn.execute(`SELECT d.id AS id, d.name AS name,
    d.color AS color, d.part_number AS part_number, c.name AS category FROM device AS d 
    INNER JOIN category AS c ON c.id = d.id_category WHERE c.id = ?`, [id]);

    return devices;
}

const createDevice = async (name, color, part_number, id_category) => {
    await conn.execute(`INSERT INTO device(name, color, part_number, id_category)
    VALUES(?, ?, ?, ?)`, [name, color, part_number, id_category]);
}

const findByDevice = async (part_number) => {
    const [device] = await conn.execute(`SELECT * FROM device WHERE part_number = ?`, [part_number]);

    return device[0];
}

const findById = async (id) => {
    const [device] = await conn.execute(`SELECT * FROM device WHERE id = ?`, [id]);

    return device[0];
}

const updateDevice = async (id, name, color, part_number, id_category) => {
    await conn.execute(`UPDATE device SET name = ?, color = ?, part_number = ?,
    id_category = ? WHERE id = ?`,
    [name, color, part_number, id_category, id]);
}

const deleteDevice = async (id) => {
    await conn.execute(`DELETE FROM device WHERE id = ?`, [id]);
}


module.exports = {
    listAllDevices,
    listAllDevicesFilter,
    createDevice,
    findByDevice,
    findById,
    updateDevice,
    deleteDevice,
}
