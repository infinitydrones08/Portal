const express=require('express')
const router=express.Router();
const controller=require("../Controller/controller");
router.get('/',async(req,res)=>{
    const z=await controller.datahere(req,res);
    console.log(z);
    res.render("signup")
})
router.post('/signup',async(req,res)=>{
    const h=req.body;
        const y=await controller.signup(req,res);
        console.log(y);
        res.render("signup")
});

router.get('/flying',async(req,res)=>{
    const c=await controller.flightdata(req,res);
    console.log(c);
    // res.render("flying")
    const data=await controller.droneslistdata(req,res);
    console.log(data);
    res.render("flying",{title:'Express',drone_data:data});
})

router.post('/flying',async(req,res)=>{
    const h=req.body;
    console.log(h)
    console.log("Hi")
    const y=await controller.flying(req,res);
    console.log(y);
    res.render("flying");
})



module.exports=router;