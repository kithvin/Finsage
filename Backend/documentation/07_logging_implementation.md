# Step 7: Logging Implementation

## Objective
Implement HTTP request logging to monitor incoming requests, track response times, and aid in debugging and performance monitoring.

## Date
2026-01-09

## Actions Taken

### 1. Installed Morgan Package

```bash
npm install morgan
```

**Morgan** is a popular HTTP request logger middleware for Node.js applications.

**Version Installed:** Latest compatible version
**Package Type:** Production dependency

### 2. Updated Server Configuration

Modified `src/server.js` to integrate Morgan logging:

```javascript
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');  // ← Added
const config = require('./config');
// ... other imports

const app = express();

// Middleware
app.use(cors());

// Development logging
if (config.env === 'development') {
  app.use(morgan('dev'));  // ← Added conditional logging
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ... rest of server setup
```

### 3. Morgan Format: 'dev'

Chose the **'dev'** format for development logging:

**Output Format:**
```
:method :url :status :response-time ms - :res[content-length]
```

**Example Output:**
```
GET /api/v1/health 200 2.543 ms - 78
POST /api/v1/users 201 45.123 ms - 156
GET /api/v1/users/123 404 1.234 ms - 42
```

**Color Coding:**
- 🟢 Green: Success (2xx status codes)
- 🔵 Cyan: Informational (3xx status codes)
- 🟡 Yellow: Client errors (4xx status codes)
- 🔴 Red: Server errors (5xx status codes)

### 4. Environment-Based Logging

**Development Mode:**
- Morgan enabled with 'dev' format
- Concise, colored output
- Shows method, URL, status, and response time
- Helpful for debugging

**Production Mode:**
- Morgan disabled (can be configured differently)
- Prevents console clutter
- Can be replaced with file-based logging or external services

### 5. Conditional Logic

```javascript
if (config.env === 'development') {
  app.use(morgan('dev'));
}
```

**Benefits:**
- Only logs in development
- Keeps production logs clean
- Easy to switch to different formats per environment
- Can add production logging later (e.g., 'combined' format to files)

## Morgan Format Options

While we use 'dev', Morgan supports multiple formats:

1. **dev**: Concise colored output for development
2. **combined**: Apache combined log format (production)
3. **common**: Apache common log format
4. **short**: Shorter than default
5. **tiny**: Minimal output
6. **custom**: Define your own format

## Future Enhancements

### Production Logging
```javascript
if (config.env === 'production') {
  const fs = require('fs');
  const path = require('path');
  
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, '../logs/access.log'),
    { flags: 'a' }
  );
  
  app.use(morgan('combined', { stream: accessLogStream }));
}
```

### Custom Format
```javascript
morgan(':method :url :status :res[content-length] - :response-time ms :date[clf]')
```

### Skip Certain Routes
```javascript
app.use(morgan('dev', {
  skip: (req, res) => req.url === '/health'
}));
```

## Technical Decisions

1. **'dev' Format**: Best for development with color coding and concise output
2. **Conditional Logging**: Only in development to avoid production overhead
3. **Early Middleware**: Placed early in middleware stack to log all requests
4. **No File Logging Yet**: Console logging sufficient for current development stage

## Benefits Achieved

### For Development:
- **Request Visibility**: See all incoming requests instantly
- **Performance Monitoring**: Response times for each request
- **Debugging Aid**: Quickly identify slow or failing endpoints
- **Status Tracking**: Color-coded status codes for quick scanning

### For Production (Future):
- **Audit Trail**: Log all requests to files
- **Analytics**: Parse logs for usage patterns
- **Monitoring**: Integrate with log aggregation services
- **Compliance**: Maintain request logs for security

## Example Log Output

```
Server is running on port 5000 in development mode
GET / 200 1.234 ms - 45
GET /api/v1/health 200 0.543 ms - 78
POST /api/v1/users 404 2.123 ms - 56
GET /api/v1/unknown 404 0.789 ms - 42
```

## File Structure After This Step

```
Backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js (updated with morgan)
├── node_modules/
│   └── morgan/ (new)
├── package.json (updated dependencies)
└── ...
```

## Dependencies Updated

**package.json:**
```json
{
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "morgan": "^1.10.0"  // ← Added
  }
}
```

## Outcome
✅ HTTP request logging implemented:
- Morgan middleware integrated
- Development-only logging configured
- Color-coded console output
- Request/response time tracking
- Ready for production logging enhancements
- Improved debugging capabilities

## Next Step
Proceed to [Current State](./08_current_state.md)
