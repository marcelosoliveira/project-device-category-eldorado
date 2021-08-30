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

const findByIdDevice = async (req, res) => {
    try {
        const { id } = req.params;
        const device = await deviceService.findById(id);

        res.status(status.OK).send(device);
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

const createDevice = async (req, res) => {
    try {
        const { name, color, part_number, id_category } = req.body;
        await deviceService.createDevice(name, color, part_number, id_category);
        res.status(status.CREATED).send({ message: "Device created successfully." });
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

const deleteDevice = async (req, res) => {
    try {
        const { id } = req.params;
        await deviceService.deleteDevice(id);
        res.status(status.OK).send({ message: `Device successfully deleted Id: ${id}.`});      
    } catch (error) {
        res.status(status.INTERNAL_SERVER_ERROR).send({ error: error.message });
    }
}

module.exports = {
    listAllDevices,
    findByIdDevice,
    listAllDevicesFilter,
    createDevice,
    deleteDevice,
}
