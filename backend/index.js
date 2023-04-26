const express=require('express');
const { connection } = require('./db.js');
const { personRouter } = require('./Routes/personRoute');

require('dotenv').config();
const app=express();

const PORT=process.env.PORT;
app.use(express.json());
app.use('/person',personRouter);


app.get('/',(req,res)=>{
    res.send("My api is working properly");
})

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("connection db succesufully");
        
    } catch (error) {
        console.log(error);
    }

    console.log(`server connected to port ${PORT}`);
})