const express=require("express")
const router =express.Router()
const userController = require("../controllers/user")
const { check } = require("express-validator");
    
  router.post("/login",userController.login)

  router.post(
      "/signup",
      [
          check("email").isEmail().withMessage("Email invalide"),
          check("password").isLength({ min: 6 }).withMessage("Le mot de passe doit contenir au moins 6 caractères"),
          // Add more validation checks as needed
      ],
      userController.signup
  );
  const validateSignup = require('../middlewares/validateSignup'); // Importez le middleware
  
  router.post('/signup1', validateSignup, userController.signup);
 module.exports=router

