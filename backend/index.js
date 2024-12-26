import express from "express";
import {ConnectDB} from './ConnectDB.js'
import dotenv from "dotenv"
import blogRoutes from './routes/blog.route.js'
import userRoutes from './routes/user.route.js'
import bookingRoutes from './routes/booking.route.js'
import eventRoutes from './routes/event.route.js'
import cors from 'cors'
import cookieParser from "cookie-parser";


dotenv.config();


const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000', // allow requests from this origin
  credentials: true, // allow cookies
}))

app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/booking", bookingRoutes);


app.get('/api', (req,res)=>{
  res.send('connected');
})
app.listen(8800, ()=>{
  console.log("Server is running on port 8800");
  ConnectDB();
})