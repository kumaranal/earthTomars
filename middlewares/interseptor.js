const interceptor = require('express-interceptor');



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

  module.exports=finalresponce;