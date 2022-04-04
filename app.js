const express = require('express');
const partials = require('express-partials');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redisClient = require('./utils/redisClient');

const router = require('./routes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const { logger } = require('./middlewares/logger')

const app = express();

app.set('view engine', 'ejs');
app.set('view options', { defaultLayout: 'layout' });
app.use(cookieParser('secret'));
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true,
    store: new RedisStore({ client: redisClient })
}));
app.use(partials());
app.use(logger);
app.use(express.static(__dirname + '/public'));
app.use(router);

app.use(errorHandler);
app.use('*', notFound);

app.listen(3000, () => {
    console.log('App server running on port 3000');
})