const express=require('express');
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
        console.log("let's fly");
        var{flight_id,pilot_id,duration,date,mode,drone_id}=req.body
        console.log(req.body)
        var y=await pool.query(`INSERT INTO flight_description (flight_id,pilot_id,duration,date,mode,drone_id) VALUES ($1,$2,$3,$4,$5,$6)`,[flight_id,pilot_id,duration,date,mode,drone_id]);
        console.log(y);
    }
    catch(err){
        console.log(err)
    }
}
module.exports.droneslistdata=async(req,res)=>{
    try{
        const t=await pool.query("select drone_name from drones");
        console.log(t)
        console.log("Hi")
        return t.rows;
    }
    catch(err){
        console.log(err)
    }

}