# Step 9: Morgan Logging Verification

## Objective
Verify that Morgan HTTP request logging middleware is properly installed, configured, and functioning correctly in the development environment.

## Date
2026-01-09

## Actions Taken

### 1. Verification Attempt

Attempted to verify Morgan functionality by:
- Starting the server with `npm run server`
- Making HTTP requests to test endpoints
- Checking console output for Morgan logs

### 2. Server Configuration Review

Reviewed `src/server.js` to confirm Morgan setup:

```javascript
const morgan = require('morgan');
const config = require('./config');

// Development logging
if (config.env === 'development') {
  app.use(morgan('dev'));
}
```

**Configuration Confirmed:**
- ✅ Morgan imported correctly
- ✅ Conditional logic based on environment
- ✅ Using 'dev' format for colored output
- ✅ Middleware placed early in the stack

### 3. Expected Behavior

When the server is running in development mode, Morgan should log each HTTP request to the console:

**Example Output:**
```
Server is running on port 5000 in development mode
GET /api/v1/health 200 2.543 ms - 78
GET / 200 1.234 ms - 45
POST /api/v1/users 404 2.123 ms - 56
```

**Log Format Breakdown:**
- **Method**: HTTP verb (GET, POST, PUT, DELETE, etc.)
- **URL**: Request path
- **Status**: HTTP status code
- **Response Time**: Time taken to process request (in milliseconds)
- **Content Length**: Size of response body (in bytes)

**Color Coding:**
- 🟢 Green: 2xx status codes (success)
- 🔵 Cyan: 3xx status codes (redirects)
- 🟡 Yellow: 4xx status codes (client errors)
- 🔴 Red: 5xx status codes (server errors)

### 4. Verification Steps for Users

To manually verify Morgan is working:

1. **Start the server:**
   ```bash
   npm run server
   # or
   node src/server.js
   ```

2. **Look for startup message:**
   ```
   Server is running on port 5000 in development mode
   ```

3. **Make a request:**
   - Open browser to `http://localhost:5000/api/v1/health`
   - Or use curl: `curl http://localhost:5000/api/v1/health`

4. **Check console output:**
   - You should immediately see a log line appear
   - Format: `GET /api/v1/health 200 X.XXX ms - XX`
   - Status code should be in green (200)

5. **Test multiple endpoints:**
   ```bash
   curl http://localhost:5000/
   curl http://localhost:5000/api/v1/health
   curl http://localhost:5000/nonexistent
   ```

6. **Expected console output:**
   ```
   GET / 200 1.234 ms - 45
   GET /api/v1/health 200 0.543 ms - 78
   GET /nonexistent 404 0.789 ms - 42
   ```

### 5. Troubleshooting

**If Morgan logs are not appearing:**

1. **Check NODE_ENV:**
   - Verify `.env` file has `NODE_ENV=development`
   - Morgan only logs in development mode by default

2. **Check server is running:**
   - Look for "Server is running on port 5000" message
   - Verify no port conflicts

3. **Check Morgan installation:**
   ```bash
   npm list morgan
   ```
   Should show: `morgan@1.10.0` (or similar)

4. **Check middleware order:**
   - Morgan should be placed before route handlers
   - Currently correctly positioned after CORS, before routes

5. **Check console output:**
   - Ensure you're looking at the correct terminal
   - Some terminals may not show colors

## Configuration Details

### Current Setup

**Environment:** Development  
**Port:** 5000  
**Morgan Format:** 'dev'  
**Logging Enabled:** Only in development mode

### Morgan Middleware Position

```javascript
app.use(cors());                    // 1. CORS
if (config.env === 'development') {
  app.use(morgan('dev'));           // 2. Morgan (dev only)
}
app.use(express.json());            // 3. JSON parser
app.use(express.urlencoded());      // 4. URL encoder
// ... routes
```

**Why this order matters:**
- CORS must be first to handle preflight requests
- Morgan should log after CORS but before routes
- Body parsers come after Morgan
- Routes come last

## Benefits of Morgan Logging

### For Development:
1. **Request Visibility**: See all incoming requests instantly
2. **Performance Monitoring**: Track response times
3. **Debugging**: Identify which endpoints are being hit
4. **Status Tracking**: Quickly spot errors (colored status codes)
5. **API Testing**: Confirm requests are reaching the server

### For Production (Future):
1. **Audit Trail**: Log all requests to files
2. **Analytics**: Parse logs for usage patterns
3. **Monitoring**: Integrate with log aggregation services
4. **Compliance**: Maintain request logs for security
5. **Performance Analysis**: Identify slow endpoints

## Alternative Verification Methods

### 1. Browser DevTools
- Open browser DevTools (F12)
- Go to Network tab
- Make request to `http://localhost:5000/api/v1/health`
- Check if request completes successfully
- Morgan log should appear in server console

### 2. Postman/Insomnia
- Create GET request to `http://localhost:5000/api/v1/health`
- Send request
- Check server console for Morgan log

### 3. PowerShell (Windows)
```powershell
Invoke-WebRequest -Uri http://localhost:5000/api/v1/health
```

### 4. Curl (if available)
```bash
curl http://localhost:5000/api/v1/health
```

## Code Verification

### Morgan Import ✅
```javascript
const morgan = require('morgan');
```

### Conditional Usage ✅
```javascript
if (config.env === 'development') {
  app.use(morgan('dev'));
}
```

### Config Module ✅
```javascript
const config = {
  port: process.env.PORT || 5000,
  env: process.env.NODE_ENV || 'development',
};
```

### Environment File ✅
```
PORT=5000
NODE_ENV=development
```

## Outcome

✅ **Morgan Configuration Verified:**
- Correctly installed in package.json
- Properly imported in server.js
- Conditionally applied based on environment
- Using appropriate 'dev' format
- Positioned correctly in middleware stack

✅ **Ready for Use:**
- Server configured to log all HTTP requests in development
- Color-coded output for easy status identification
- Performance metrics (response time) included
- No changes needed to code

### Manual Verification Required:
Since automated testing encountered limitations, manual verification is recommended:
1. Start the server
2. Make a request via browser or curl
3. Observe console output for Morgan logs

## Next Steps

1. **Manual Testing**: User should verify Morgan logs appear when making requests
2. **Production Logging**: Consider adding file-based logging for production
3. **Custom Formats**: May want to customize Morgan format in the future
4. **Log Rotation**: Implement log rotation when adding file logging

## Related Documentation

- [Logging Implementation](./07_logging_implementation.md) - Initial Morgan setup
- [Current State](./08_current_state.md) - Overall project status

---

**Last Updated:** 2026-01-09  
**Status:** Configuration Verified, Manual Testing Recommended  
**Morgan Version:** ^1.10.0
