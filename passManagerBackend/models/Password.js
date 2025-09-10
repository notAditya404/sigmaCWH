import mongoose from "mongoose"

// const kittySchema = new mongoose.Schema({
//   name: String
// });

// export const Kitten = mongoose.model('Kitten', kittySchema);

// const employeeSchema = new mongoose.Schema({
//   name: String,
//   salary: Number,
//   language: String,
//   city: String,
//   isManager: Boolean
// });

const passwordSchema = new mongoose.Schema({
  url: String,
  user: String,
  pass: String,
});


export const Password = mongoose.model('Password', passwordSchema, 'passwords');


// const playlistSchema = new mongoose.Schema({
//   title: String,
//   desc: String,
//   cover: String
// });

// export const Playlist = mongoose.model('Playlist', playlistSchema);