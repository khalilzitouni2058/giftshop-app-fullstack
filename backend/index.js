const express=require("express");
const app=express();
const userRoute=require("./Routes/userRoute")
const productsRoute = require("./Routes/productsRoute");
const logsRoute = require("./Routes/logsRoute");

const dotenv=require("dotenv");
const connectDb = require("./Configurations/connectDB");
var cors = require('cors');

dotenv.config();
const port=process.env.PORT
connectDb()
app.use(cors())
app.listen(port, (error)=>{
    if(error){
        console.log("Server Failed")
    }else{
        console.log(`Server Started on port ${port}`)
    }    
});
app.use(express.json());
app.use("/api", userRoute);
app.use("/api",productsRoute);
app.use("/api",logsRoute);