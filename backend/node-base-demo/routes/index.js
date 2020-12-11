var express = require('express');
var router = express.Router();
var multer = require('multer')
var XLSX = require('xlsx')
var fs = require('fs')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.post('/test', upload.any() , function(req, res, next) {
  console.log(req.files)
  // let data1
  // fs.readFile('./1.xlsx',function(err, data){
  //   data1 = data
  // })
  // const a= XLSX.read(req.files.buffer)
  console.log(req.files[0].buffer)
  const a= XLSX.read(req.files[0].buffer,{type:'buffer'})
  console.log(a)
});

module.exports = router;
