const express = require('express');
const status = require('http-status-codes');

const { listAllDevices } = require('../controller/DeviceController');

const router = express.Router();

router.get("/", listAllDevices);

router.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).send( { error: `Error! ${err.message}` });
});

module.exports = router;