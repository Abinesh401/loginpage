import express from "express";
import cors from "cors";
import 'dotenv/config'
import { connectDB } from "./confic/mongodb.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";


// app config

const app = express()
const port = 3333;


connectDB();


// middleware

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true}))
  

// api end points
app.use('/api/auth',authRouter)




app.get("/",(req,res)=>{
    res.send("Api working")
})


app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})
