//var http = require('http');
var fs = require('fs');
var url1 = require('url');
var https= require('https');
var port= process.env.PORT || 1337;


https.createServer(function(req , res){
    const reqip = req.headers["x-forwarded-for"];
    fs.readFile("./main.html", function(er , dt){
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(dt);   
    
    var request = url1.parse(req.url, true).query;
    if(request.ip !== undefined && request.ip !== ''){
        console.log(request.ip);
        https.get('https://json.geoiplookup.io/api/'+request.ip,whois =>{
    
    let body='';
    whois.on('data', data=>{
    
        body+=data;
    })
whois.on('end', ()=>{
 var final= JSON.parse(body);

res.write("<br>");
res.write("ip Address : "+final["ip"]);
res.write("<br>");
res.write("isp : "+final['isp']);
res.write("<br>");
res.write("hostname : "+final['hostname']);
res.write("<br>");
res.write("longitude : "+final['longitude']);
res.write("<br>");
res.write("latitude : "+final['latitude']);
res.write("<br>");
res.write("postal code : "+final['postal_code']);
res.write("<br>");
res.write("city : "+final['city']);
res.write("<br>");
res.write("timezone : "+final['timezone_name']);
res.write("<br>");
res.write("connection type : "+final['connection_type']);
res.write("<br>");
res.end();
});
}); 
}else{
    https.get('https://json.geoiplookup.io/api/'+reqip,whois =>{
    
    let body='';
    whois.on('data', data=>{
    
        body+=data;
    })
whois.on('end', ()=>{
 var final= JSON.parse(body);

res.write("<br>");
res.write("ip Address : "+final["ip"]);
res.write("<br>");
res.write("isp : "+final['isp']);
res.write("<br>");
res.write("hostname : "+final['hostname']);
res.write("<br>");
res.write("longitude : "+final['longitude']);
res.write("<br>");
res.write("latitude : "+final['latitude']);
res.write("<br>");
res.write("postal code : "+final['postal_code']);
res.write("<br>");
res.write("city : "+final['city']);
res.write("<br>");
res.write("timezone : "+final['timezone_name']);
res.write("<br>");
res.write("connection type : "+final['connection_type']);
res.write("<br>");
res.end();
});
});     
}  
}); 
}).listen(port ,  '0.0.0.0');
