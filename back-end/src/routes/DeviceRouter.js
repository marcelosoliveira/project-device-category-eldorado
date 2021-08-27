const express = require('express');
const status = require('http-status-codes');

const { listAllDevices, listAllDevicesFilter, createDevice, deleteDevice } = require('../controller/DeviceController');
const { fieldValidDevice } = require('../middlewares/FieldValidDevice');

const router = express.Router();

router.get("/", listAllDevices);

router.post("/", fieldValidDevice, createDevice);

router.get("/:id", listAllDevicesFilter);

router.delete("/:id", deleteDevice);

router.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).send( { error: `Error! ${err.message}` });
});

module.exports = router;