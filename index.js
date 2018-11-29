var http = require('http');
var https =require('https');
var url1 =require('url');
var port= process.env.PORT || 1337;


http.createServer(function(req , res) {
    var reqip =req.headers["x-forwarded-for"];
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write('hello node! your ip info : '+reqip+"\n");
    var h1p=url1.parse(req.url, true).query;
    if(h1p.d && h1p.m !==undefined){
        console.log(h1p.d);
        res.write(h1p.d+" "+h1p.m);
    }
    
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
}).listen(port, '0.0.0.0');
