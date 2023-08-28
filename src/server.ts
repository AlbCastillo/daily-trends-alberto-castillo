import app from './app';
import { CONFIG } from './config';
import logger from './logging/winston.logger';
import { MongoDBConnection } from './mongoose';

const port = CONFIG.API.PORT;
const mongoDatabase = new MongoDBConnection(CONFIG.MONGO.URI, CONFIG.MONGO.URI_TEST);

/**
 * CONNECT DATABASE
 */
mongoDatabase.connectMongoDB();

/**
 * SERVER RUNNING ON
 */
const server = app.listen(port, () => {
  logger.debug(`APP LISTENING AT http://localhost:${port}`);
});

export default server;
