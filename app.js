require('dotenv').config()
const express =  require("express")
const app = express()
const PORT = 7777
const mongoose = require("mongoose")
const notFound = require('./middleware/notfound')
const userRouter = require('./routes/userRoutes')
mongoose.set("strictQuery", true);


//MIDDLEWARE
app.use(express.json())

//ROUTES
app.use(userRouter);

//ERROR ROUTE
app.use(notFound);

const start = async ()=> {
    try{await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT,() =>{
            console.log(`server running on port ${PORT}...`);
        });
        } catch (error) {console.log(error);}
    }

start()