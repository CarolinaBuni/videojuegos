const { deleteFile } = require( "../../utils/deleteFile" );
const Platform = require("../models/platforms")

//* READ
const getPlatforms = async (req, res, next) => {
     try {
          const allPlatforms = await Platform.find().populate("games");
          return res.status(200).json(allPlatforms);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación de la plataforma", error)
     }
};

//? GET BY ID
const getPlatformsById = async (req, res, next) => {
     try {
          const { id } = req.params;
          const platformById = await Platform.findById(id).populate("games");

          return res.status(200).json(platformById);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación de la plataforma , error)por ID")
     }
}



//* CREATE
const postPlatforms = async (req, res, next) => {
     try {
          const platform = new Platform(req.body);
          if(req.file) {
               platform.img = req.file.path;
          }
          const platformSaved = await platform.save();
          return res.status(200).json(platformSaved);
     } catch (error) {
          return res.status(404).json("Ha fallado la creación de la plataforma", error)
     }
}


//* UPDATE
const updatePlatforms = async (req, res, next) => {
     try {
          console.log("hola");
          const { id } = req.params;
          const oldPlatform = await Platform.findById(id);
          const newPlatform = new Platform(req.body);

          newPlatform._id = id;
          const games = req.body.games || [];

          newPlatform.games = [...oldPlatform.games, ...games];

          if(req.file) {
               newPlatform.img = req.file.path;
               deleteFile(oldPlatform.img);
          }
          const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, { new: true });

          return res.status(200).json(platformUpdated);
     } catch (error) {
          console.log(error);
          return res.status(404).json(error);
     }
}


//* DELETE
const deletePlatforms = async (req, res, next) => {
     try {
          const { id } = req.params;
          const platformDeleted = await Platform.findByIdAndDelete(id);
          console.log(platformDeleted);
          deleteFile(platformDeleted.img);
          return res.status(200).json(platformDeleted);
     } catch (error) {
          return res.status(404).json("Ha fallado la eliminación de la plataforma")
     }
}



module.exports = { getPlatforms, postPlatforms, updatePlatforms, deletePlatforms, getPlatformsById }; 