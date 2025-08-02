import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../model/user.model.js";
import "dotenv/config";
import BlogModel from "../model/blog.model.js";
import crypto from "crypto";
import path from "path";
import multer from "multer";
import CommentModel from "../model/comment.models.js";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, bytes) {
      const fn = bytes.toString("hex") + path.extname(file.originalname);
      cb(null, fn);
    });
  },
});
class UserController {
  //signin user.
  async signup(req, res) {
    const { username, name, email, password, blogs } = req.body;
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          // Store hash in your password DB.
          const userExist = await UserModel.findOne({ email: email });

          if (userExist) {
            res.status(409).json({ message: "Email is already taken" });
          } else {
            const response = await UserModel.create({
              username,
              name,
              email,
              password: hash,
              blogs,
            });
            let auth_token = jwt.sign(
              { email: email, userid: response._id },
              process.env.JWT_SECRET_TOKEN
            );
            res.cookie("auth_token", auth_token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production", // Use true for HTTPS
              sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // "None" for cross-origin
              maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiry time (30 days)
            });

            await res.status(200).json(response);
          }
        });
      });
    } catch (err) {
      console.log(`error in signin user ${err}`);
    }
  }
  //retriving blog.
  async getBlog(req, res) {
    try {
      const allBlog = await BlogModel.find({}).populate("username"); // blog authors (array)

      res.status(200).json(allBlog);
    } catch (err) {
      console.log(`error in getting blog ${err}`);
    }
  }
  //posting blog.
  async addBlog(req, res) {
    try {
      const { email } = req.user;
      const { title, blogs } = req.body;
      // console.log(req.body);
      const user = await UserModel.findOne({ email: email }).populate("blogs");
      console.log(user);
      if (!req.file) {
        res.status(404).json({ message: "File is not uploaded." });
      }
      // Image URL (to be saved in DB or sent back)
      const imageUrl = `/uploads/${req.file.filename}`;
      console.log(imageUrl);
      const blog = await BlogModel.create({
        username: user._id,
        blogs: blogs,
        title: title,
        image: imageUrl,
      });
      // console.log(blog);
      user.blogs.push(blog._id);
      await user.save();
      res.status(200).json(
        {
          message: "Image uploaded successfully",
          imageUrl,
          id: blog._id,
        },
        blog
      );
    } catch (err) {
      console.log(`error in posting blog ${err}`);
    }
  }
  //logout.
  async logout(req, res) {
    try {
      await res.cookie("auth_token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use true for HTTPS
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // "None" for cross-origin
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiry time (30 days)
      });
      res.status(200).json({ message: "successfully logout" });
    } catch (error) {
      console.log(`error in logout ${error}`);
    }
  }
  //login
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const userEmail = await UserModel.findOne({ email: email });

      const userPassword = bcrypt.compare(
        password,
        userEmail.password,
        function (err, result) {
          if (result) {
            res.status(200).json({ message: "welcome" });
          } else {
            res.status(404).json({ message: "something went wrong" });
          }
        }
      );
      let auth_token = jwt.sign(
        { email: email, userid: userEmail._id },
        process.env.JWT_SECRET_TOKEN
      );

      res.cookie("auth_token", auth_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Use true for HTTPS
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // "None" for cross-origin
        maxAge: 30 * 24 * 60 * 60 * 1000, // Cookie expiry time (30 days)
      });
    } catch (error) {
      res.status(404).json({ message: "Something went wrong" });
      console.log(`error in login ${error}`);
    }
  }
  async profile(req, res) {
    try {
      const userProfile = await UserModel.findById(req.user.userid).populate(
        "blogs"
      );
      if (!userProfile) {
        res.status(404).json({ message: "your is not found" });
      } else {
        res.status(200).json(userProfile);
      }
    } catch (error) {
      console.log(`Error in profile ${error}`);
    }
  }
  //delete.
  async deleteBlog(req, res) {
    const { id } = req.params;
    try {
      const response = await BlogModel.findByIdAndDelete(id);
      if (!response) {
        res.status(404).json({ message: "blogs not found" });
      } else {
        res.status(200).json({ message: "Successfully delete" });
      }
    } catch (err) {
      console.log(`error in delete ${err}`);
    }
  }
  // current user name.
  async currentuser(req, res) {
    const userToken = req.cookies.auth_token;
    try {
      if (!userToken) {
        res.status(404).json({ message: "you are not logged in" });
      } else {
        res.status(200).json(userToken);
      }
    } catch (error) {
      console.log(`error in current user ${error}`);
    }
  }
  //comment.
  async comment(req, res) {
    const { comment, blogId } = req.body;
    const { email } = req.user;

    try {
      const user = await UserModel.findOne({ email });
      const blog = await BlogModel.findById(blogId);

      const response = await CommentModel.create({
        comment,
        username: user._id, // wrapped in array (your logic)
        blogs: blog._id, // wrapped in array (your logic)
      });

      user.comment.push(response._id);
      blog.comment.push(response._id);

      await user.save();
      await blog.save();

      res.status(200).json(response);
    } catch (err) {
      console.log(`Error in comment ${err}`);
      res.status(404).json({ message: "failed to comment", err });
    }
  }
  async getComment(req, res) {
    const { id } = req.params;

    try {
      const blog = await BlogModel.findById(id).populate({
        path: "comment", // FIX: should match field name in Blog schema
        populate: {
          path: "username", // this should be in Comment schema
          select: "username", // only get the username
        },
      });
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json(blog);
    } catch (err) {
      console.log(`Error in getComment ${err}`);
    }
  }
  //delete comment.
  async deleteComment(req, res) {
    const { id } = req.params;
    try {
      const response = await CommentModel.findByIdAndDelete(id);
      if (response) res.status(200).json(response);
      else res.status(404).json({ message: "Comment not found" });
    } catch (err) {
      res.status(404).json({ message: "Cannot able to delete comment." });
      console.log(`Error occured in deletecomment ${err}`);
    }
  }
  //searching blog.
  async search(req, res) {
    const { title } = req.query;
    try {
      const response = await BlogModel.find({
        title: { $regex: title, $options: "i" },
      }).populate("username");
      res.status(200).json(response);
    } catch (error) {
      res.status(404).json({ message: `Error in searching ${error}` });
      console.log(`Error in searching ${error}`);
    }
  }
}
export { storage };
export default UserController;
