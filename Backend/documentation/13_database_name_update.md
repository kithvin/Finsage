# Step 13: MongoDB Database Name Update

## Objective
Update the MongoDB connection configuration to use a specific database name (`FinsageDB`) instead of the default `test` database.

## Date
2026-01-11

## Actions Taken

### 1. Updated Configuration Logic
Modified `src/config/config.js` (formerly `index.js`) to include a `mongodbDbName` property.
- Added `MONGODB_DB_NAME` environment variable support.
- Set default value to `FinsageDB`.

### 2. Modified Connection String Options
Updated `src/server.js` to pass the `dbName` option to `mongoose.connect`.
```javascript
mongoose.connect(config.mongodbUri, { dbName: config.mongodbDbName })
```
This ensures that the application always connects to the correct database regardless of the URI string content.

### 3. Environment Variable Template
Updated `.env.example` to include the `MONGODB_DB_NAME` variable for future setups.

## Outcome
✅ The application now connects to the `FinsageDB` database.
✅ Database naming is now configurable via environment variables.
✅ Connection logic is more robust by explicitly defining the target database.
