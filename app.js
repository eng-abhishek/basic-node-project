const express = require('express');
const app = express();
const dotenv = require('dotenv');
const userRouter = require('./routes/userRoute');
const authRouter = require('./routes/authRoute');

const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const multer = require('multer');

dotenv.config();

connectDB();

// for extract raw data from body
app.use(bodyParser.json());

// for extract form data from body
app.use(bodyParser.urlencoded({extended:true}));

app.use('/api',userRouter,authRouter);

app.listen(process.env.PORT,()=>{
  console.log(`port ${process.env.PORT} is active now`);
});
