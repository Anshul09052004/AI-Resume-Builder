import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

UserSchema.method.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default mongoose.model("User", UserSchema);