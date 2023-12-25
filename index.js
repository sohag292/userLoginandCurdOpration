const app = require("./app");
const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config({path:"./config.env"})


mongoose
.connect(process.env.DATABASE)
.then(()=>{
    console.log("DB Connected")
    app.listen(process.env.RUNNING_PORT, function(){
        console.log("success server running " + process.env.RUNNING_PORT);
    })
}).catch((err)=>console.log(err))