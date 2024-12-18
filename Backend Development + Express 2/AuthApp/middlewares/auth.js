
// authentication, 
// authorization :- isStudent, isAdmin

const jwt= require('jsonwebtoken')
require('dotenv').config()

exports.auth = (req,res,next) => {
    try{
        console.log("body :- ",req.body.token)
        console.log("cookie :- ",req.cookies.token)
        console.log("Header :- ",req.header("Authorization"))

        //  other ways to fetch token
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","")

        if(!token){
           return res.status(401).json({
                sucess:false,
                message:"token missing"
            })
        }

        //verify the token
        try{
            const payload= jwt.verify(token, process.env.JWT_SECRET)
            console.log(payload)
            req.user= payload
        }
        catch(err){
            return res.status(401).json({
                sucess:false,
                message:"token invalid"
            })
        }
        next()
    }
    catch(err){
        return res.status(401).json({
            sucess:false,
            message:"something went wrong while verifying the token"
        })
    }
}

exports.isStudent = (req,res,next)=>{
    try{
        if(req.user.role != "Student"){
            return res.status(401).json({
                sucess:false,
                message:"this is a protected route for students"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user Role is not matching"
        })
    }
    next()
}

exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role != "Admin"){
            return res.status(401).json({
                success:false,
                message:"this is a protected route for admin"
            })
        }
    }
    catch(err){
        return res.status(500).json({
            success:false,
            message:"user Role is not matching"
        })
    }
    next()
}