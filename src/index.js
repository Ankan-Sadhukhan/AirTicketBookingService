const express = require('express');
const bodyParser = require('body-parser')

const apiRotes = require('./routes/index')
const app = express();
const db = require('./models/index')

const {PORT} = require('./config/serverConfig');

const setupAndStartServer =() => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))

    app.use('/api',apiRotes)

    app.listen(PORT, () => {
        console.log(`server is started on port ${PORT}`);

        if(process.env.DB_SYNC){
            db.sequelize.sync({alter:true})
        }
    })
}

setupAndStartServer();