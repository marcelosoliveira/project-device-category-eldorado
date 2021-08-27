const deviceModel = require('../model/Device');

const listAllDevices = async () => {
    const devices = await deviceModel.listAllDevices();

    return devices;
}

const listAllDevicesFilter = async (id) => {
    const devices = await deviceModel.listAllDevicesFilter(id);

    return devices;
}

module.exports = {
    listAllDevices,
    listAllDevicesFilter,
}
