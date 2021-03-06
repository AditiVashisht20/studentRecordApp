const config = require('../config.json')

var express = require('express');
var mysql = require('mysql2');
var app = express();
const cors = require('cors')
app.use(express.static('public'));
app.use(express.urlencoded());
app.use(express.json());
var shortid=require('shortid')
const e = require('express');
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
const username= req.body.username;
    const password=req.body.password;

    const sqlquery=`SELECT password, role FROM login where username='${username}'`;
   
    con.query(sqlquery, function (err, result) {
       if (err) 
          throw err;
          if(result.length)
          {
            
              if(result[0].password==password)
              {
                  res.send({
                     role:result[0].role,
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

     });
    
 });

 app.get('/list/subjects',(req,res)=>{
    const sql=`select *from subject_details`;
    con.query(sql,(err,result)=>
    {
       res.send(result);
    })
 })

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
app.post('/add/subject', (req,res)=>
{
   console.log('req received')
   const sql=`insert into subject_details(subcode, subname) values('${req.body.subcode}', '${req.body.subname}')`
   con.query(sql,(err,result)=>
   {
      if(err)
      {
         console.log(err);
         res.send('Please enter correct details');
      }
      else
      {
         res.send('Successfully added');
      }
   })
})

app.post('/add/student',(req,res)=>
{
  
   const sql=`insert into student_data(fname,midname,lname,age,dob,email,address,subjects)values('${req.body.fname}','${req.body.mname}','${req.body.lname}', ${parseInt(req.body.age)},STR_TO_DATE('${req.body.dob}','%d-%m-%Y'), '${req.body.email}','${req.body.address}','${req.body.subjects}')`
   con.query(sql,(err,result)=>{
      if(err)
      {
         console.log(err);
         res.send('Please retry');

      }
      else
      {
         const q=`insert into login(username,password,role) values('${req.body.email}','${req.body.lname}','user')`;
         con.query(q,(err,result)=>
         {
            if(err)
            {
               console.log(err);
               res.send("Login: Invalid");
            }
            else
            {
               res.send("Added succesfully");
            }
         })
        // res.send('Sucessfully Added');

      }

   });
})

app.get('/list/student/:id',(req,res)=>
   {
      const sql=`select * from student_data where rollNumber=${req.params.id}`
      con.query(sql,(err,result)=>
      {
         if(err)
         {
            
            res.send('Try again after some time');
         }
         else
         {
           
            res.send(result[0])
         }
      });
   })
app.post(`/edit/student/:id`,(req,res)=>{
   const sql=`UPDATE student_data set fname='${req.body.fname}',midname='${req.body.midname}',lname='${req.body.lname}',age=${req.body.age},dob=STR_TO_DATE('${req.body.dob}','%d-%m-%Y'), email='${req.body.email}', address='${req.body.address}', subjects='${req.body.subjects}' where rollNumber=${req.params.id}`
   con.query(sql,(err,result)=>{
      if(err){
    
      res.send('Please try again later')
}
else
{
   res.send('updated')
}
})
})

app.get('/list/subject/:id',(req,res)=>
{
   const sql=`select * from subject_details where subcode=${req.params.id}`
   con.query(sql,(err,result)=>
   {
      if(err)
      {
         res.send('Try again after some time');
      }
      else
      {
         console.log(result[0]);
         res.send(result[0])
      }
   });
})
app.post(`/edit/subject/:id`,(req,res)=>
{
   const sql=`Update subject_details set subname='${req.body.subname}' where subcode=${req.params.id}`
   con.query(sql,(err,result)=>
   {
      if(err)
      {

      res.send('Try Again')
      }
      else
      {
         res.send('Updated')
      }
   })
})
app.post(`/delete/subject/:id`,(req,res)=>
{
   const sql=`Delete from subject_details where subcode=${req.params.id}`;
   con.query(sql,(err,result)=>
   {
      if(err){

      res.send('Please Try again after sometime')
      }
      else{
         res.send('Deleted')
      }

   })
});

app.post(`/delete/student/:id`,(req,res)=>
{
   const sql=`Delete from student_data where rollNumber=${req.params.id}`;
   con.query(sql,(err,result)=>
   {
      if(err)
      {
      
         res.send('Please try again')

      }
      else
      {
         res.send('Deleted')
      }
   })
});

app.post('/add/dues',(req,res)=>
{
   let id=shortid.generate();
   const sql=`insert into dues(due_id,stud_id,due_desc,due_payment,is_completed) values('${id}', ${req.body.id}, '${req.body.reason}',${req.body.amount},false)`
   con.query(sql,(err,result)=>
   {
      if(err){
      if(err.no==1062)
      {
         res.send('Duplicate Dues exists for this students');
      }
      else{
         res.send('Please try again after sometime')
      }
   }
      else
      {
         res.send('Successfully Added');
      }
   })
})


app.get('/list/dues/:id', (req,res)=>
{
   const sql=`select * from dues where stud_id=${req.params.id}`
   con.query(sql,(err,result)=>
   {
      if(err)
      {
      
         res.send('Please Try Again after some time')

      }
      else{
         res.send(result)
      }
   })
})
app.post('/complete/due/:id', (req,res)=>
{
   const sql=`UPDATE dues SET is_completed=${true} where due_id='${req.params.id}'`;
   con.query(sql,(err,result)=>
   {
      if(err){
      throw err;
      res.send('Please Try Again later')
      }
      else
      res.send('Due Completed')
   })
})
app.post('/incomplete/due/:id', (req,res)=>
{
   const sql=`UPDATE dues SET is_completed =${false} where due_id='${req.params.id}'`;
   con.query(sql,(err,result)=>
   {
      if(err)
      {
         throw err;
         res.send('Please Try again in sometime');
      }
      else{
         res.send('Updated');
      }
   })
})

app.post('/delete/due/:id', (req,res)=>
{
   const sql=`DELETE from dues where due_id='${req.params.id}'`;
   con.query(sql,(err,result)=>
   {
      if(err)
      {
         res.send('Try in sometime');

      }
      else
      {
         res.send('Deleted')
      }
   });
})
app.get('/list/due/:id', (req, res) => {
   const sql = `select * from dues where due_id = '${req.params.id}'`
   con.query(sql, (err, result) => {
      if (err) {
         throw err;
         res.send('Try Again after some time')
      } else {
         res.send(result[0])
      }
   });
});
app.post('/update/dues/:id', (req,res)=>
{
   console.log(req.body);
   const sql=`UPDATE dues SET due_payment=${req.body.amount}, due_desc='${req.body.reason}' where due_id='${req.params.id}'`;
   con.query(sql,(err,result)=>
{
   if(err)
   {
      res.send('Please try again later');

   }
   else
   {
      res.send('Due updated')
   }
})
})

app.post('/add/marks/:id',(req,res)=>
{
   //let id=shortid.generate();
   console.log(req.body);
   const sql=`insert into marks(rollno,subcode,marks)values(${req.body.rollNumber},${req.body.subcode},${req.body.marks})`
   con.query(sql,(err,result)=>
   {
      if(err){
         console.log(err);
      if(err.no==1062)
      {
         
         res.send('Duplicate Marks exists for this students');
      }
      else{
         res.send('Marks:Please try again after sometime')
      }
   }
      else
      {
         res.send('Marks Added Sucessfully');
      }
   })
})

app.get('/list/marks/:id',(req,res)=>
{
   const sql=`select *from marks where rollno=${req.params.id}`;
   con.query(sql,(err,result)=>
{
   if(err)
   {
      res.send("Try AGain");
   }
   else
   {
      res.send(result);
   }
})
})


app.get('/view/student/:email', (req,res)=>
{
   const sql=`select * from student_data where email='${req.params.email}'`;
   con.query(sql,(err,result)=>
   {
      if(err)
      {
         res.send("Try Again");
      }
      else{
         res.send(result[0]);
      }
   })
})

app.listen(port, function () {   
    console.log(`Student app listening at ${port}`);
 })
 

   
 