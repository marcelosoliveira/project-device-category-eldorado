const conn = require('../../config/connect')

const listAllDevices = async () => {
    const [devices] = await conn.execute(`SELECT d.id AS Id, d.name AS Name,
     d.cor AS Cor, d.part_number AS PartNumber, c.name AS Category FROM device AS d 
    INNER JOIN category AS c ON c.id = d.id_category`);

    return devices;
}

module.exports = {
    listAllDevices,
}
