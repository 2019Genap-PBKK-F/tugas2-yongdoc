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


//GET API datadasar
app.get("/datadasar/", function(req, res){
  var query = "select id, nama as name from datadasar";
  executeQuery (res, query, null, 0);
});

//POST API datadasar
app.post("/datadasar/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "insert into datadasar ( nama ) values( @nama )";
  executeQuery(res, query, column, 1);
});

//PUT API datadasar
app.put("/datadasar/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "update datadasar set nama = @nama where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API datadasar
app.delete("/datadasar/:id", function(req, res)
{
  var query = "delete from datadasar where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API kategoriunit
app.get("/kategoriunit/", function(req, res){
  var query = "select id, nama as name from kategoriunit";
  executeQuery (res, query, null, 0);
});

//POST API kategoriunit
app.post("/kategoriunit/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "insert into kategoriunit ( nama ) values( @nama )";
  executeQuery(res, query, column, 1);
});

//PUT API kategoriunit
app.put("/kategoriunit/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "update kategoriunit set nama = @nama where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API kategoriunit
app.delete("/kategoriunit/:id", function(req, res)
{
  var query = "delete from kategoriunit where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API unit
app.get("/unit/", function(req, res){
  var query = "select id, nama as name, kategoriunit_id as id_ku from unit";
  executeQuery (res, query, null, 0);
});

//POST API unit
app.post("/unit/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'id_ku', sqltype: sql.Int, value: req.body.id_ku}
  ]

  var query = "insert into unit ( kategoriunit_id, nama ) values( @id_ku, @nama )";
  executeQuery(res, query, column, 1);
});

//PUT API unit
app.put("/unit/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'id_ku', sqltype: sql.Int, value: req.body.id_ku}
  ]

  var query = "update unit set nama = @nama, kategoriunit_id = @id_ku where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API unit
app.delete("/unit/:id", function(req, res)
{
  var query = "delete from unit where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API capaian_unit
app.get("/capaian_unit/", function(req, res){
  var query = "select * from capaian_unit";
  executeQuery (res, query, null, 0);
});

//POST API capaian_unit
app.post("/capaian_unit/", function(req, res){
  var column = [
    { name: 'waktu', sqltype: sql.Date, value: req.body.time },
    { name: 'capaian', sqltype: sql.Float, value: req.body.capaian}
  ]

  var query = "insert into capaian_unit ( datadasar_id, unit_id, waktu, capaian ) values( 1, 1, @waktu, @capaian )";
  executeQuery(res, query, column, 1);
});

//PUT API capaian_unit
// app.put("/capaian_unit/:id", function(req, res){
//   console.log(req.body)
//   var column = [
//     { name: 'id', sqltype: sql.Int, value: req.body.id },
//     { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
//     { name: 'id_ku', sqltype: sql.Int, value: req.body.id_ku}
//   ]

//   var query = "update unit set nama = @nama, kategoriunit_id = @id_ku where id = @id";
//   executeQuery(res,query,column,1);
// });

//DELETE API unit
// app.delete("/unit/:id", function(req, res)
// {
//   var query = "delete from unit where id=" + req.params.id;
//   executeQuery(res, query, null, 0);
// });



app.listen(port, hostname, function() {
  var message = "Server running on Port: " + port;
  console.log(message);
})
