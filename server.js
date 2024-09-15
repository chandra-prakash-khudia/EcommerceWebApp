import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoute from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors'
import path from 'path'
 import { fileURLToPath } from 'url'; // Necessary for __dirname in ES Modules
// config env
dotenv.config()
// database config
connectDB();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// rest obj 
const app = express()
// middlewares\
//app.use(cors())

app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers)
  }))

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(morgan('dev'))
app.use(express.json());   //  to parse req.body
app.use(express.urlencoded({extended:true}));  // parse to from data
app.use(cookieParser())

// //  routes
app.use('/api/v1/auth', authRoute)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//port 
const port = process.env.PORT || 8080

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    )
})
