import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import cors from "cors"
import route from "./routes/userRoute.js"


const app=express();
app.use(bodyParser.json())

app.use(cors({origin:['http://localhost:3000']}))
dotenv.config()


const PORT=process.env.PORT || 7000
const URL=process.env.MONGOURL

app.use("/api",route)


mongoose.connect('mongodb://localhost:27017/crud-app').then(()=>{
    console.log("DB connected successfully")
    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`)
    })

}).catch(error=>console.log(error))

