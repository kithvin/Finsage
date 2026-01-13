# Finsage API Documentation

This document provides a reference for all available REST API endpoints in the Finsage Backend.

## Base URL
`http://localhost:5000/api/v1`

## General Response Format
All successful responses follow this structure:
```json
{
  "status": "success",
  "results": 1, // Optional: for list responses
  "data": {
    "item": { ... }
  }
}
```

Error responses follow this structure:
```json
{
  "status": "error",
  "message": "Error message description",
  "stack": "..." // Only in development mode
}
```

---

## 1. Health Check
Check if the server is running and healthy.

### GET `/health`
- **Description**: Returns server status and current timestamp.
- **Access**: Public
- **Response**:
  ```json
  {
    "status": "success",
    "message": "Server is healthy",
    "timestamp": "2026-01-11T07:00:00.000Z"
  }
  ```

---

## 2. Users
Manage user accounts.

### GET `/users`
- **Description**: Retrieve all users.
- **Access**: Public
- **Response**: List of user objects.

### POST `/users`
- **Description**: Create a new user.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "fullname": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }
  ```
- **Response**: The created user object.

### GET `/users/:id`
- **Description**: Retrieve a specific user by ID.
- **Access**: Public

### PATCH `/users/:id`
- **Description**: Update user details.
- **Access**: Public
- **Request Body**: Any user field (`fullname`, `email`).

### DELETE `/users/:id`
- **Description**: Delete a user.
- **Access**: Public

---

## 3. Incomes
Track income sources.

### GET `/incomes`
- **Description**: Retrieve all income records.
- **Access**: Public

### POST `/incomes`
- **Description**: Create a new income record.
- **Access**: Public
- **Request Body**:
  ```json
  {
    "incomeSource": "Salary",
    "amount": 5000,
    "frequency": "Monthly" // Enum: Weekly, Bi-weekly, Monthly, Yearly, One-time
  }
  ```

### GET `/incomes/:id`
- **Description**: Retrieve a specific income record.

### PATCH `/incomes/:id`
- **Description**: Update an income record.

### DELETE `/incomes/:id`
- **Description**: Delete an income record.

---

## 4. Assets
Manage assets.

### GET `/assets`
- **Description**: Retrieve all asset records.

### POST `/assets`
- **Description**: Create a new asset record.
- **Request Body**:
  ```json
  {
    "assetName": "House",
    "assetType": "Real Estate",
    "currentValue": 350000
  }
  ```

### GET `/assets/:id`
- **Description**: Retrieve a specific asset.

### PATCH `/assets/:id`
- **Description**: Update an asset.

### DELETE `/assets/:id`
- **Description**: Delete an asset.

---

## 5. Liabilities
Track debts and liabilities.

### GET `/liabilities`
- **Description**: Retrieve all liability records.

### POST `/liabilities`
- **Description**: Create a new liability record.
- **Request Body**:
  ```json
  {
    "liabilityName": "Student Loan",
    "type": "Education",
    "amount": 25000,
    "interestRate": 4.5,
    "paymentDueDate": "2026-02-01"
  }
  ```

### GET `/liabilities/:id`
- **Description**: Retrieve a specific liability.

### PATCH `/liabilities/:id`
- **Description**: Update a liability.

### DELETE `/liabilities/:id`
- **Description**: Delete a liability.

---

## 6. Credit Cards
Manage credit card accounts.

### GET `/cards`
- **Description**: Retrieve all credit card records.

### POST `/cards`
- **Description**: Create a new credit card record.
- **Request Body**:
  ```json
  {
    "cardName": "Visa Platinum",
    "creditLimit": 10000,
    "currentBalance": 1200,
    "apr": 18.99,
    "paymentDueDate": "2026-01-25"
  }
  ```

### GET `/cards/:id`
- **Description**: Retrieve a specific card.

### PATCH `/cards/:id`
- **Description**: Update card details.

### DELETE `/cards/:id`
- **Description**: Delete a card record.

---

## 7. Recommendations
Get AI-powered financial recommendations.

### GET `/recommendations`
- **Description**: Generates personalized financial advice using Gemini AI based on the user's aggregated financial data (Incomes, Assets, Liabilities, Cards).
- **Access**: Public
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "recommendations": "Based on your financial profile, here are some recommendations: ..."
    }
  }
  ```
