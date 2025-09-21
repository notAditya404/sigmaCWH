import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  quote: String,
  email: String
});

const Quote = mongoose.model('Quote', quoteSchema);

export default Quote;
