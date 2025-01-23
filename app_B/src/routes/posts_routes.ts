import express from "express";
const router = express.Router();
import { authMiddleware } from '../controllers/auth_controller';
import postsController from "../controllers/posts_controller";


router.get("/", postsController.getAll.bind(postsController));

router.get("/:id", (req, res) => {
    postsController.getById(req, res);
});

router.post("/", authMiddleware, postsController.create.bind(postsController));

router.put("/:id", authMiddleware, (req, res) => {
    postsController.updateById(req, res);
});

router.delete("/:id", authMiddleware, postsController.deleteById.bind(postsController)); //delete
  

export default router;
