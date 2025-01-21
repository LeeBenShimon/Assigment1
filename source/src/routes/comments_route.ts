import express from 'express';
const router=express.Router();

import commentsController from "../controllers/comments_controller"


router.post("/",commentsController.createComments); //create

router.get("/", commentsController.getComments); //read

router.get("/:id", commentsController.getCommentsById); //read

router.get("/", commentsController.getCommentsByPostId); //read

router.delete("/:id",commentsController.deleteCommentsById); //delete

router.put("/:id", (req, res) =>{
    commentsController.updateCommentsById(req,res);
}); // update

export default router;
module.exports=router;