const { getPlatforms, getPlatformsById, postPlatforms, updatePlatforms, deletePlatforms } = require( "../controllers/platforms" );


const platformsRoutes = require("express").Router();


platformsRoutes.get("/getById/:id", getPlatformsById);
platformsRoutes.get("/", getPlatforms);
platformsRoutes.post("/", postPlatforms);
platformsRoutes.put("/:id", updatePlatforms);
platformsRoutes.delete("/:id", deletePlatforms);



module.exports = platformsRoutes;

