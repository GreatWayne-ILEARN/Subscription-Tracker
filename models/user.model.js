import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
        trim: true,
        minLength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please fill in a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minLength: 6
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;