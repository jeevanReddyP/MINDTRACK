const mongoose=require("mongoose")

const ConnecttoDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_U)
    } catch (error) {
        
    }
}