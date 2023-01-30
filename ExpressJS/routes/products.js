var express=require('express');
var router=express.Router();

router.get('/', (req, res)=>{
    res.send('Requesting list of all products');
})

router.get('/01', (req, res)=>{
    res.send('Requesting details of product id 01');
})

module.exports=router;