import mongoose, { trusted } from "mongoose";
const companySchema = new mongoose.Schema({
    name:{
        type:Number,
        required:true
    },
    description:{
        type:Number,
        required:true
    },
    location:{

    },
    logo:{

    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true})