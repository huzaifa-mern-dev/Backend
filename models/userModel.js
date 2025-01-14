import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({

    name: {
        type:String,
        required:[true,"Please Enter Name"]
    },
    email: {
        type:String,
        required:[true,"Please Enter Email"],
        unique:[true,"Email Has Already Exist, Please Make Another Email"],
        validate:validator.isEmail
    },
    password: {
        type:String,
        required:[true,"Please Enter Password"],
        minLength:[6,"Password Must be Atleast 6 Character Long"],
        select:false
    },
    address: {
        type:String,
        required:true,
    },
    city: {
        type:String,
        required:true
    },
    country: {
        type:String,
        required:true
    },
    pinCode: {
        type:Number,
        required:true
    },
    role: {
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    avatar: {
        public_id:String,
        url:String,
    },
    otp:Number,
    otp_expire:Date,
    follow: [
        {
            type: String
        }
    ]

})

userSchema.pre("save", async function(next) {

    if (!this.isModified("password")) return next()

    const tempPassword = bcrypt.hash(this.password, 10)
    this.password = tempPassword
})

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateToken = async function() {

    console.log(this)

    

    return jwt.sign({
        _id:this._id
    }, 
        process.env.JWT_SECRET,
        {
            expiresIn:"15d"
        }
    )
}


export const UserCollection = mongoose.model("UserCollection", userSchema)