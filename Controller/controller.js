const express=require('express');
const jwt=require("jsonwebtoken");
const app=express();

const pool=require("../database");
module.exports.datahere=async(req,res)=>{
    try{
        const k=await pool.query("select * from signup");
        return k.rows;

    }
    catch(err){
        console.log(err)
    }

}
module.exports.imageupload=async(req,res,next)=>{
    try{
    const imageData=req.file.buffer;
    const query={
        text:'INSERT INTO crash (image_data) VALUES ($1) RETURNING id',
        values:[imageData]
    };
    const result=await pool.query(query);
    res.json({id:result.rows[0].id})
}

catch(err){
next(err);
    // pool.query(query)
    // .then(result=>res.json({id:result.rows[0].id}))
    // .catch(err=>next(err));
}
};

module.exports.signup=async(req,res)=>{
    try {
        console.log("User Authentication");
        let errors=[];
        let {name,emailid,password,cpassword,phone_number}=req.body;

        console.log({
            name,emailid,password,cpassword,phone_number
        })
       
        if(!name||!emailid||!password||!cpassword||phone_number){
            errors.push({message:"Please enter all fields"})
        }
        if(password.length<=6){
            console.log('not 6 characters')
            errors.push({message:"Password should be of at least 6 characters"});
        }
        if(password!=cpassword){
            errors.push({message:"Password do not match"})
        }
        if(errors.length>0){
            //Forms Validation has passed

            pool.query(`SELECT * FROM signup WHERE emailid=$1`,[emailid],(err,results)=>{
                if(err){
                    throw err;
                }
                console.log(results.rows);
                if(results.rows.length>0){
                    errors.push({message:"email already registered "})
                    console.log(errors)
                    res.render("signup",{errors})
                    
                }else{
                    pool.query("insert into signup (name,emailid,password,cpassword,phone_number)values($1,$2,$3,$4,$5)",[name,emailid,password,cpassword,phone_number]);
                    res.redirect('/flying')
                }
            })
        }




        // console.log("hello");
        // var{name,emailid,password,cpassword,phone_number}= req.body
        // console.log(req.body)
        // var x=await pool.query("insert into signup (name,emailid,password,cpassword,phone_number)values($1,$2,$3,$4,$5)",[name,emailid,password,cpassword,phone_number]);
        // console.log(x)
    }
    catch(err){
        console.log(err)
    }

}
// module.exports.check=async(req,res)=>{
//     try{
//         console.log("User Authentication");
//         let {name,emailid,password,cpassword,phone_number}=req.body;

//         console.log({
//             name,emailid,password,cpassword,phone_number
//         })
//         let errors=[];
//         if(!name||!emailid||!password||!cpassword||phone_number){
//             errors.push({message:"Please enter all fields"})
//         }
//         if(password.length<6){
//             errors.push({message:"Password should be of at least 6 characters"});
//         }
//         if(password!=cpassword){
//             errors.push({message:"Password do not match"})
//         }
//         if(errors.length>0){
//             res.render('signup',{errors})
//         }
//         else{
//             //Forms Validation has passed

//             pool.query(`SELECT * FROM signup WHERE emailid=$1`,[emailid],(err,results)=>{
//                 if(err){
//                     throw err;
//                 }
//                 console.log(results.rows);
//                 if(results.rows.length>0){
//                     errors.push({message:"email already registered "})
//                     res.render("signup",{errors})
//                 }
//             })
//         }
//     }
//     catch(err){
//         console.log(err);
//     }
// }

module.exports.logincheck=async(req,res)=>{
    try{
        console.log("Checking Login Credentials");
    let {emailid,password}=req.body;
    console.log({
        emailid,password
    })
    pool.query(`SELECT * FROM signup where emailid =$1 AND password =$2`,[emailid,password],(err,results)=>{
        console.log(results.rows);
        if(err){
            throw err;
        }
        
        else{
            if(results.rows.length>0){
                console.log("Successful");
                const token=jwt.sign({emailid},'sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh');

                // res.json({token:token});
                console.log(token)
                res.cookie('authcookie',token,{maxAge:120000,httpOnly:true})
                res.redirect('/flying')
            }
            else{
                console.log("Wrong Email password")
                res.render('login')
            }
        }
    })
    }
    catch(err)
    {
        console.log(err);
    }
}


module.exports.flightdata=async(req,res)=>{
    try{
        const k=await pool.query("select * from flight_description");
        return k.rows;

    }
    catch(err){
        console.log(err)
    }

}

module.exports.flying=async(req,res)=>{
    try{
        const answer=req.body.answer;
        if(answer==='yes'){
        console.log("let's fly");
        var{flight_id,pilot_id,duration,date,mode,drone_id}=req.body
        console.log(req.body)
        var y=await pool.query(`INSERT INTO flight_description (flight_id,pilot_id,duration,date,mode,drone_id) VALUES ($1,$2,$3,$4,$5,$6)`,[flight_id,pilot_id,duration,date,mode,drone_id]);
        console.log(y);
        }
        else if(answer==='no'){
            var n=await pool.query(`INSERT INTO flight_description (flight_id,pilot_id,duration,date,mode,drone_id) VALUES ($1,$2,$3,$4,$5,$6)`,[flight_id,pilot_id,duration,date,mode,drone_id]);
            console.log("Insertion Successful")
        console.log(n);
            res.render('crash');
        }
        else{
            res.status(400).send("Invalid answer'")
        }
    }
    catch(err){
        console.log(err)
    }
}
module.exports.droneslistdata=async(req,res)=>{
    
    if(!req.cookies.authcookie)
    {
        return res.status(403).render('login', {message: 'Token Expired'});

    }
    else {
        const authcookie=await jwt.verify(req.cookies.authcookie,'sfhsfhsfhfsiofhiosghiogjiogjdoghfioghioghfodiofghdfiogh')
        console.log(authcookie)
        if(authcookie.iat - new Date().getTime() < 60000){

    try{
        const {rows}=await pool.query("SELECT drone_name FROM drones");
        console.log({rows})
        console.log("Hi")
        const list=rows.map(row=>row.drone_name);
        console.log(list)
        res.render('flying',{options:list})
    }
    catch(err){
        console.log(err)
    }
    }
    else
    {
        return res.send({code:404 ,message:'Token Expired'})
    }
}

}
module.exports.crashdetails=async(req,res)=>{
    try{
        console.log("Crash Details Submission");
        let {drone_name,pilot_id,flight_id,damaged_parts,reason}=req.body;
        console.log({
            drone_name,pilot_id,flight_id,damaged_parts,reason
        })
        pool.query('INSERT INTO crash (drone_name,pilot_id,flight_id,damaged_parts,reason)values($1,$2,$3,$4,$5)',[drone_name,pilot_id,flight_id,damaged_parts,reason]);
        console.log("Submission Successful");
    }
    catch(err){
        console.log(err)
    }
}