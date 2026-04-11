import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
   
    {
    name: {
        type: String,
        required: true,
        trim: true,
        message: "Name is required" ,// this is for validation
        validate: {
            validator: function(v) {
                return v.length >= 3;
            },
            message: "Name must be at least 3 characters long"
        }
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        message: "Email is required" ,// this is for validation
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Please enter a valid email address"
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        message: "Password must be at least 6 characters long" // this is for validation
    }

}

);
  

userSchema.pre("save", async function() {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};




export default mongoose.model("User", userSchema);


