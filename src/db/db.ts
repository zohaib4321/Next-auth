import mongoose from "mongoose";

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDb Connected 👍");
        })

        connection.on("error", (error) => {
            console.log("MongoDb Failed to Connect 👎" + error);
            process.exit(1)
        })

    } catch (error) {
        console.log(error);
        console.log("⚙️ MongoDb Connection Error");        
    }
}

export default connectDB