const express = require('express');
const cors = require('cors');

const initializeDb = require("./config/db");

const memberRoutes = require('./routes/memberRoutes');

const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/members",memberRoutes)

initializeDb();

app.listen(3000, ()=>{
    console.log(`The server is running on ${3000}`);
});
