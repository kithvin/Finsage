# Step 1: Project Initialization

## Objective
Initialize a new Node.js project and install necessary dependencies for a REST API backend.

## Actions Taken

1.  **Initialized Node.js Project**:
    -   Ran `npm init -y` to create a default `package.json` file.

2.  **Installed Dependencies**:
    -   **Production Dependencies**:
        -   `express`: Web framework for Node.js.
        -   `cors`: Middleware to enable Cross-Origin Resource Sharing.
        -   `dotenv`: Module to load environment variables from a `.env` file.
    -   **Development Dependencies**:
        -   `nodemon`: Utility to automatically restart the server on file changes.

3.  **Created Configuration Files**:
    -   **`.gitignore`**: Added entries to exclude `node_modules`, `.env`, and other build artifacts from version control.
    -   **`README.md`**: Created a basic README with setup and running instructions.
    -   **`.env`**: Created an environment variable file with `PORT` and `NODE_ENV`.

4.  **Initial Package.json Configuration**:
    -   Updated `scripts` to include:
        -   `"start"`: For running the server in production.
        -   `"dev"`: For running the server in development with `nodemon`.

## Outcome
A basic Node.js project structure was established with all core dependencies installed and configuration files in place.
