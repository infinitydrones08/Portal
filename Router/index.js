const express=require('express')
const jwt=require("jsonwebtoken");
const session = require('express-session');

// const app=express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const router=express.Router();
const multer = require('multer');
const controller=require("../Controller/controller");
router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())
router.use(cookieParser())
router.get('/signup',async(req,res)=>{
    const z=await controller.datahere(req,res);
    console.log(z);
    res.render("signup")
})
router.get('/upload',async(req,res)=>{
    res.render("image")
})
router.get('/try',async(req,res)=>{
    res.render("try")
})
router.get('/result',async(req,res)=>{
    res.render("result")
})
router.get('/profile',async(req,res)=>{
    res.render("profile");
})
router.get('/admin',checkToken,async(req,res)=>{
    res.render("admin")
})
router.get('/logout',(req,res)=>{
    const authcookie=req.cookies.authcookie
    const email=req.cookies.email
    res.clearCookie('authcookie');
    res.redirect('/login');
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

router.post('/upload',upload.single('image_data'),async(req,res,next)=>{
    try{
    const x=await controller.imageupload(req,res,next);
    console.log(x);
    }
    catch(err)
    {
        next(err);
    }
})

router.get('/flying',checkToken,async(req,res)=>{
    
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
    // res.render("flying",{options:[]});
   
})

router.get('/viewdetails',checkToken,async(req,res)=>{
    
    console.log("working");
    const data=await controller.viewdetails(req,res);
    
    
    res.render('viewdetails',{data});
    // res.send(y);
    // console.log(y);
    // res.send("Displaying current user details")
    // res.render('admin')
    
})

router.post('/flying',checkToken,async(req,res)=>{
    
    const h=req.body;
    console.log(h)
    console.log("Hi")
    const y=await controller.flying(req,res);
    console.log(y);
    // res.render("login");
    // res.send("Report Submission Done")
    // alert("done");
})

router.post('/crash',checkToken,async(req,res)=>{
    const p=req.body
    console.log(p);
    const t=await controller.crashdetails(req,res);
    console.log(t)
    // res.render('crash');
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
    // function auth(val,err)
    // {
    //     if(val)
    //     {
    //         res.render('crash')
    //     }
    //     else if(err)
    //     {
    //         res.render('/login')
    //     }
    // }
    res.render('crash');
})
function checkToken(req,res,next){
    //get authcookie from request

    const authcookie=req.cookies.authcookie
    const email=req.cookies.email
    console.log(email)
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
router.post('/calculate_price', async (req, res) => {
  try {
    const totalPrice = await controller.costestimation(req, res);
    console.log(totalPrice);
    res.json({ totalPrice });
  } catch (err) {
    console.error('Error calculating price:', err);
    res.status(500).json({ error: 'Error calculating price' });
  }
});
router.get('/dashboard',checkToken,async(req,res)=>{
    
    // console.log("working");
    // const data=await controller.dashboard(req,res);
    // console.log(data);
    // let sum=0;
    // for(let i=0;i<data.length;i++)
    // {
    //     sum+=parseInt(data[i].duration,10);
    // }
    // console.log(sum)
    // res.render('dashboard',{sum});
    // res.send(y);
    // console.log(y);
    // res.send("Displaying current user details")
    // res.render('admin')


    try{
        console.log("Working");
        const { totalDuration,results,crashDetails,crashdetailsrows}=await controller.dashboard(req,res);
        console.log(crashDetails);
        console.log(totalDuration);
        console.log("it will show crashdetails")
        console.log(crashdetailsrows)
        res.render('dashboard',{totalDuration,results,query4:crashDetails,crashdetails:crashdetailsrows})
    }
    catch(err)
    {
        console.log(err);
        res.render('dashboard',{totalDuration:0,results:[],query4:[],crashdetails:[]});
    }
    
})





module.exports=router;