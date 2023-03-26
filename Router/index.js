const express=require('express')
const router=express.Router();
const multer = require('multer');
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


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024 // limit file size to 5 MB
    }
  });



router.post('/signup',async(req,res)=>{
    // const n=await controller.check(req,res);
        
    const h=req.body;
        const y=await controller.signup(req,res);
        console.log(y);
        
        // res.render("signup")
        res.setHeader('ejs','signup')
});

router.post('/upload',upload.single('image'),(req,res,next)=>{
    const x=await.controller.imageupload(req,res,next);
    console.log(x);
})

router.get('/flying',async(req,res)=>{
    const data=await controller.droneslistdata(req,res);
    console.log(data);
    // res.render('flying',{options});
    // const {t}=await pool.query("SELECT drone_name FROM  drones");
    // console.log({t})
    // // console.log(t)
    // console.log("Hi")
    // const options=t.map(row=>row.drone_name);
    // console.log({options})
    // res.render('flying',{ options: options})



    const c=await controller.flightdata(req,res);
    console.log(c);
    res.render("flying")
   
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