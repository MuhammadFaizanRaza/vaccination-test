import http from 'http';
import mongoose from 'mongoose';
import Debug from 'debug';
import util from 'util';

/**
 * Load Config before any other file
 * this ensures that all necessary env vars are provided and valid to run server
 */
import Configuration from './config';

/**
 * Require express app
 */
import app from './app';
import { transformDataAndInsert } from './data/transform/vaccination-data-insertion';

const debug = Debug('node-server:index');

/**
 * connecting a database
 */
/**
 * Create DB connection and set connection events
 */
mongoose.connect(Configuration.MONGO.HOST);

// When successfully connected
mongoose.connection.on('connected', async () => {
  await transformDataAndInsert();
  console.log('Mongoose connection open');
});
// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
});
// print mongoose logs if in dev mode
if (Configuration.MONGOOSE_DEBUG) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

/**
 * Start server on PORT defined in config
 */
const server = http.createServer(app);

server.listen(Configuration.PORT, () => {
  console.log(`Server Started on PORT:${Configuration.PORT} (${Configuration.ENV})`);
});

/**
 * Graceful termination
 */

// process.on('SIGINT', () => {});
process.on('uncaughtException', (error) => {
  console.error('[UNCAUGHT EXCEPTION] ', error);
});
process.on('unhandledRejection', (error) => {
  console.error('[UNCAUGHT REJECTION] ', error);
});

export default server;
