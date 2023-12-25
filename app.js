const express = require('express');
const router = require('./src/router/api')
const app = new express();
const bodyParser = require('body-parser');


//security Middleware import
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const cors = require('cors')





//security Middleware Implement
app.use(bodyParser.json());
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp())
app.use(express.json())
// app.use(cookieParser())

app.use(express.urlencoded({ extended: true }))
//  rate limiting middleware
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
})


app.use(limiter)


// routes middleware
app.use("/api/v1", router)

app.use("*", (req, res)=>{
    res.status(404).json({status:"failed",data:"not found"})
})

module.exports = app