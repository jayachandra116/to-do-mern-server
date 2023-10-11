const express = require('express');

const PORT = 8080; 

const app = express();

app.use('/', (req,res,next)=>{
    res.status(200).json({
        message:"Hello from root path '/'"
    });
})

app.listen(PORT, ()=>{
    console.log(`Server started on ${PORT}`);
})