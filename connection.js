const mysql=require('mysql')
var con=mysql.createConnection({
    host:"Priyanka",
    user:"root",
    password:"Plavate@1234",
    database:"Travel"
})
module.exports=con