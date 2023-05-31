const express = require('express');
const app = express();

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log('Server listening at http://%s:%s', host, port);
});