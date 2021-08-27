const deviceModel = require('../model/Device');

const listAllDevices = async () => {
    const devices = await deviceModel.listAllDevices();

    return devices;
}

module.exports = {
    listAllDevices,
}
