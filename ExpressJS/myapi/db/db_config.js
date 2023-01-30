const mysql=require('mysql');

var conn=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'react_form',
})

conn.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('Database Connected');
    }
})

module.exports=conn;