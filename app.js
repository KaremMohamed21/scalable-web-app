const express = require('express');
const router = require('./routes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');

const app = express();

app.use(router);

app.use(errorHandler);
app.use('*', notFound);

app.listen(3000, () => {
    console.log('App server running on port 3000');
})