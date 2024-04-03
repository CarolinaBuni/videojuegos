const express = require('express');

const gamesRoutes = require( "../api/routes/games" );
const platformsRoutes = require( "../api/routes/platforms" );
const usersRoutes = require( "../api/routes/users" );

const router = express.Router();

router.use("/games", gamesRoutes);
router.use('/platforms', platformsRoutes);
router.use('/users', usersRoutes);

module.exports = router;