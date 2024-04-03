const { deleteFile } = require( "../../utils/deleteFile" );
const Game = require( "../models/games" );

//* READ
const getGames = async (req, res, next) => {
     try {
          const allGames = await Game.find({ verified: true });
          return res.status(200).json(allGames);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego")
     }
};


//! GET Juegos Admin
const getGamesAdmin = async (req, res, next) => {
     try {
          const allGames = await Game.find({ verified: false });
          return res.status(200).json(allGames);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego")
     }
};


//? GET BY ID
const getGamesById = async (req, res, next) => {
     try {
          const { id } = req.params;
          const gameById = await Game.findById(id);

          return res.status(200).json(gameById);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego por ID")
     }
}


//? GET BY PRICE (Menor que)
const getGamesByPrice = async (req, res, next) => {
     try {
          const { price } = req.params;
          const gameByPrice = await Game.find({price: {$lt: price}});
          return res.status(200).json(gameByPrice);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego por precio")
     }
}


//? GET BY GENRE
const getGamesByGenre = async (req, res, next) => {
     try {
          const { genre } = req.params;
          const gameByGenre = await Game.find({ genre: genre });

          return res.status(200).json(gameByGenre);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego por género")
     }
}

//? GET BY YEAR (Mayor que)
const getGamesByYear = async (req, res, next) => {
     try {
          const { releaseYear } = req.params;
          const gameByYear = await Game.find({releaseYear: {$gte: releaseYear}});

          return res.status(200).json(gameByYear);
     } catch (error) {
          return res.status(404).json("Ha fallado la recuperación del juego por año")
     }
}


//* CREATE
const postGames = async (req, res, next) => {
     try {
          const game = new Game(req.body);

          if(req.file) {
               game.img = req.file.path;
          }

          if(req.user.rol === "admin"){
               game.verified = true;
          } else {
               game.verified = false;
          }

          const gameSaved = await game.save();
          return res.status(200).json(gameSaved);
     } catch (error) {
          return res.status(404).json("Ha fallado la creación del juego")
     }
}


//* UPDATE
const updateGames = async (req, res, next) => {
     try {
          const { id } = req.params;
          const newGame = new Game(req.body);
          newGame._id = id;

          if(req.file) {
               newGame.img = req.file.path;

               const oldGame = await Game.findById(id);
               deleteFile(oldGame.img);
          }

          const gameUpdated = await Game.findByIdAndUpdate(id, newGame, { new: true });

          return res.status(200).json(gameUpdated);
     } catch (error) {
          return res.status(404).json("Ha fallado la actualización del juego")
     }
}


//* DELETE
const deleteGames = async (req, res, next) => {
     try {
          const { id } = req.params;
          const gameDeleted = await Game.findByIdAndDelete(id);
          deleteFile(gameDeleted.img);

          return res.status(200).json(gameDeleted);
     } catch (error) {
          return res.status(404).json("Ha fallado la eliminación del juego")
     }
}



module.exports = { getGames, postGames, updateGames, deleteGames, getGamesById, getGamesByPrice, getGamesByGenre, getGamesByYear, getGamesAdmin }; 