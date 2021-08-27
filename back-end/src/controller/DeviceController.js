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

module.exports = {
    listAllDevices,
}
