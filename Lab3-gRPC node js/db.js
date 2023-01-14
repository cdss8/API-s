const {Client} = require("pg")
const fastcsv = require("fast-csv");
const fs = require("fs");
const ws = fs.createWriteStream("UserResponse.csv");
require('dotenv/config')



const db  = new Client ({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:process.env.PSW,
    database:"gRPC API"
})

db.connect()

db.query(`SELECT * FROM public."UserResponse"`, (err, res) =>{
    if(!err) {
        console.log("DATABASE", res.rows)
        
        //Converting dta to jSON
        const jsonData = JSON.parse(JSON.stringify(res.rows))
        console.log("JASON DATBASE", jsonData)

        fastcsv
        .write(jsonData, { headers: true })
        .on("finish", function() {
        console.log("Created UserResponse.csv successfully!");
        })
        .pipe(ws);
    } 
    else{console.log(err.message, "No DB connection")}
    db.end() 
})
