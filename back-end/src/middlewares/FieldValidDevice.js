const status = require('http-status-codes');
const deviceService = require('../services/DeviceService');

const fieldValidDevice = async (req, res, next) => {
    const { name, color, part_number } = req.body;

    if (!name || typeof name != "string" || name.length < 3 || name.length > 100) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo nome inválido!" });
    }

    if (!color || typeof color != 'string' || color.length < 3 || color.length > 16) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo cor inválido!" });
    }

    if (!part_number || typeof part_number != 'number' || part_number < 1) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo número da peça inválido!" });
    }

    const device = await deviceService.findByDevice(part_number);

    if (device) return res.status(status.CONFLICT).send({ message: "Número de peça do dispositivo já existe!" });

    next();
}

module.exports = {
    fieldValidDevice,
}
