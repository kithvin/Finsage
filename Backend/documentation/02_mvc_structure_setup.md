# Step 2: MVC Structure Setup

## Objective
Implement a clean Model-View-Controller (MVC) architecture to organize the codebase.

## Actions Taken

1.  **Created Directory Structure**:
    -   `src/controllers/`: For request handling logic.
    -   `src/routes/`: For defining API endpoints.
    -   `src/models/`: For data models (placeholders created).
    -   `src/`: Root directory for source code.

2.  **Implemented Health Check**:
    -   **Controller**: Created `src/controllers/healthController.js` with a `getHealth` function to return server status.
    -   **Route**: Created `src/routes/healthRoutes.js` to map the `/` path to the `getHealth` controller.

3.  **Route Aggregation**:
    -   Created `src/routes/index.js` to act as the main router, mounting `healthRoutes` under `/health`.

4.  **Initial Entry Point (Deprecated)**:
    -   Created `src/index.js` (initially) to set up the Express app, middleware, and connect the routes. *Note: This was later refactored.*

## Outcome
The application now follows a modular structure where concerns are separated into controllers, routes, and models, making it easier to scale and maintain.
