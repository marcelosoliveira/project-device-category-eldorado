const express = require('express');
const status = require('http-status-codes');

const { listAllDevices, findByIdDevice, listAllDevicesFilter, createDevice, deleteDevice } = require('../controller/DeviceController');
const { fieldValidDevice, deviceNotFound } = require('../middlewares/DeviceExceptionHandler');

const router = express.Router();

router.get("/", listAllDevices);

router.get("/:id", deviceNotFound, findByIdDevice);

router.get("/category/:id", listAllDevicesFilter);

router.post("/create", fieldValidDevice, createDevice);

router.delete("/delete/:id", deviceNotFound, deleteDevice);

router.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).send( { error: `Error! ${err.message}` });
});

module.exports = router;