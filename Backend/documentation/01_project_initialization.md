# Step 1: Project Initialization

## Objective
Initialize a new Node.js project from scratch and install all necessary dependencies for building a production-ready REST API backend.

## Date
2026-01-09

## Actions Taken

### 1. Project Initialization
- Created the `Backend` directory at `c:\Users\Keshada\Desktop\Finsage\Backend`
- Ran `npm init -y` to generate a default `package.json` file
- This created the foundation for dependency management and npm scripts

### 2. Dependency Installation

#### Production Dependencies
```bash
npm install express cors dotenv
```

- **`express` (^4.18.2)**: Minimal and flexible Node.js web application framework
  - Provides robust routing
  - HTTP utility methods and middleware
  - Industry standard for Node.js APIs

- **`cors` (^2.8.5)**: Cross-Origin Resource Sharing middleware
  - Enables API to be accessed from different domains
  - Essential for frontend-backend separation
  - Configurable for security

- **`dotenv` (^16.3.1)**: Environment variable management
  - Loads variables from `.env` file into `process.env`
  - Keeps sensitive configuration out of codebase
  - Different configs for dev/staging/production

#### Development Dependencies
```bash
npm install --save-dev nodemon
```

- **`nodemon` (^3.0.2)**: Development utility
  - Automatically restarts server on file changes
  - Improves development workflow
  - Watches for changes in `.js` files

### 3. Configuration Files Created

#### `.env` File
```
PORT=3000
NODE_ENV=development
```
- Stores environment-specific configuration
- Not committed to version control
- Default port set to 3000 (later changed to 5000)

#### `.gitignore` File
```
node_modules
.env
.DS_Store
coverage
dist
```
- Prevents sensitive and generated files from being committed
- Keeps repository clean
- Standard Node.js exclusions

#### `README.md`
- Created basic project documentation
- Includes setup instructions
- Lists available npm scripts
- Documents API endpoints

### 4. Package.json Scripts Configuration

```json
{
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "server": "nodemon src/server.js"
  }
}
```

- **`start`**: Production mode - runs server directly with Node
- **`dev`**: Development mode - uses nodemon for auto-restart
- **`server`**: Alias for development mode

### 5. Initial Directory Structure
```
Backend/
├── node_modules/        # Dependencies (auto-generated)
├── .env                 # Environment variables
├── .gitignore          # Git exclusions
├── package.json        # Project manifest
├── package-lock.json   # Dependency lock file
└── README.md           # Project documentation
```

## Technical Decisions

1. **Express.js Framework**: Chosen for its maturity, extensive middleware ecosystem, and community support
2. **Environment Variables**: Using dotenv for configuration management following 12-factor app principles
3. **Nodemon**: Essential for development productivity
4. **CORS**: Enabled from the start to support frontend integration

## Outcome
✅ A fully initialized Node.js project with:
- Proper dependency management
- Environment-based configuration
- Development and production scripts
- Version control setup
- Ready for MVC architecture implementation

## Next Step
Proceed to [MVC Structure Setup](./02_mvc_structure_setup.md)
