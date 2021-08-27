require('dotenv/config');
const express = require('express');
const status = require('http-status-codes');
const cors = require('cors');
// const swaggerUi = require('swagger-ui-express'),
// swaggerDocument = require('./swagger.json');
const deviceRouter = require('./src/routes/DeviceRouter');
const categoryRouter = require('./src/routes/CategoryRouter');
const app = express();
app.use(cors());
app.use(express.json());

// app.use(
//   '/swagger.html-ui',
//   swaggerUi.serve, 
//   swaggerUi.setup(swaggerDocument)
// );

const { PORT } = process.env;

app.use("/devices", deviceRouter);
app.use("/category", categoryRouter);

app.listen(PORT, () => {
    console.log(`App executando na porta ${ PORT }`);
});

app.use((err, _req, res, _next) => {
    res.status(status.INTERNAL_SERVER_ERROR).json({
        Error: `ERROR! ${err.message}`,
    })
});