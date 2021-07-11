const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json({ extended: false }));

app.use(cors());


//=================================================MONGODB CONFIGS AND CONNECTION =================================================================
const mongoURI = process.env.mongoURI;
const mongoConnectionEssentials = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true   
};

mongoose.connect(mongoURI, mongoConnectionEssentials, (error) => {
    if(error) {
        console.log(error);
    }
    console.log("Connection to MongoDB Successful...")
})

//====================================SERVER CONFIGS AND CONNECTION================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started at PORT=${PORT}`);
})


//=================================================ROUTERS=====================================
const authRouter = require('./routes/auth');
const tweetRouter = require('./routes/tweet');

//=====================================================API ROUTES===========================================
app.use('/api/auth', authRouter);
app.use('/api/tweet', tweetRouter);