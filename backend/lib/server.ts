import app from "./app";
import * as http from 'http';

var path = require('path');

const port = process.env.PORT || 3000;

// '/test.txt'

http.createServer({}, app).listen(port, () => {
    console.log('Express server listening on port ' + port);
});