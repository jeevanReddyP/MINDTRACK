const mongoose=require("mongoose")

const ConnecttoDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        useNewUrlParser: true,
      useUnifiedTopology: true,
    } catch (error) {
        
    }
}