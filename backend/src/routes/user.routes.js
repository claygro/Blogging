import { Router } from "express";
import UserController from "../controller/user.controller.js";
import loginMiddlware from "../middleware/login.middleware.js";
import { storage } from "../controller/user.controller.js";
import multer from "multer";

const router = Router();
const upload = multer({ storage: storage });
const userController = new UserController();
router.post("/signup", userController.signup);
router.get("/getBlog", loginMiddlware, userController.getBlog);
router.post(
  "/postBlog",
  loginMiddlware,
  upload.single("image"),
  userController.addBlog
);
router.delete("/logout", userController.logout);
router.post("/login", userController.login);
router.get("/profile", loginMiddlware, userController.profile);
router.delete("/delete/:id", userController.deleteBlog);
router.get("/currentuser", loginMiddlware, userController.currentuser);
router.post("/comment", loginMiddlware, userController.comment);
router.get("/getComment/:id", loginMiddlware, userController.getComment);
router.delete("/deleteComment/:id", userController.deleteComment);
router.get("/search", userController.search);
export default router;
