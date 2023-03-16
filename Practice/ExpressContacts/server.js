const express = require("express");
const dotenv = require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express();

const contacts = require('./routes/contactsRoute')
app.use('/contacts', contacts);
app.listen(port, () => console.log(`Server running on port ${port}`));
