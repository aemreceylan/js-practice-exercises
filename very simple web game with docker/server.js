console.log("Çalışıyor");
const http = require("http");
const fs = require("fs");
const server =  http.createServer((request,response)=>{
    console.log("istek geldi!");
    response.setHeader('Access-Control-Allow-Origin', '*');
    if(request.url=="/newScore"){
        let data="";
        request.on("data",(i)=>{
            data += i;
        });
        request.on("end",()=>{
            console.log(data);
            fs.appendFile("scores.txt",data+",",()=>{});
        });
    }
    else if(request.url=="/scoreTable"){
        fs.readFile("scores.txt", "utf-8" ,(err, txt) => {
            if(txt){
                console.log("["+txt.slice(0,txt.length-1)+"]");
                response.end("["+txt.slice(0,txt.length-1)+"]");
            }
        });
    }
});
server.listen(3000,"localhost",()=>{
});