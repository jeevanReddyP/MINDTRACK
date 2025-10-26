const mongoose=require("mongoose")

const ConnecttoDB=async()=>{
    try {
        await mongoose.connect(process.env.M)
    } catch (error) {
        
    }
}