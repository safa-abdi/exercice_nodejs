const express=require("express")
const router =express.Router()
const authorController=require("../controllers/Author")


router.get("/",authorController.fetchAuthor)
router.get("/:id",authorController.getauthorById)
router.post("/add",authorController.addauthor)

module.exports=router



