const status = require('http-status-codes');
const deviceService = require('../services/DeviceService');

const listAllDevices = async (_req, res) => {
    try {
        const devices = await deviceService.listAllDevices();

        res.status(status.OK).send(devices);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

const listAllDevicesFilter = async (req, res) => {
    try {
        const { id } = req.params;
        const devices = await deviceService.listAllDevicesFilter(id);

        res.status(status.OK).send(devices);
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

module.exports = {
    listAllDevices,
    listAllDevicesFilter,
}
