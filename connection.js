const mysql=require('mysql')
var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Sush@264",
    database:"Travel"
})
module.exports=con