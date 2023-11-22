const express=require("express")
const router =express.Router()
const bookController=require("../controllers/book")
const auth=require("../middlewares/auth")


router.get("/",bookController.fetchBooks)
router.get("/:id",bookController.getBookById)
router.post("/",bookController.addBook)
//dupliqué
router.post("/addB",bookController.addBook1)


router.get("/author/:id",bookController.getBooksByAuthor)
router.patch("/:id",auth.loggedMiddleware,auth.isAdmin,bookController.UpdateBook)

router.delete("/:id",bookController.DeleteBook)



    module.exports=router



