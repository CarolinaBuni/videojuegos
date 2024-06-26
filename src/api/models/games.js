const mongoose = require( "mongoose" );

const Schema = mongoose.Schema;

const gameSchema = new Schema(
     {
          img: { type: String, required: true },
          title: { type: String, required: true },
          releaseYear: { type: Number },
          genre: {
               type: String,
               required: true,
               enum: [
                    "Action",
                    "Adventure",
                    "RPG",
                    "Shooter",
                    "Strategy",
                    "Sports",
                    "Racing",
                    "Fighting",
                    "Simulation",
                    "Platformer",
                    "Puzzle",
                    "Survival",
                    "Horror",
                    "Open World",
                    "Sandbox",
                    "Stealth",
                    "MMO",
               ],
          },
          price: { type: Number, required: true },
          verified: { type: Boolean, required: true, default: false }
     },
     {
          timestamps: true,
          collection: "games",
     }
);

const Game = mongoose.model( "games", gameSchema, "games" );

module.exports = Game;
