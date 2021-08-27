const conn = require('../../config/connect')

const listAllDevices = async () => {
    const [devices] = await conn.execute(`SELECT d.id AS Id, d.name AS Name,
    d.cor AS Cor, d.part_number AS PartNumber, c.name AS Category FROM device AS d 
    INNER JOIN category AS c ON c.id = d.id_category`);

    return devices;
}

const listAllDevicesFilter = async (id) => {
    const [devices] = await conn.execute(`SELECT d.id AS Id, d.name AS Name,
    d.cor AS Cor, d.part_number AS PartNumber, c.name AS Category FROM device AS d 
    INNER JOIN category AS c ON c.id = d.id_category WHERE c.id = ?`, [id]);

    return devices;
}

const createDevice = async (name, cor, part_number, id_category) => {
    await conn.execute(`INSERT INTO device(name, cor, part_number, id_category)
    VALUES(?, ?, ?, ?)`, [name, cor, part_number, id_category]);
}

const deleteDevice = async (id) => {
    await conn.execute(`DELETE FROM device WHERE id = ?`, [id]);
}


module.exports = {
    listAllDevices,
    listAllDevicesFilter,
    createDevice,
    deleteDevice,
}
