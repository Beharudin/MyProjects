var express = require('express');
var router = express.Router();

const mysql=require('../db_config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var myquery='SELECT * FROM react_form';
  mysql.query(myquery, (err, users)=>{
      if(err){
        console.log(err);
        res.send('Unable to get users');
      }else{
        res.send(users);
      }
  })
});

module.exports = router;
