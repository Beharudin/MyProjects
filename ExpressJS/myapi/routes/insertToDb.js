var express = require('express');
var router = express.Router();

const conn=require('../db/db_config');

var userdetail=[
    {
        username: 'Bakar',
        email: 'bakar@gm.com',
        language: 'Python',
    },
    {
        username: 'Ali',
        email: 'ali@gm.com',
        language: 'Java',
    },
    {
        username: 'Jamaal',
        email: 'jamal@gm.com',
        language: 'Python',
    }
]
/* Post users details. */
router.post('', (req, res, next)=> {
    var myquery='INSERT INTO react_form VALUES (?, ?, ?)';
    userdetail.map(user=>{
        conn.query(myquery, [user.username, user.email, user.language], (err, users)=>{
            if (!err) {
                res.send(`User has been added.`)
            } else {
                console.log(err)
            }
    })
  })
});

module.exports = router;
