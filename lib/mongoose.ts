import mongoose from 'mongoose'

let isConnected = false;

export const connectToDb =async() => {
    mongoose.set('strictQuery' , true);
    if(!process.env.MONGODB_URL) return console.log("URl Missing")

    if(isConnected){
        console.log("Mongodb connection established")
        return;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected = true;
        console.log("MongoDB connected");
    }
    catch(Err){
        console.log(Err)

    }
}