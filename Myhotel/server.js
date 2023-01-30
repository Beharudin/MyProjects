const  express  = require("express");

const app=express();
const dbConfig=require('./db/db');
const roomsRoute=require('./routes/roomsRoute');
const usersRoute=require('./routes/usersRoute');
const bookingRoute=require('./routes/bookingRoute');
app.use(express.json());
app.use('/rooms', roomsRoute);
app.use('/users', usersRoute);
app.use('/booking', bookingRoute);

const port=process.env.port || 4000;
app.listen(port, ()=> console.log(`Server running on port ${port}`))