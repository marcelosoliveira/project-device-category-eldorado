const conn = require('../../config/connect')

const listAllDevices = async () => {
    const [devices] = await conn.execute('SELECT * FROM device');

    return devices;
}

module.exports = {
    listAllDevices,
}
