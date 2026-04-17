import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Product title is required"],
        trim: true
    },
    price: {
        type: Number,
        required: [true, "Product price is required"]
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        trim: true
    },
    thumbnail: {
        type: String,
        default: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400"
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Since the frontend expects 'id' but MongoDB provides '_id', 
// we ensure 'id' is available in the virtuals.
productSchema.virtual('id').get(function() {
    return this._id.toHexString();
});

export default mongoose.model("Product", productSchema);
