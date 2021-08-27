const deviceModel = require('../model/Device');

const listAllDevices = async () => {
    const devices = await deviceModel.listAllDevices();

    return devices;
}

const listAllDevicesFilter = async (id) => {
    const devices = await deviceModel.listAllDevicesFilter(id);

    return devices;
}

const createDevice = async (name, cor, part_number, id_category) => {
    await deviceModel.createDevice(name, cor, part_number, id_category);
}

const deleteDevice = async (id) => {
    await deviceModel.deleteDevice(id);
}

module.exports = {
    listAllDevices,
    listAllDevicesFilter,
    createDevice,
    deleteDevice,
}
