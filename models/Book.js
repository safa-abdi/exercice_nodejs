const mongoose = require("mongoose");
//const mongooseIdValidator = require('mongoose-id-validator');

const bookSchema = mongoose.Schema({
  title: { type: String, required: true },
  publYear: { type: Date, required: true },
  description: { type: String, required: true },
  nbPages: { type: Number, required: false },
  language: { type: String, required: true },
  isAvailable: { type: Boolean, required: true },
  genres: [{ type: String, required: false }],
  keywords: [{ type: String, required: false }],
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Author', 
    required: true,
    validate: {
      validator: async function (authorId) {
        // Check if the author has written other books
        const bookCount = await mongoose.models.Book.countDocuments({ author: authorId });
        return bookCount > 0;
      },
      message: 'The author must have written other books before creating a new one.',
    },
  },
});
//bookSchema.plugin(mongooseIdValidator);

// Add a static method 'findByAuthor'
bookSchema.statics.findByAuthor = function (author) {
  return this.find({ author: author });
};

module.exports = mongoose.model("Book", bookSchema);