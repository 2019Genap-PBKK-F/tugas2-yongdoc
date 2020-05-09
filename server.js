const express = require("express");
const http = require("http");
var app = express(),
    sql = require("mssql"),
    bodyParser = require('body-parser');
// const hostname = '10.199.14.46';
const hostname = '127.0.0.1';
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
  user: "sa",
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
app.get("/api/datadasar/", function(req, res){
  var query = "select * from DataDasar";
  executeQuery (res, query, null, 0);
});

//POST API datadasar
app.post("/api/datadasar/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "insert into datadasar ( nama, create_date, last_update, expired_date ) values( @nama, current_timestamp, current_timestamp, current_timestamp + 365 )";
  executeQuery(res, query, column, 1);
});

//PUT API datadasar
app.put("/api/datadasar/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "update datadasar set nama = @nama, last_update = current_timestamp where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API datadasar
app.delete("/api/datadasar/:id", function(req, res)
{
  var query = "delete from datadasar where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API jenissatker
app.get("/api/jenissatker/", function(req, res){
  var query = "select * from JenisSatker";
  executeQuery (res, query, null, 0);
});

//POST API jenissatker
app.post("/api/jenissatker/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "insert into JenisSatker ( nama, create_date, last_update, expired_date ) values( @nama, current_timestamp, current_timestamp, current_timestamp + 365 )";
  executeQuery(res, query, column, 1);
});

//PUT API jenissatker
app.put("/api/jenissatker/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "update JenisSatker set nama = @nama, last_update = current_timestamp where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API jenissatker
app.delete("/api/jenissatker/:id", function(req, res)
{
  var query = "delete from JenisSatker where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API aspek
app.get("/api/periode/", function(req, res){
  var query = "select * from Periode";
  executeQuery (res, query, null, 0);
});

//POST API periode
app.post("/api/periode/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "insert into Periode ( nama, create_date, last_update ) values( @nama, current_timestamp, current_timestamp )";
  executeQuery(res, query, column, 1);
});

//PUT API periode
app.put("/api/periode/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name }
  ]

  var query = "update Periode set nama = @nama, last_update = current_timestamp where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API periode
app.delete("/api/periode/:id", function(req, res)
{
  var query = "delete from Periode where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API aspek
app.get("/api/aspek/", function(req, res){
  var query = "select * from Aspek";
  executeQuery (res, query, null, 0);
});

//POST API aspek
app.post("/api/aspek/", function(req, res){
  var column = [
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'k_aspek', sqltype: sql.VarChar, value: req.body.k_aspek }
  ]

  var query = "insert into Aspek ( aspek, komponen_aspek ) values( @aspek, @k_aspek )";
  executeQuery(res, query, column, 1);
});

//PUT API aspek
app.put("/api/aspek/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'aspek', sqltype: sql.VarChar, value: req.body.aspek },
    { name: 'k_aspek', sqltype: sql.VarChar, value: req.body.k_aspek }
  ]

  var query = "update Aspek set aspek = @aspek, komponen_aspek = @k_aspek where id = @id";
  executeQuery(res,query,column,1);
});

//DELETE API aspek
app.delete("/api/aspek/:id", function(req, res)
{
  var query = "delete from Aspek where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API nama DataDasar, aspek Aspek
app.get("/api/namadatadasar/", function(req, res){
  var query = "select nama from DataDasar";
  executeQuery (res, query, null, 0);
});
app.get("/api/aspekaspek/", function(req, res){
  var query = "select aspek from Aspek";
  executeQuery (res, query, null, 0);
});

//GET API masterindikator
app.get("/api/masterindikator/", function(req, res){
  var query = "select m.id, m.nama as name, m.deskripsi, m.default_bobot, a.aspek as aspek, d1.nama as pembilang, d2.nama as penyebut, m.create_date, m.last_update, m.expired_date from MasterIndikator as m, Aspek as a, DataDasar as d1, DataDasar as d2 where m.id_aspek = a.id and m.id_pembilang = d1.id and m.id_penyebut = d2.id";
  executeQuery (res, query, null, 0);
});

//POST API masterindikator
app.post("/api/masterindikator/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.desc },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = "insert into MasterIndikator (nama, deskripsi, default_bobot, create_date, last_update, expired_date, id_pembilang, id_penyebut, id_aspek) values (@nama, @deskripsi, @default_bobot, current_timestamp, current_timestamp, current_timestamp+365, 1 , 1, 1)";
  executeQuery(res, query, column, 1);
});

//PUT API masterindikator
app.put("/api/masterindikator/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'deskripsi', sqltype: sql.VarChar, value: req.body.desc },
    { name: 'default_bobot', sqltype: sql.Float, value: req.body.bobot },
    { name: 'id_pembilang', sqltype: sql.VarChar, value: req.body.id_pem },
    { name: 'id_penyebut', sqltype: sql.VarChar, value: req.body.id_pen },
    { name: 'id_aspek', sqltype: sql.VarChar, value: req.body.id_aspek }
  ]

  var query = "update MasterIndikator set nama = @nama, deskripsi = @deskripsi, default_bobot = @default_bobot, last_update = current_timestamp, id_aspek = (select id from Aspek where aspek = @id_aspek), id_pembilang = (select id from DataDasar where nama = @id_pembilang), id_penyebut = (select id from DataDasar where nama = @id_penyebut) where id = @id ";
  executeQuery(res,query,column,1);
});

//DELETE API masterindikator
app.delete("/api/masterindikator/:id", function(req, res)
{
  var query = "delete from masterindikator where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API satuankerja
app.get("/api/satuankerja/", function(req, res){
  var query = "select sk.id, sk.id_sk, sk.nama, sk.email, sk.level_unit, sk.id_jns_satker, sk.id_induk_satker, sk.create_date, sk.last_update, sk.expired_date from SatuanKerja as sk order by sk.id";
  executeQuery (res, query, null, 0);
});

//POST API satuankerja
app.post("/api/satuankerja/", function(req, res){
  var column = [
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'level_unit', sqltype: sql.Int, value: req.body.lvl_unit }
  ]

  var query = "insert into satuankerja (id_sk, nama, email, level_unit, create_date, last_update, expired_date) values (NEWID(), @nama, @email, @level_unit, current_timestamp, current_timestamp, current_timestamp + 365*4 + 1)";
  executeQuery(res, query, column, 1);
});

//PUT API satuankerja
app.put("/api/satuankerja/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_sk', sqltype: sql.UniqueIdentifier, value: req.body.id_sk },
    { name: 'nama', sqltype: sql.VarChar, value: req.body.name },
    { name: 'email', sqltype: sql.VarChar, value: req.body.email },
    { name: 'level_unit', sqltype: sql.Int, value: req.body.lvl_unit },
    { name: 'id_jns_satker', sqltype: sql.Int, value: req.body.id_jns },
    { name: 'id_induk_satker', sqltype: sql.UniqueIdentifier, value: req.body.id_induk }
  ]

  var query = "update SatuanKerja set id_sk = @id_sk, nama = @nama, email = @email, level_unit = @level_unit, last_update = current_timestamp, id_jns_satker = @id_jns_satker, id_induk_satker = @id_induk_satker where id = @id ";
  executeQuery(res,query,column,1);
});

//DELETE API satuankerja
app.delete("/api/satuankerja/:id", function(req, res)
{
  var query = "delete from SatuanKerja where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API indikatorperiode
app.get("/api/indikatorperiode/", function(req, res){
  var query = "select ip.id, mi.nama as masterindikator, p.nama as periode, bobot from Indikator_Periode as ip, Periode as p, MasterIndikator as mi where ip.id_master = mi.id and ip.id_periode = p.id";
  executeQuery (res, query, null, 0);
});

//POST API indikatorperiode
app.post("/api/indikatorperiode/", function(req, res){
  var column = [
    { name: 'id_master', sqltype: sql.VarChar, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.VarChar, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = "insert into Indikator_Periode (bobot) values (@bobot)";
  executeQuery(res, query, column, 1);
});

//PUT API indikatorperiode
app.put("/api/indikatorperiode/:id", function(req, res){
  console.log(req.body)
  var column = [
    { name: 'id', sqltype: sql.Int, value: req.body.id },
    { name: 'id_master', sqltype: sql.VarChar, value: req.body.id_master },
    { name: 'id_periode', sqltype: sql.VarChar, value: req.body.id_periode },
    { name: 'bobot', sqltype: sql.Float, value: req.body.bobot }
  ]

  var query = "update Indikator_Periode set id_master = (select id from MasterIndikator where nama = @id_master), id_periode = (select id from Periode where nama = @id_periode), bobot = @bobot where id = @id ";
  executeQuery(res,query,column,1);
});

//DELETE API indikatorperiode
app.delete("/api/indikatorperiode/:id", function(req, res)
{
  var query = "delete from Indikator_Periode where id=" + req.params.id;
  executeQuery(res, query, null, 0);
});

//GET API abmas
app.get("/api/abmas/", function(req, res){
  var query = "select * from abmas";
  executeQuery (res, query, null, 0);
});

//GET API dosen
app.get("/api/dosen/", function(req, res){
  var query = "select * from dosen";
  executeQuery (res, query, null, 0);
});

//GET API penelitian
app.get("/api/penelitian/", function(req, res){
  var query = "select * from penelitian";
  executeQuery (res, query, null, 0);
});

//GET API publikasi
app.get("/api/publikasi/", function(req, res){
  var query = "select * from publikasi";
  executeQuery (res, query, null, 0);
});

app.listen(port, hostname, function() {
  var message = "Server running on Port: " + port;
  console.log(message);
})
