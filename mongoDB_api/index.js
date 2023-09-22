const express = require("express")
const mongoose = require('mongoose');
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
require('dotenv').config();
mongoose
    .connect(process.env.ATLAS_URL)
    .then((success) => console.log("Connected to MongoDB"))
    .catch((err) =>  console.log(err.message));
    
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");

// Async await method:
// const connectToMongo = async () => {
//     await mongoose.connect(process.env.ATLAS_URL);
//     console.log("Connected to MongoDB");
// };
// connectToMongo();

app.use(bodyParser.json());
app.use(cors());

// Using controller routes
app.use("/", productRoute);
app.use("/", userRoute);

app.listen(5000, () => {
    console.log("Server running on port 5000");
})