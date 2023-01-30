const fs=require('fs')

// fs.readFile('simple.txt', (err, data)=>{
//     if (err) throw err;
//     console.log(data.toString());
// })

// fs.readFile('simple.txt', 'utf-8', (err, data)=>{
//     if (err) throw err;
//     console.log(data);
// })

const path=require('path');

fs.readFile(path.join(__dirname, 'simple.txt'), 'utf-8', (err, data)=>{
    if (err) throw err;
    console.log(data);
})

fs.writeFile(path.join(__dirname, 'simple2.txt'), 'Nice to meet you', (err)=>{
    if (err) throw err;
    console.log("data saved");
})