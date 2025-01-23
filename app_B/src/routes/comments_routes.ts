import express from 'express';
const router=express.Router();

import commentsController from "../controllers/comments_controller"
import { authMiddleware } from '../controllers/auth_controller';

router.get("/", commentsController.getAll.bind(commentsController)); //read

router.get("/:id", commentsController.getById.bind(commentsController)); //read

router.get("/", commentsController.getPostId.bind(commentsController)); //read

router.post("/", authMiddleware, commentsController.create.bind(commentsController)); //create

router.put("/:id", authMiddleware, (req, res) =>{
    commentsController.updateById(req,res);
}); // update

router.delete("/:id", authMiddleware, commentsController.deleteById.bind(commentsController)); //delete

export default router;
// module.exports=router;