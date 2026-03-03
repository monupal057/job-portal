import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// register

export const register = async(req,res) => {
    try{
        const{fullname,email,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message: "something is missing",
                sucess:false
            });
        };
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({
                message:"User already exist with this email.",
                sucess:false,
            })
        }
        const hashedPassword = await bcrypt.hash(password,10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
        });

        return res.status(201).json({
            message:"Account created successfully.",
            sucess:true
        });
    } catch(error){
     console.log(error);
    }
    }


    // login 

    export const login = async (req,res) => {
        try{
            const {email, password, role} = req.body; 
            if(!email || !password || !role) {
                return res.status(400).json({
                    message:"Something is missing",
                    sucess: false
                });
            };
           let  user = await User.findOne({ email });
            if (!user ){
                return res.status(400).json({
                    message:"Incorrect email or password.",
                    sucess: false
            })
        }
        const ispasswordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({
                message: "Incorrect email or password.",
                sucess: false,
            })
        };

        // check if role is correct or not 
        if (role !== user.role ){
            return res.status(400).json({
                message: "Account doesn't exist with current role.",
                success:false
            })
        };

        // token generated
        const tokenData = {
            userId: user._id
        }
         const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

         user = {
            _id: user._id,
            fullname: user.email,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
         }

         return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly:true, sameSite: 'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            user,
            success:true
         })


    } catch (error) {
     console.log(error);
    }
}

//logout

export const logout = async (req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"Logged out successfully.",
            success:true
        })
    } catch (error){
        console.log(error);
    }
}


// updateprofile

export const updateprofile = async (req,res) => {
    try {
        const { fullname, email, phoneNumber, bio , skills } = req.body;
        const file = req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        };

        // cloudinary 

         const skillsArray = skills.split(",");
         const userId = req.id; // middleware authentication
         let user = await User.findById(userId);

         if (!user) {
             return res.status(400).json({
                message: "User not found.",
                success : false
             })
         }

         // update the data 
         user.fullname = fullname,
          user.email = email,
         user.phoneNumber = phoneNumber,
          user.profile.bio = bio,
          user.profile.skills = skillsArray  

          // resume comes later here ...

           await user.save();

            user = {
            _id: user._id,
            fullname: user.email,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
         }

         return res.status(200).json({
            message: "Profile updated successfully.",
            user,
             success: true
         })

    } catch (error) {
        console.log(error);
    }
}