import mongoose from "mongoose";

const productSchema = new  mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
        },
        role: {
            type: String,
            enum: ["admin", "user", "member"],
            default: "user",
        },
    },
    { timestamps: true },
);

export default mongoose.model("Product", productSchema);
