import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string,
    password: string,
    email: string,
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
    posts: string[]
};

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        min: 4,
        lowercase: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true
    },

    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]

});

userSchema.methods.encryptPassword = async function(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password)
};

export default model<IUser>('User', userSchema);