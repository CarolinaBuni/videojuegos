const Platform = require("../models/platforms")

//* READ
const getPlatforms = async (req, res, next) => {
     try {
          const allPlatforms = await Platform.find().populate("games");
          return res.status(200).json(allPlatforms);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego")
     }
};

//? GET BY ID
const getPlatformsById = async (req, res, next) => {
     try {
          const { id } = req.params;
          const platformById = await Platform.findById(id).populate("games");

          return res.status(200).json(platformById);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego por ID")
     }
}



//* CREATE
const postPlatforms = async (req, res, next) => {
     try {
          const platform = new Platform(req.body);
          const platformSaved = await platform.save();
          return res.status(200).json(platformSaved);
     } catch (error) {
          return res.status(404).json("Ha fallado la creación del juego")
     }
}


//* UPDATE
const updatePlatforms = async (req, res, next) => {
     try {
          const { id } = req.params;
          const oldPlatform = await Platform.findById(id);
          const newPlatform = new Platform(req.body);

          newPlatform._id = id;
          newPlatform.games = [...oldPlatform.games, ...req.body.games];
          const platformUpdated = await Platform.findByIdAndUpdate(id, newPlatform, { new: true });

          return res.status(200).json(platformUpdated);
     } catch (error) {
          return res.status(404).json("Ha fallado la actualización del juego")
     }
}


//* DELETE
const deletePlatforms = async (req, res, next) => {
     try {
          const { id } = req.params;
          const platformDeleted = await Platform.findByIdAndDelete(id);

          return res.status(200).json(platformDeleted);
     } catch (error) {
          return res.status(404).json("Ha fallado la eliminación del juego")
     }
}



module.exports = { getPlatforms, postPlatforms, updatePlatforms, deletePlatforms, getPlatformsById }; 