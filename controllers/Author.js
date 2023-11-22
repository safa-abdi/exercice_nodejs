const Author=require("../models/Author")

const fetchAuthor = (req, res) => {
  Author.find()
    .then((authors) =>
      res.status(200).json({
        model: authors,
        message: "success",
      })
    )
    .catch((error) => {
      res.status(400).json({
        error: error.message,
        message: "problème d'extraction",
      });
    });
};

const getauthorById = (req, res) => {
  Author.findOne({ _id: req.params.id })
    .then((author) => {
      if (!author) {
        res.status(404).json({
          message: "Auteur non trouvé",
        });
        return;
      }

      res.status(200).json({
        model: author,
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

const addauthor = (req, res) => {
  const newAuthor = new Author(req.body); // Change the variable name to newAuthor
  newAuthor
    .save()
    .then(() =>
      res.status(201).json({
        model: newAuthor,
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
 module.exports={
    fetchAuthor:fetchAuthor,
    addauthor:addauthor,
    getauthorById:getauthorById,

 }