const status = require('http-status-codes');
const deviceService = require('../services/DeviceService');
const categoryService = require('../services/CategoryService');

const fieldValidDevice = async (req, res, next) => {
    const { name, color, part_number, id_category } = req.body;

    if (!name || typeof name != "string" || name.length < 3 || name.length > 100) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo nome inválido!" });
    }

    if (!color || typeof color != 'string' || color.length < 3 || color.length > 16) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo cor inválido!" });
    }

    if (!part_number || typeof part_number != 'number' || part_number < 1) {
        return res.status(status.BAD_REQUEST).send({ message: "Campo número da peça inválido!" });
    }

    if (!id_category || typeof id_category != 'number') {
        return res.status(status.BAD_REQUEST).send({ message: "Campo identificação de categoria inválido!" });
    }

    const device = await deviceService.findByDevice(part_number);

    if (device) return res.status(status.CONFLICT).send({ message: "Número de peça do dispositivo já existe!" });

    const category = await categoryService.findById(id_category);

    if (!category) return res.status(status.NOT_FOUND).send({ message: "Id de categoria não encontrado!" });

    next();
}

const deviceNotFound = async (req, res, next) => {
    const { id } = req.params;

    const device = await deviceService.findById(id);

    if (!device) return res.status(status.NOT_FOUND).send({ message: `Dispositivo não encontrada! ID: ${id}` });

    next();
}

module.exports = {
    fieldValidDevice,
    deviceNotFound,
}
