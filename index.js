const express=require("express");
const cors= require ("cors")
const app=express();
const routes= require("./routes/routerPath")
const fileupload=require('express-fileupload');
const interceptor = require('express-interceptor');

require('dotenv').config();

app.use(express.json())
app.use(cors())
app.use(fileupload({
    useTempFiles:true
}))


//PORT connection
const port= process.env.PORT||6000;
app.listen(port,()=>{
    console.log(`listening port ${port}`);
});


const finalresponce = interceptor(function(req, res){
    return {
      isInterceptable: function(){
        return true;
      },
      intercept: function(body, send) {
        send(body);
      }
    };
  })

  app.use(finalresponce)
   app.use('/',routes);

   app.use(function(err,req,res,next){
    console.log(err.message);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
    });