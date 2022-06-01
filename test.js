// for (var i=0; i<10; i++) {
//     // We need something to add our new element too
//     let target = document.querySelector("#target");
//     // Now we have to create a NEW element
//     let box = document.createElement('div');
//     // Removed the float for the answer as they will stack on top other wise.
//     //box.style.float = "left";
//     box.style.height = "50px";
//     box.style.width = "50px";
//     box.style.border = randomColor();
//     // Now we add it to our target
//     target.appendChild(box); 
// }
// function randomColor() {
//     var r = Math.round( Math.random() * 255);
//     var g = Math.round( Math.random() * 255);
//     var b = Math.round( Math.random() * 255);
//     var colorString = "rgb(" + r + "," + g + "," + b + ")";
//     return colorString;
// }



    // var http = require('http')
    // var fs = require('fs');

    // var server = http.createServer(function(req,res){
    //     console.log('request was made: '+req.url);
        
    
    //     res.writeHead(200,{'Content-Type': 'Text/html'});
    //     var myReadStream = fs.createReadStream(__dirname + '/registration.html','utf-8');
    //     myReadStream.pipe(res);
        
        
    // });



//  server.listen(3000,'127.0.0.1');
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
// var http = require('http');
// var fs = require('fs');
// var path = require('path');
// import http from 'http'
// import fs from 'fs'

import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const express = require('express')
var fs = require('fs');
var sys = require('sys');
const bodyparser=require('body-parser')

var email = "";
var owner_id = 0;
var password="";
var tag=0;
var mysql = require('mysql');
// import * as mysql from 'mysql';
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "mydb"
});


con.connect((err) => {
    if(err) throw err;
    console.log("MYSQL CONNECTED");
});



const app = express();
   
    app.set("view options", {layout: false});
    app.use(express.static('public'));
    // app.use(express.static(path.join(__dirname, 'public')));

app.get('/home', function(req, res){
    res.render('../public/registration.html');


});

app.get('/registration.html',function(req,res){
    res.sendFile(__dirname+'/registration.html');


})

app.use(bodyparser.urlencoded({extended:true}))


// app.post('/public/registration.html',function(req,res){
//     console.log(req.body);
//     res.redirect('/homepage.html');
//     // let email=req.body.e;
//     // let password=req.body.p
//     // console.log(email)
//     // console.log(password)
// });

app.post('/public/signup.html',function(req,res){
    var id = 0;
    console.log("kkkk");
    console.log(req.body.e);
    console.log(req.body.p);
    // res.setHeader('Content-Type', 'text/html');
    let sql = "select COUNT(id) As id_count from sellers";
	con.query(sql,(err,results) => {
		if(err) throw err; 
        console.log('aahahah');
		console.log(results[0].id_count);
		// res.send("Posts fetched...");
        id = parseInt(results[0].id_count)+1;
        console.log('id: '+id);

        email = req.body.e;
        owner_id =  id; 


        // -------------------
        sql = "INSERT INTO SELLERS  VALUES ?";
    var values = [
      [id,req.body.e, req.body.p,req.body.n,req.body.a],
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });

    sql = "INSERT INTO BUYERS  VALUES ?";
    var values = [
      [id,req.body.e, req.body.p,req.body.n,req.body.a],
    ];
    con.query(sql, [values], function (err, result) {
      if (err) throw err;
      console.log("Number of records inserted: " + result.affectedRows);
    });

	});
    

    res.redirect('/homepage.html');
    

});




app.post('/public/registration.html',function(req,res){

    // res.setHeader('Content-Type', 'text/html');
    let sql = "select id as ownerid from sellers where email='"+req.body.e+"' AND password='"+req.body.p+"'";
	con.query(sql,(err,results) => {
		if(err) throw err; 
        if(results!="") {
            console.log("yes not null"+results);
            email = req.body.e;
            owner_id =  parseInt(results[0].ownerid);   
            console.log("email: "+email);
            console.log("owner_id: "+owner_id);
            res.redirect('/homepage.html');
            
            }   
        else{
             console.log("NULL DUMB");
             res.redirect('/registration.html');
            }
        
             // res.send("Posts fetched...");
        



	});    
});




app.post('/public/create_gig.html',function(req,res){

    var id = 0;
 
    // res.setHeader('Content-Type', 'text/html');
    let sql = "select COUNT(id) As id_count from gigs";
	con.query(sql,(err,results) => {
		if(err) throw err; 
        console.log('aahahah');
		console.log(results[0].id_count);
		// res.send("Posts fetched...");
        id = parseInt(results[0].id_count)+1;
        console.log('id: '+id);

        
        sql = "INSERT INTO GIGS VALUES ?";
        var values = [
          [id,req.body.title, req.body.price,req.body.description,req.body.location,req.body.category,owner_id],
        ];
        con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });


        res.redirect('/gig_created.html');


	});    
});





app.post('/public/make_request.html',function(req,res){

    var id = 0;
 
    // res.setHeader('Content-Type', 'text/html');
    let sql = "select COUNT(id) As id_count from requests";
	con.query(sql,(err,results) => {
		if(err) throw err; 
        console.log('aahahah');
		console.log(results[0].id_count);
		// res.send("Posts fetched...");
        id = parseInt(results[0].id_count)+1;
        console.log('id: '+id);

        
        sql = "INSERT INTO REQUESTS VALUES ?";
        var values = [
          [id,req.body.title, req.body.price,req.body.description,req.body.location,req.body.category,owner_id],
        ];
        con.query(sql, [values], function (err, result) {
          if (err) throw err;
          console.log("Number of records inserted: " + result.affectedRows);
        });


        res.redirect('/request_created.html');


	});    
});





app.listen('3000',()=>{
    console.log("Server started on 3000...");
    
})

// http.createServer(function(req, res){
//     console.log(__dirname);
//     if(req.url === "/"){
//         fs.readFile("./public/registration.html", "UTF-8", function(err, html){
//             res.writeHead(200, {"Content-Type": "text/html"});
//             res.end(html);
//         });
//     }
//    else if(req.url.match("\.js$")){
//         var jsPath = path.join(__dirname, 'public', req.url);
//         var fileStream = fs.createReadStream(jsPath, "UTF-8");
//         res.writeHead(200, {"Content-Type": "text/javascript"});
//         fileStream.pipe(res);
//     }
//     else if(req.url.match("\.css$")){
//         var cssPath = path.join(__dirname, 'public', req.url);
//         var fileStream = fs.createReadStream(cssPath, "UTF-8");
//         res.writeHead(200, {"Content-Type": "text/css"});
//         fileStream.pipe(res);

//     }else if(req.url.match("\.png$")){
//         var imagePath = path.join(__dirname, 'public', req.url);
//         var fileStream = fs.createReadStream(imagePath);
//         res.writeHead(200, {"Content-Type": "image/png"});
//         fileStream.pipe(res);
//     }
//     else if(req.url.match("\.jpg$")){
//         var imagePath = path.join(__dirname, 'public', req.url);
//         var fileStream = fs.createReadStream(imagePath);
//         res.writeHead(200, {"Content-Type": "image/jpg"});
//         fileStream.pipe(res);
//     }
 
//     else{
//         fs.readFile("./public"+req.url, "UTF-8", function(err, html){
//             res.writeHead(200, {"Content-Type": "text/html"});
//             res.end(html);
//         });
//     }

// }).listen(3000);


console.log('Yo listening to 3000');




