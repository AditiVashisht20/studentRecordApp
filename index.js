var express = require('express');
var mysql = require('mysql2');
var app = express();
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
var port = 3000

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database:'student_records'
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
                  res.status(200).send("Succesfully Logged in")
              }
              else{
                  res.status(401).send("Not Authorised.")
              }
          }
          else
          {
            res.status(404).send("User not created");
          }
          
       //console.log(result);
     });
    
 });


  
app.listen(port, function () {   
    console.log(`Student app listening at ${port}`);
 })
 

   
 