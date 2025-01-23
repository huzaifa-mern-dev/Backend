import mongoose from "mongoose"

const schema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, "Please Enter Category"]
    }
})

export const CategoryCollection = mongoose.model("CategoryCollection", schema)