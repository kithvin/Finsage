# Step 1: Create Documentation Directory

A directory named `documentation` was created in the project root. This directory will store markdown files documenting each step taken during the development process.

# Step 2: Initialize Project

The project was initialized with a `package.json` file, specifying the project name, version, and dependencies. Scripts for starting the server (`start`, `dev`) were added.

# Step 3: Set Up Server

A basic Express server was created in `Server.js` to handle incoming requests and responses. The server listens on a specified port and includes middleware for JSON parsing. A default route was added to confirm the server is running.

# Step 4: Configure Environment Variables

An `.env` file was added to store sensitive information such as the server port, database connection string, and JWT secret.

# Step 5: Placeholder for User Operations

Files `userController.js` and `userRoute.js` were created as placeholders for user-related operations and routes. These files are currently empty.