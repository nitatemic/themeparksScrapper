require('dotenv').config();

const http = require('http');
const app = require('./app');

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  // eslint-disable-next-line no-restricted-globals
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
/* Setting the port to the value of the environment variable PORT, or 3001 if the environment variable
is not set. */
const port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

/**
 * If the error is not related to the server listening, throw the error. If the error is related to the
 * server listening, then exit the process with a status code of 1
 * @param error - The error object that was thrown
 */
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':

      process.exit(1);
      break;
    case 'EADDRINUSE':

      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);

server.listen(port);
