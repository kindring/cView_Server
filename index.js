const express = require('express');

const ejs = require('ejs');
const bodyParser = require('body-parser');

const log = require('./logger').logger('app', 'info');

const conf_server = require('./config/conf_server.json')
const conf_path = require('./config/conf_path.json')
const app = express();

app.set('views', conf_path.views)
app.engine('html', ejs.__express);
app.set('view engine', 'html');



app.use(bodyParser.urlencoded({ limit: conf_server.postUrlencodedLimit, extended: true }));
app.use(bodyParser.json({ limit:  conf_server.postJsonLimit }));

app.use((req, res, next) => {
    log.info(`${req.method} Query To ${req.url}`);
    next();
})



app.listen(conf_server.port,conf_server.host,()=>{
    log.info(`服务已经启动,port:${conf_server.port}`);
})
