const express=require('express')
const router=express.Router();
const controller=require("../Controller/controller");
router.get('/',async(req,res)=>{
    const z=await controller.datahere(req,res);
    console.log(z);
    res.render("signup")
})

// router.post('/signup',async(req,res)=>{
//     const n=await controller.check(req,res);
//         console.log(n)
        
//         res.render("signup")
// });



router.post('/signup',async(req,res)=>{
    // const n=await controller.check(req,res);
        
    const h=req.body;
        const y=await controller.signup(req,res);
        console.log(y);
        
        // res.render("signup")
        res.setHeader('ejs','signup')
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
router.post('/crash',async(req,res)=>{
    const p=req.body
    console.log(p);
    const t=await controller.crashdetails(req,res);
    console.log(t)
    res.render('crash');
})



module.exports=router;