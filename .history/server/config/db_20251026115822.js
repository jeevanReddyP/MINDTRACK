const mongoose=require("mongoose")

const ConnecttoDB=async()=>{
    try {
        const connawait mongoose.connect(process.env.MONGO_URI)
    } catch (error) {
        
    }
}