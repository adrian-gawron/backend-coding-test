'use strict';

const port = 8010;

const logger = require('./src/handler/handler')
const sqlite3 = require('sqlite3').verbose();
const buildSchemas = require('./src/schemas');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    buildSchemas(db);

    const app = require('./src/app')(db);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
