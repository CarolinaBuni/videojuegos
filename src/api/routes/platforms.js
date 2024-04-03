const { isAdmin } = require( "../../middlewares/auth" );
const upload = require( "../../middlewares/file" );
const { getPlatforms, getPlatformsById, postPlatforms, updatePlatforms, deletePlatforms } = require( "../controllers/platforms" );


const platformsRoutes = require("express").Router();


platformsRoutes.get("/getById/:id", getPlatformsById);
platformsRoutes.get("/", getPlatforms);
platformsRoutes.post("/",[isAdmin], upload.single("img"), postPlatforms);
platformsRoutes.put("/:id",[isAdmin] ,upload.single("img"), updatePlatforms);
platformsRoutes.delete("/:id",[isAdmin], deletePlatforms);



module.exports = platformsRoutes;

