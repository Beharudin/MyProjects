var express=require('express');

var app=express();

var products=require('./routes/products')
app.use('/products', products)

var users=require('./routes/users')
app.use('/users', users)

var dynamic=require('./routes/dynamicRoute')
app.use('/dynamic', dynamic)

// app.get("/getUsers", (req, res)=>{
//     var users={
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
//     res.send(users);
// })

app.listen(4000);