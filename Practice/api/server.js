const  express  = require("express");

const app=express();
const conn=require('./db/db_config');
const usersRoute=require('./routes/index');
app.use(express.json());
app.use('/users', usersRoute);

const port=process.env.port || 4000;
app.listen(port, ()=> console.log(`Server running on port ${port}`))