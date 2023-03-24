const express=require('express');
const app=express();
const pool=require("../database");
module.exports.datahere=async(req,res)=>{
    try{
        const k=await pool.query("select * from pilot");
        return k.rows;

    }
    catch(err){
        console.log(err)
    }

}
module.exports.signup=async(req,res)=>{
    try {
        
        console.log("hello");
        var{name,emailid,password,cpassword,phone_number}= req.body
        console.log(req.body)
        var x=await pool.query("insert into signup (name,emailid,password,cpassword,phone_number)values($1,$2,$3,$4,$5)",[name,emailid,password,cpassword,phone_number]);
        console.log(x)
    }
    catch(err){
        console.log(err)
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