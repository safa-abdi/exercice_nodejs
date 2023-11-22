const Book=require("../models/Book")

const fetchBooks = (req, res) => {
  Book.find()
    .populate("author")
    .then((books) =>
      res.status(200).json({
        model: books,
        message: "success",
      })
    )
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "probleme d'extraction",
      });
    });
};

const getBookById = (req, res) => {
  Book.findOne({ _id: req.params.id })
    .then((book) => {
      if (!book) {
        res.status(404).json({
          message: "Livre non trouvé",
        });
        return;
      }

      res.status(200).json({
        model: book,
        message: "Objet trouvé",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Problème",
      });
    });
};

const addBook = (req, res) => {
  const book = new Book(req.body);
  book
    .save()
    .then(() =>
      res.status(201).json({
        model: book,
        message: "Created!",
      })
    )
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "Données invalides",
      });
    });
};
const addBook1 = async (req, res) => {
  try {
    const newBook = new Book(req.body);

    // Validate the book using Mongoose
    await newBook.validate();

    // Check if the author has written other books
    const bookCount = await Book.countDocuments({ author: newBook.author });
    if (bookCount === 0) {
      return res.status(400).json({ message: 'The author must have written other books before creating a new one.' });
    }

    // Save the book if validations pass
    const savedBook = await newBook.save();

    res.status(201).json({
      model: savedBook,
      message: 'Book created successfully.',
    });
  } catch (error) {
    // Handle validation errors or other errors
    res.status(400).json({
      error: error.message,
      message: 'Invalid data or other error occurred.',
    });
  }
};
// Add the new route for finding books by author
const getBooksByAuthor = (req, res) => {
  const authorId = req.params.id;
  Book.findByAuthor(authorId)
    .then((books) => {
      res.status(200).json({
        model: books,
        message: "Books found for the author",
      });
    })
    .catch((error) => {
      res.status(500).json({
        error: error.message,
        message: "Internal Server Error",
      });
    });
};


//modifier
const UpdateBook=(req, res) => {
    Book.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((book) => {
        if (!book) {
          res.status(404).json({
            message: "Book not found ",
          });
          return;
        }
        res.status(200).json({
          model: book,
          message: "Book updated",
        });
      })
      .catch((error) =>
        res.status(400).json({
          error: error.message,
          message: "book not correct",
        })
      );
  }


const DeleteBook=(req, res) => {
    Book.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: "Book  deleted" }))
      .catch((error) => {
        res.status(400).json({
          error: error.message,
          message: "Id book not correct ",
        });
      });
  }

 module.exports={
    getBooksByAuthor:getBooksByAuthor,
    fetchBooks:fetchBooks,
    addBook:addBook,
    getBookById:getBookById,
    UpdateBook:UpdateBook,
    DeleteBook:DeleteBook,
    addBook1:addBook1
 }