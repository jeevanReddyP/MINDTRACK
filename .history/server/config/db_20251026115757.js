const mongoose=require("mongoose")

const ConnecttoDB=async()=>{
    try {
        await mongoose.connect(pro)
    } catch (error) {
        
    }
}