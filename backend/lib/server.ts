import app from "./app";
import * as http from 'http';
import config from './config/config';

var path = require('path');
const port = config.app.port;

// '/test.txt'

http.createServer({}, app).listen(port, () => {
    console.log('Express server listening on port ' + port);
});