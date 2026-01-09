# Step 3: Refactoring and Advanced Middleware

## Objective
Refactor the entry point for better clarity, add centralized configuration, and implement robust error handling.

## Actions Taken

1.  **Renamed Entry Point**:
    -   Switched the main entry file from `src/index.js` to `src/server.js`.
    -   Updated `package.json` to point to `src/server.js`.

2.  **Centralized Configuration**:
    -   Created `src/config/index.js` to manage environment variables (Port, Environment) in one place.
    -   *Update*: User manually updated the default port to `5000`.

3.  **Implemented Error Handling**:
    -   **`src/utils/AppError.js`**: Created a custom error class extending the native `Error` class to handle operational errors with status codes.
    -   **`src/utils/catchAsync.js`**: Created a higher-order function to wrap async controller methods, eliminating the need for repetitive `try-catch` blocks.
    -   **`src/middleware/errorMiddleware.js`**: Implemented a global error handling middleware that sends different error responses based on the environment (detailed stack traces in development, generic messages in production).

4.  **Server Logic Update (`src/server.js`)**:
    -   Imported and applied the new `config`.
    -   Applied the global error handler.
    -   Added a catch-all route handler for 404 errors (undefined routes).

5.  **Cleanup**:
    -   Removed the deprecated `src/index.js` file.

## Outcome
The application is now more robust with a dedicated server entry point, centralized configuration, and a professional error handling strategy. It is ready for further feature development.
