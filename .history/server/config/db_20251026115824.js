const mongoose=require("mongoose")

const ConnecttoDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        
    }
}