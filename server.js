const express = require("express");
const http = require("http");
var app = express(),
    sql = require("mssql"),
    bodyParser = require('body-parser');
const hostname = '10.199.14.46';
//const hostname = '127.0.0.1';
const port = 8023;



//CORS Middleware
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var dbConfig = {
  user: "su",
  password: "SaSa1212",
  server: "10.199.13.253",
  database: "nrp05111740000128"
};

var executeQuery = function(res, query, column, req){
  sql.connect(dbConfig, function (err) {
    if(err) {
      console.log("Error while connecting database : -" + err);
      res.send(err);
    }
    else {
      //create Request object
      var request = new sql.Request();
      if(req != 0){
        column.forEach(function (p)
        {
          request.input(p.name, p.sqltype, p.value);
        });
      }
      request.query(query, function (err, resp) {
        if(err) {
          console.log("Error while querying database :-" + err);
          res.send(err);
        }
        else {
          res.send(resp.recordset);
        }
      });
    }
  });
};

//ROOT API
app.get("/",function(req, res){
  res.end('Udah Jalan');
});


//GET API LAGI
app.get("/api/mahasiswa", function(req, res){
  var query = "select * from mahasiswa";
  executeQuery (res, query, null, 0);
});

//POST API
app.post("/api/mahasiswa", function(req, res){
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'jk', sqltype: sql.Char, value: req.body.jk },
    { name: 'tl', sqltype: sql.DateTime, value: req.body.tl },
    { name: 'ukt', sqltype: sql.Numeric, value: req.body.ukt },
    { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif },
    { name: 'foto', sqltype: sql.Image, value: req.body.link }
  ]

  var query = "insert into mahasiswa ( MHS_NRP, MHS_NAMA, MHS_JK, MHS_TL, MHS_UKT, MHS_AKTIF, MHS_FOTO ) values( @nrp, @nama, @jk, @tl, @ukt, @aktif, @foto )";
  executeQuery(res, query, column, 1);
});

//PUT API
app.put("/api/mahasiswa/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nrp', sqltype: sql.Char, value: req.body.nrp },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'jk', sqltype: sql.Char, value: req.body.jk },
    { name: 'tl', sqltype: sql.DateTime, value: req.body.tl },
    { name: 'ukt', sqltype: sql.Numeric, value: req.body.ukt },
    { name: 'aktif', sqltype: sql.Bit, value: req.body.aktif },
    { name: 'foto', sqltype: sql.Image, value: req.body.link }
  ]

  var query = "update mahasiswa set MHS_NAMA = @nama, MHS_NRP = @nrp, MHS_JK = @jk, MHS_TL = @tl, MHS_UKT = @ukt, MHS_AKTIF = @aktif, MHS_FOTO = @foto where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API
app.delete("/api/mahasiswa/:id", function(req, res)
{
  var query = "delete from mahasiswa where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

app.listen(port, hostname, function() {
  var message = "Server running on Port: " + port;
  console.log(message);
})
