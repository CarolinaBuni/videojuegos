const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const platformSchema = new Schema(
     {
          img: { type: String, required: true },
          name: { type: String, required: true },
          games: [{ type: mongoose.Types.ObjectId, required: false, ref: "games"}],
     },
     {
          timestamps: true,
          collection: "platforms"
     }
);

const Platform = mongoose.model('platforms', platformSchema, 'platforms');

module.exports = Platform;