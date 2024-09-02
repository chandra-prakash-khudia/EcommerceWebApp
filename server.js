import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import authRoute from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from 'cors'
// config env
dotenv.config()
// database config
connectDB();

// rest obj 
const app = express()
// middlewares\
app.use(cors())


const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your frontend URL
    credentials: true, // Allow cookies and other credentials
};



// Use CORS middleware
app.use(cors(corsOptions));

// Handle pre-flight requests for all routes
app.options('*', cors(corsOptions));


app.use(morgan('dev'))
app.use(express.json());   //  to parse req.body
app.use(express.urlencoded({extended:true}));  // parse to from data
app.use(cookieParser())
//  routes
app.use('/api/v1/auth', authRoute)
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
// rest api 
app.get('/', (req, res) => {
    res.send('Hello World');
})

//port 
const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Server is running on port ${port}`
    )
})
