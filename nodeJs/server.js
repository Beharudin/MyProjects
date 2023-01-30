const fs=require('fs');
const http=require('http');
const path=require('path');
const fsPromises=require('fs').promises;
const port = process.env.PORT || 3500;

const EventEmitter=require('events');

class Emitter extends EventEmitter {};
const emitter=new Emitter();

const server=http.createServer((req, res)=>{
    console.log(req.url, req.method);
})

server.listen(port, ()=>console.log(`server is running on port ${port}`));

