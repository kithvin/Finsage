# Step 17: Automated Endpoint Testing Script

## Objective
Provide a quick and automated way to verify that all major API endpoints are functional and returning correct status codes.

## Date
2026-01-11

## Actions Taken

### 1. Created `test-all-endpoint.sh`
Developed a bash script that uses `curl` to:
- Check server health.
- Create test records (POST) for Users, Incomes, Assets, Liabilities, and Cards.
- Retrieve all records (GET) for each module.
- Validate responses based on HTTP status codes (200, 201).

### 2. Implementation Details
- **Dynamic Data**: Uses timestamps for email addresses to avoid "duplicate email" errors during repeated tests.
- **Formatted Output**: Provides clear [SUCCESS] or [FAILED] indicators for each test case.
- **Base URL Configuration**: Easily adjustable for different environments.

## Outcome
✅ Developers can verify the entire API surface in seconds.
✅ Regression testing is simplified.
✅ Provides a working example of request payloads for each endpoint.

## Usage
```bash
chmod +x test-all-endpoint.sh
./test-all-endpoint.sh
```
*(Note: Ensure the server is running before executing the script)*
