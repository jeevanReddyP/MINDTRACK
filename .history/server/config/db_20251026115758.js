const mongoose=require("mongoose")

const ConnecttoDB=async()=>{
    try {
        await mongoose.connect(process)
    } catch (error) {
        
    }
}