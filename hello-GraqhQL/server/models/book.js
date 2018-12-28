const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String, //must be Capital "S"
  genre: String,
  authorId: String
});

module.exports = mongoose.model("Book", bookSchema);
