// Import required modules
import express from "express"; // Import Express framework
import { Register, login, isAuth, logout } from "../controllers/userController.js"; // Controller functions for user operations
import authUser from "../middleware/authUser.js"; // Middleware to authenticate user

// Create a new Express Router instance
const userRouter = express.Router();

// Register a new user
// POST /api/user/register
// This route allows new users to register by providing necessary details.
userRouter.post("/register", Register);

// Login a user
// POST /api/user/login
// This route allows existing users to log in by providing valid credentials.
userRouter.post("/login", login);

// Check if user is authenticated (protected route)
// GET /api/user/is-auth
// This route checks if the user is authenticated. It is protected by the authUser middleware.
userRouter.get("/is-auth", authUser, isAuth);

// Logout user (protected route)
// GET /api/user/logout
// This route logs out the authenticated user. It is also protected by the authUser middleware.
userRouter.get("/logout", authUser, logout);

// Export the router to use in the main server file
export default userRouter;
