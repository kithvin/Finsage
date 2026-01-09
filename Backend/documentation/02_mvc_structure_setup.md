# Step 2: MVC Structure Setup

## Objective
Implement a clean Model-View-Controller (MVC) architecture to organize the codebase for scalability and maintainability.

## Date
2026-01-09

## Actions Taken

### 1. Created Directory Structure

Established the following folder hierarchy under `src/`:

```
src/
├── controllers/    # Business logic and request handlers
├── routes/         # API endpoint definitions
├── models/         # Data models and schemas
├── middleware/     # Custom middleware (to be added)
├── utils/          # Utility functions (to be added)
└── config/         # Configuration files (to be added)
```

**Rationale:**
- **Separation of Concerns**: Each directory has a specific responsibility
- **Scalability**: Easy to add new features without cluttering
- **Maintainability**: Developers can quickly locate relevant code
- **Industry Standard**: Follows Express.js best practices

### 2. Implemented Health Check Feature

#### Controller: `src/controllers/healthController.js`

Created the first controller with a `getHealth` function:

```javascript
const getHealth = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
};

module.exports = { getHealth };
```

**Purpose:**
- Provides a simple endpoint to verify server is running
- Returns server status and current timestamp
- Useful for monitoring and health checks in production

#### Routes: `src/routes/healthRoutes.js`

Mapped the health check endpoint:

```javascript
const express = require('express');
const router = express.Router();
const healthController = require('../controllers/healthController');

router.get('/', healthController.getHealth);

module.exports = router;
```

**Design Pattern:**
- Uses Express Router for modular route handling
- Separates routing logic from business logic
- Makes routes testable and reusable

### 3. Route Aggregation

#### Main Router: `src/routes/index.js`

Created a central router to aggregate all module routes:

```javascript
const express = require('express');
const router = express.Router();
const healthRoutes = require('./healthRoutes');

router.use('/health', healthRoutes);

module.exports = router;
```

**Benefits:**
- Single entry point for all API routes
- Easy to add new route modules
- Maintains clean URL structure: `/api/v1/health`

### 4. Initial Entry Point (Later Refactored)

Created `src/index.js` with:
- Express app initialization
- Middleware setup (CORS, JSON parsing)
- Route mounting
- Basic error handling
- Server startup logic

**Note:** This file was later renamed to `server.js` in Step 3.

### 5. Model Placeholder

Created `src/models/userModel.js` as a placeholder:

```javascript
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

module.exports = User;
```

**Purpose:**
- Demonstrates model structure
- Ready for database integration (Mongoose/Sequelize)
- Shows data entity representation

## MVC Pattern Explanation

### Model
- Represents data structure
- Handles database operations
- Contains business rules for data

### View
- In REST APIs, JSON responses serve as "views"
- No traditional HTML templates needed
- Data formatted in controllers

### Controller
- Receives requests from routes
- Processes business logic
- Interacts with models
- Sends responses

## Technical Decisions

1. **Express Router**: Modular routing for better organization
2. **Controller Pattern**: Separates route definitions from business logic
3. **Named Exports**: Makes it clear what each module provides
4. **Placeholder Models**: Prepared for future database integration

## File Structure After This Step

```
Backend/
├── src/
│   ├── controllers/
│   │   └── healthController.js
│   ├── routes/
│   │   ├── index.js
│   │   └── healthRoutes.js
│   ├── models/
│   │   └── userModel.js
│   └── index.js (later renamed to server.js)
├── node_modules/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## API Endpoint Created

- **GET** `/api/v1/health` - Health check endpoint
  - Returns: `{ status: 'success', message: 'Server is healthy', timestamp: '...' }`
  - Status Code: 200

## Outcome
✅ Established a solid MVC foundation:
- Clear separation of concerns
- Modular and scalable architecture
- First working API endpoint
- Ready for feature expansion

## Next Step
Proceed to [Refactoring and Middleware](./03_refactoring_and_middleware.md)
