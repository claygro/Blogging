import jwt from "jsonwebtoken";
import "dotenv/config";
import UserModel from "../model/user.model.js";
async function loginMiddleware(req, res, next) {
  try {
    const auth_token = req.cookies.auth_token;

    if (!auth_token) {
      return res.status(401).json({ message: "No auth token provided" });
    }

    const data = jwt.verify(auth_token, process.env.JWT_SECRET_TOKEN);

    const user = await UserModel.findById(data.userid);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = data; // Or just: req.user = verifyToken.userid
    next();
  } catch (err) {
    console.error("Error in  middleware:", err);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
export default loginMiddleware;
