const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const urlSchema = new Schema({
  title: String,
  url: String
});

module.exports = mongoose.model('Url', urlSchema);
