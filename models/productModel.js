import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please Enter Name"],
    },
    description: {
        type: String,
        required: [true, "PLease Enter Descriptions"]
    },
    price: {
        type: Number,
        required: [true, "Please Enter Price"]
    },
    stock: {
        type: Number,
        required: [true, "Please Enter Stock"]
    },
    images: [
        {
            public_id: String,
            url: String,
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CategoryCollection"
    }
    ,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCollection"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export const ProductCollection = mongoose.model("ProductCollection", productSchema)