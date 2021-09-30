'use strict';

const port = 8010;

const logger = require('./src/helpers/logger');
const sqlite3 = require('sqlite3').verbose();
const buildSchemas = require('./src/schemas');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const db = new sqlite3.Database(':memory:');
const app = require('./src/app')(db);

db.serialize(() => {
  buildSchemas(db);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
