const express = require('express')
const app = express();
require('dotenv').config();
app.use(express.json());




const db = require("./model/connection");
db.sequelize.sync()

require("./router/route")(app);
require("./router/product_route")(app);
require("./router/order_route")(app);



app.listen(8080,()=>{
    console.log('server started at 8080');
})