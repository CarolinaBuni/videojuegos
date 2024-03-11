const { getGames, postGames, updateGames, deleteGames, getGamesById, getGamesByPrice, getGamesByGenre, getGamesByYear } = require( "../controllers/games" );

const gamesRoutes = require("express").Router();


gamesRoutes.get("/getById/:id", getGamesById);
gamesRoutes.get("/getByGenre/:genre", getGamesByGenre);
gamesRoutes.get("/getByYear/:releaseYear", getGamesByYear);
gamesRoutes.get("/getByPrice/:price", getGamesByPrice);
gamesRoutes.get("/", getGames);
gamesRoutes.post("/", postGames);
gamesRoutes.put("/:id", updateGames);
gamesRoutes.delete("/:id", deleteGames);



module.exports = gamesRoutes;

