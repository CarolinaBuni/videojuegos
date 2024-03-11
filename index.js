require('dotenv').config();

const express = require('express');
const { connectDB } = require( './src/config/db' );
const gamesRoutes = require( './src/api/routes/games' );
const platformsRoutes = require( './src/api/routes/platforms' );
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/v1/platforms", platformsRoutes );
app.use("/api/v1/games", gamesRoutes);







app.use("*", (req, res, next) => {
     return res.status(404).json("Route not found")
});

app.listen(3000, () => {
     console.log("Servidor levantado en: http://localhost:3000");
});