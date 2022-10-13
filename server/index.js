const express = require('express')
require('dotenv').config();
const app = express();
const cors = require('cors');
const connection = require('./db')
const userRouters =require('./routes/users')
const authRouters =require('./routes/auth')
const adminRouters =require('./routes/admin')
const bcrypt = require('bcrypt');
const JWT_PRIVETKEY =process.env.JWTPRIVETKEY

connection()

app.use(express.json())
app.use(cors())


 

app.use("/api/users",userRouters)
app.use("/api/auth",authRouters)
app.use("/api/admin",adminRouters)

const port = process.env.PORT||8080;
app.listen(port,()=>console.log(`listening on port ${port}`));