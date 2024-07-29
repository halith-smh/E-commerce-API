const mongoose = require("mongoose");



const connectDB = async () => {
    try {
        const ConnectionInstance = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected: ${ConnectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Error", error);
    }
}

module.exports = {connectDB};