const express=require("express");
const {conversionfn} = require('../controllerfile.js/conversion');
const cheackerfn = require("../middlewares/headerCheack");
const router=express.Router()
router.post('/api/earth-mars-comm/message',cheackerfn,conversionfn)

module.exports=router;