import { Router } from "express";
import { TaskController } from "../controllers/TaskController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.use(authMiddleware);
router.get("/", TaskController.list);
router.post("/", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

export default router;
