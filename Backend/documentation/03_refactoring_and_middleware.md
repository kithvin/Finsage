# Step 3: Refactoring and Advanced Middleware

## Objective
Refactor the entry point for better clarity, add centralized configuration management, and implement robust error handling mechanisms.

## Date
2026-01-09

## Actions Taken

### 1. Renamed Entry Point: `index.js` → `server.js`

**Rationale:**
- `server.js` more clearly indicates the file's purpose
- Industry convention for Express applications
- Distinguishes from potential frontend `index.js` files

**Changes Made:**
- Renamed `src/index.js` to `src/server.js`
- Updated `package.json` scripts to reference `src/server.js`

```json
{
  "main": "src/server.js",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "server": "nodemon src/server.js"
  }
}
```

### 2. Centralized Configuration: `src/config/index.js`

Created a configuration module to manage all environment variables:

```javascript
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
  // Add more configuration variables here as needed (e.g., DB_URI, JWT_SECRET)
};

module.exports = config;
```

**Benefits:**
- **Single Source of Truth**: All config in one place
- **Type Safety**: Can add validation here
- **Easy Testing**: Mock config for tests
- **Scalability**: Easy to add database URLs, API keys, etc.

**User Update:** Default port changed from 3000 to 5000

### 3. Custom Error Handling Utilities

#### `src/utils/AppError.js` - Custom Error Class

```javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
```

**Features:**
- **Operational Flag**: Distinguishes expected errors from bugs
- **Status Codes**: Proper HTTP status code handling
- **Stack Traces**: Maintains error stack for debugging
- **Status Field**: 'fail' for 4xx, 'error' for 5xx

**Use Case:**
```javascript
throw new AppError('User not found', 404);
```

#### `src/utils/catchAsync.js` - Async Error Wrapper

```javascript
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
```

**Purpose:**
- Eliminates repetitive try-catch blocks in async controllers
- Automatically forwards errors to global error handler
- Cleaner, more readable controller code

**Usage Example:**
```javascript
const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.json({ status: 'success', data: user });
});
```

### 4. Global Error Handling Middleware

#### `src/middleware/errorMiddleware.js`

Implements environment-aware error responses:

```javascript
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (config.env === 'development') {
    sendErrorDev(err, res);
  } else {
    sendErrorProd(error, res);
  }
};
```

**Development Mode:**
- Full error details
- Stack traces
- Error object inspection
- Helpful for debugging

**Production Mode:**
- Clean, user-friendly messages
- No sensitive information leaked
- Generic messages for unexpected errors
- Detailed logging for developers

### 5. Updated Server Logic: `src/server.js`

Enhanced the main server file:

```javascript
const express = require('express');
const cors = require('cors');
const config = require('./config');
const routes = require('./routes');
const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Finsage API' });
});

// Routes
app.use('/api/v1', routes);

// Handle unhandled routes (404)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port} in ${config.env} mode`);
});
```

**New Features:**
- Centralized config usage
- 404 handler for undefined routes
- Global error handling
- Environment-aware logging

### 6. Cleanup

- Removed deprecated `src/index.js` file
- Updated all imports to use new structure
- Ensured no broken references

## Error Handling Flow

```
Request → Route → Controller
                     ↓
                  Error?
                     ↓
              next(error)
                     ↓
          Global Error Handler
                     ↓
         Development or Production?
                     ↓
    Detailed Response | Clean Response
```

## Technical Decisions

1. **Centralized Config**: Follows 12-factor app methodology
2. **Custom Error Class**: Provides consistent error structure
3. **Async Wrapper**: Reduces boilerplate code
4. **Environment-Aware Errors**: Security in production, detail in development
5. **404 Handler**: Catches all undefined routes

## File Structure After This Step

```
Backend/
├── src/
│   ├── config/
│   │   └── index.js
│   ├── controllers/
│   │   └── healthController.js
│   ├── middleware/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   └── userModel.js
│   ├── routes/
│   │   ├── index.js
│   │   └── healthRoutes.js
│   ├── utils/
│   │   ├── AppError.js
│   │   └── catchAsync.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Outcome
✅ Professional error handling system:
- Centralized configuration management
- Custom error classes for consistency
- Environment-aware error responses
- Async error handling without try-catch
- 404 handling for undefined routes
- Production-ready error management

## Next Step
Proceed to [Code Documentation](./05_code_documentation.md)
