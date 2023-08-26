const cheackerfn=async(req,res,next)=>{
    const startingTime=new Date();
    const sender= req.headers["x-sender"];
    const  receiver=req.headers["x-receiver"];
    if(!(sender && receiver)){
        return res.status(401).send({error: "please give valid sender & reciver not present"})
    }
    try{

        console.log("x-sender =  ",sender);
        console.log("x-receiver =  ",receiver)
        req.cheackerMiddlewareSender=sender;
        req.cheackerMiddlewareReceiver=receiver;
        req.startingTime=startingTime

    }catch(e){
        return res.status(401).send({error: "please give valid sender & reciver not present."})

    }
    next();
}
module.exports=cheackerfn;