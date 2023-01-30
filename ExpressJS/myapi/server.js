const express = require("express");
const app = express();
const port = 4000;

app.use(express.json());
app.use(express.urlencoded({extended: true, }));

var users = require('./routes/index');
var insertUsers = require('./routes/insertToDb');

app.use('/users', users);
app.use('/post', insertUsers);

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.listen(port);