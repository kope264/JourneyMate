var express = require("express");
var bodyparser = require("body-parser");
const path = require('path');
const cors=require("cors");
const  bcrypt=require("bcrypt")
const con = require("./connection");
var app = express();
app.use(cors())

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));


app.get('/',(req,res)=>{
  res.sendFile(__dirname+'/index.html')
  
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname+'/Signup.html')

});
app.post('/signup',(req,res)=>{
    var Name=req.body.Name
    var email=req.body.email
    var password=req.body.password

  con.connect(function(err){
    if(err){
        console.log("COnnected Sucessfully")
    }
    else{
        var signup="Insert into UserLogin(Username, Email, Password)values(?,?,?)"

        con.query(signup,[Name,email,password],function(err,result){
            if(err){
                console.log("Something Went Wrong",err)
            }
            else{
                console.log(result)
                res.send("Sign In SucessFully")
            }
        })
    }
  })
})
app.get('/Login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login.html'));
  });
  
  app.post('/Login', (req, res) => {
    const Lemail = req.body.email;
    const Lpassword = req.body.password;
  
    const query = 'SELECT * FROM UserLogin WHERE Email = ? AND Password = ?';
    con.query(query, [Lemail, Lpassword], (err, result) => {
      if (err) {
        console.log("Something went wrong:", err);
        res.status(500).send("An error occurred");
      } else if (result.length >= 0) {
        console.log("Logged in Successfully:", result);
        res.send("Logged in Successfully");
      } else {
        res.status(401).send("Invalid email or password");
        //res.sendFile(__dirname+'reset.html')

      }
    });   
 })

 app.get('/reset', (req, res) => {
  res.sendFile(path.join(__dirname, 'reset.html'));
});

// Handle the password reset form submission
app.post('/reset', (req, res) => {
  const newPassword = req.body.newpassword; 
  const reenterPassword = req.body.reenterpassword;
  const email = req.body.email;

  // Ensure new passwords match
  if (newPassword !== reenterPassword) {
    return res.status(400).send("New passwords do not match");
  }
  // Hash the new password
  bcrypt.hash(newPassword, 10, (err, hashedNewPassword) => {
    if (err) {
      console.error("Error hashing new password:", err);
      return res.status(500).send("Internal Server Error");
    }
    // Update the password in the database
    con.query('UPDATE UserLogin SET Password = ? WHERE Email = ?', [hashedNewPassword, email], (err) => {
      if (err) {
        console.error("Error updating password:", err);
        return res.status(500).send("Internal Server Error");
      }
     // res.send("Password updated successfully");
      res.sendFile(__dirname,'index.html')
    });
  });
});
//Planning page Started
// app.get('/plan',(req,res)=>{
//   res.sendFile(__dirname,'Plan','index.html')
// })
app.get('/plan', (req, res) => {
  res.sendFile(path.join(__dirname+'/plan.html'));
});
app.post('/plan',(req,res)=>{
  var Startlocation=req.body.StartPlace
  var endLocation=req.body.EndPlace
  var stratDate=req.body.startDate
  var endDate=req.body.endDate

var Plan="Insert into Plan( start_place, destination, start_date, end_date) values(?,?,?,?)"
con.query(Plan,[Startlocation,endLocation,stratDate,endDate],function(err,data){
  if(err)
  {
    console.log("Data not Inserted SucessFully",err)
  }
  else
  {
    console.log("Data Inserted SucessFully",data)
    res.send("You Planned Properly")
  }
})
})
app.listen(2090, () => {
    console.log("Server started successfully on port 2005");
})
