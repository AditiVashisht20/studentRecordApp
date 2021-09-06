const config = require('../config.json')

var express = require('express');
var mysql = require('mysql2');
var app = express();
const cors = require('cors')
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
var port = 5000


app.use(cors())
var con = mysql.createConnection({
    host: "localhost",
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database:config.DB_NAME
  });

  con.connect((err)=>{
    if(err)
       throw err;
    console.log('Connected to MySQL client');
 })

 app.post('/login',(req,res)=>{
    console.log(req.body);
    const username= req.body.username;
    const password=req.body.password;

    const sqlquery=`SELECT password FROM login where username='${username}'`;
    //console.log(sqlquery);
    con.query(sqlquery, function (err, result) {
       if (err) 
          throw err;
          if(result.length)
          {
             // console.log(result ,result[0].password);
              if(result[0].password==password)
              {
                  res.send({
                     statusCode:200
                  })
              }
              else{
                  res.send({
                     statusCode:401,
                     data:"Password is wrong"
                  })
              }
          }
          else{
            res.send({
               statusCode:404,
               data:"No Existing User with specified mail present"
            });
          }
          
       //console.log(result);
     });
    
 });


app.get('/list/students',(req,res)=>{

   const sql = `select * from student_data`;
   con.query(sql,(err,result)=>{
      res.send(result);
   })
});

app.get('/count',(req,res)=>{
   console.log('req recieved')
   const sql = `select * from student_data`;
   con.query(sql, (err, result) => {
      if(err)
         throw err
      console.log(result.length)
      res.send(JSON.stringify(result.length));
   })
})
  
app.listen(port, function () {   
    console.log(`Student app listening at ${port}`);
 })
 

   
 