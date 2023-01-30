var express=require('express');
var router=express.Router();

router.get('/:id', (req, res)=>{
    res.send('Requesting details of user '+req.params.id);
    // var users={
    //         u1:{
    //             id: 1,
    //             name: 'Bahar',
    //             age: 24
    //         },
    //         u2:{
    //             id: 2,
    //             name: 'Jamaal',
    //             age: 34
    //         },
    //         u3:{
    //             id: 3,
    //             name: 'Abdi',
    //             age: 27
    //         },
    //         u4:{
    //             id: 4,
    //             name: 'Caalaa',
    //             age: 22
    //         },
    //         u5:{
    //             id: 5,
    //             name: 'Usmaan',
    //             age: 14
    //         },
    //     }
    // users.forEach(user => {
    //    if(user.id===req.params.id)
    //     res.send(user);
    // });
})

// router.get('/:state/:city', (req, res)=>{
//     res.send('Requesting details of '+req.params.state+", "+req.params.city);
// })

router.get('/user/:key([0-9]{5})', (req, res)=>{
    res.send('Requesting details of '+req.params.key);
})

router.get('*', (req, res)=>{
    var resObj={
        statusCode: 404,
        statusMsg: "URL not found"
    }
    res.send(resObj);
})

module.exports=router