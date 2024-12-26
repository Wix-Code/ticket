import mongoose from 'mongoose'

export const ConnectDB = async () => { 
  try{
    const connect = await mongoose.connect(process.env.MONGO_URI);
    if(connect){
      console.log("Connected to Database");
    }
  } 
  catch (error){
    throw (error);
  }
}


