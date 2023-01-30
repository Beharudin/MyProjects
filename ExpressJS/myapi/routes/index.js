var express = require('express');
var router = express.Router();

const conn=require('../db/db_config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  var myquery='SELECT * FROM react_form';
  conn.query(myquery, (err, users)=>{
      if(!err){
        res.send(users);
      }else{
        console.log(err);
        res.send('Unable to get users');
      }
  })
});

module.exports = router;
