# Step 10: MongoDB Integration and Data Models

## Objective
Connect the backend to MongoDB Atlas using Mongoose and implement data models for users, income, assets, liabilities, and credit cards.

## Date
2026-01-09

## Actions Taken

### 1. Installed Mongoose
```bash
npm install mongoose
```
Mongoose provides a straight-forward, schema-based solution to model application data.

### 2. Implemented Data Models

Created five independent Mongoose models in `src/models/`:

#### User Model (`userModel.js`)
- **Fields**: `fullname` (String), `email` (String, unique), `password` (String, hidden by default).
- **Features**: Timestamps enabled.

#### Income Model (`incomeModel.js`)
- **Fields**: `incomeSource` (String), `amount` (Number), `frequency` (String: Weekly, Monthly, etc.).

#### Asset Model (`assetModel.js`)
- **Fields**: `assetName` (String), `assetType` (String), `currentValue` (Number).

#### Liability Model (`liabilityModel.js`)
- **Fields**: `liabilityName` (String), `type` (String), `amount` (Number), `interestRate` (Number), `paymentDueDate` (Date).

#### Card Model (`cardModel.js`)
- **Fields**: `cardName` (String), `creditLimit` (Number), `currentBalance` (Number), `apr` (Number), `paymentDueDate` (Date).

### 3. Updated Configuration
Re-created `src/config/index.js` to include `mongodbUri` from environment variables.

### 4. Database Connection Logic
Updated `src/server.js` to:
- Import Mongoose.
- Connect to MongoDB Atlas using the URI from config.
- Only start the Express server after a successful database connection.
- Handle connection errors and exit gracefully.

### 5. Environment Variables
Added `MONGODB_URI` placeholder to the `.env` file.

## Outcome
✅ The backend is now integrated with MongoDB Atlas.
✅ Five core data models are implemented with appropriate data types and validations.
✅ The server startup process is now dependent on a successful database connection, ensuring data integrity from the start.

## Next Steps
1. Implement CRUD controllers for the new models.
2. Add request validation for each model.
3. Implement user authentication (JWT).
