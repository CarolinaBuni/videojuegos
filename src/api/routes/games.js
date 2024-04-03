const { isAuth, isAdmin } = require( "../../middlewares/auth" );
const upload = require( "../../middlewares/file" );
const { getGames, postGames, updateGames, deleteGames, getGamesById, getGamesByPrice, getGamesByGenre, getGamesByYear, getGamesAdmin } = require( "../controllers/games" );

const gamesRoutes = require("express").Router();

gamesRoutes.get("/not-verified",[isAdmin], getGamesAdmin);
gamesRoutes.get("/getById/:id", getGamesById);
gamesRoutes.get("/getByGenre/:genre", getGamesByGenre);
gamesRoutes.get("/getByYear/:releaseYear", getGamesByYear);
gamesRoutes.get("/getByPrice/:price", getGamesByPrice);
gamesRoutes.get("/", getGames);
gamesRoutes.post("/", [isAuth], upload.single("img"), postGames);
gamesRoutes.put("/:id", upload.single("img"),  updateGames);
gamesRoutes.delete("/:id", deleteGames);



module.exports = gamesRoutes;

