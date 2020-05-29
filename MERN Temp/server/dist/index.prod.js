"use strict";var express=require("express"),app=express(),mongoose=require("mongoose"),bodyParser=require("body-parser"),cookieParser=require("cookie-parser"),config=require("./config/key"),_require=require("./models/user"),User=_require.User,_require2=require("./middleware/auth"),auth=_require2.auth;mongoose.connect(config.mongoURI,{useNewUrlParser:!0}).then(function(){return console.log("DB connected")}).catch(function(e){return console.error(e)}),app.use(bodyParser.urlencoded({extended:!0})),app.use(bodyParser.json()),app.use(cookieParser()),app.get("/",function(e,r){r.json({Hello:" Functioneaza"})}),app.get("/api/user/auth",auth,function(e,r){r.status(200).json({_id:e._id,isAuth:!0,email:e.user.email,name:e.user.name,lastname:e.user.lastname,role:e.user.role})}),app.post("/api/users/register",function(e,s){new User(e.body).save(function(e,r){return e?s.json({succes:!1,err:e}):s.status(200).json({succes:!0,userData:doc})})}),app.post("/api/user/login",function(s,o){User.findOne({email:s.body.email},function(e,r){if(!r)return o.json({loginSuccess:!1,message:"Autentificare esuata"});r.comparePassword(s.body.password,function(e,r){if(!r)return o.json({loginSuccess:!1,message:"Parola gresita"})}),r.generateToken(function(e,r){if(e)return o.status(400).send(e);o.cookie("x_auth",r.token).status(200).json({loginSuccess:!0})})})}),app.get("/api/user/logout",auth,function(e,s){User.findOneAndUpdate({_id:e.user._id},{token:""},function(e,r){return e?s.json({success:!1,err:e}):s.status(200).send({success:!0})})});var port=process.env.PORT||5013;app.listen(port,function(){console.log("Server Running on ${port}")});