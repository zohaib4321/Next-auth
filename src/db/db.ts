import mongoose from "mongoose";

async function connectDB() {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
        // const connection = mongoose.connection;
        console.log(`MongoDb Connected 👍 || DB host: ${connectionInstance.connection.host}`);
        
        // connection.on("connected", () => {
        //     console.log("MongoDb Connected 👍");
        // })

        // connection.on("error", (error) => {
        //     console.log("MongoDb Failed to Connect 👎" + error);
        //     process.exit(1)
        // })

    } catch (error) {
        console.log(error);
        console.log("⚙️ MongoDb Connection Error");        
    }
}

export default connectDB