const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');
const userRoutes = require('./routes/userRoute')
const app = express();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use('/api', userRoutes)

dotenv.config();

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.error("Error in connecting ", err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})