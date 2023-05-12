const express=require('express')
const jwt=require("jsonwebtoken");
// const app=express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const router=express.Router();
const multer = require('multer');
const controller=require("../Controller/controller");
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())
router.use(cookieParser())
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
router.get('/login',(req,res)=>{
    res.render('login');
})
router.post('/login',async(req,res)=>{
    const h=req.body;
    const y=await controller.logincheck(req,res);
    console.log(y);

    
})
// router.get('/protected',(req,res)=>{
//     const token=req.headers['authorization'];

//     if(!token)
//     {
//         res.status(401).send('No token provided');
//         return;
//     }
//     jwt.verify(req.token,'sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh',(err,decoded)=>{
//         if(err){
//             res.status(401).send('Invalid token');
//             return;
//         }
//         // If the token is valid, return a success message with the decoded token payload
//     res.send(`Hello, ${decoded.email}!`);
//     res.render('/flying')
//     console.log("Token done")
//     })
// })
router.get('/api',checkToken,(req,res)=>{
    res.render('crash');
})
function checkToken(req,res,next){
    //get authcookie from request

    const authcookie=req.cookies.authcookie
    console.log(authcookie)

    //verify token which is in cookie value
    jwt.verify(authcookie,"sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh",(err,data)=>{
        if(err){
            res.sendStatus(403)
        }
        else {
           req.user=data;//Set the decoded data in the req.user object
           next();
            
        }
    })
}




module.exports=router;