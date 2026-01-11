#!/bin/bash

# Finsage API Endpoint Test Script
# This script tests all major endpoints of the Finsage Backend API.

BASE_URL="http://localhost:5000/api/v1"

echo "--------------------------------------------------"
echo "Starting Finsage API Endpoint Tests"
echo "Base URL: $BASE_URL"
echo "--------------------------------------------------"

# Function to print test results
print_result() {
    if [ $1 -eq 200 ] || [ $1 -eq 201 ] || [ $1 -eq 204 ]; then
        echo -e "[SUCCESS] $2 - Status: $1"
    else
        echo -e "[FAILED]  $2 - Status: $1"
    fi
}

# 1. Health Check
echo -e "\n1. Testing Health Check..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/health")
print_result $STATUS "GET /health"

# 2. Users
echo -e "\n2. Testing Users..."
# POST Create User
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/users" \
     -H "Content-Type: application/json" \
     -d '{"fullname": "Test User", "email": "test'$(date +%s)'@example.com", "password": "password123"}')
print_result $STATUS "POST /users"

# GET All Users
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/users")
print_result $STATUS "GET /users"

# 3. Incomes
echo -e "\n3. Testing Incomes..."
# POST Create Income
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/incomes" \
     -H "Content-Type: application/json" \
     -d '{"incomeSource": "Freelancing", "amount": 1500, "frequency": "One-time"}')
print_result $STATUS "POST /incomes"

# GET All Incomes
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/incomes")
print_result $STATUS "GET /incomes"

# 4. Assets
echo -e "\n4. Testing Assets..."
# POST Create Asset
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/assets" \
     -H "Content-Type: application/json" \
     -d '{"assetName": "Savings Account", "assetType": "Cash", "currentValue": 12000}')
print_result $STATUS "POST /assets"

# GET All Assets
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/assets")
print_result $STATUS "GET /assets"

# 5. Liabilities
echo -e "\n5. Testing Liabilities..."
# POST Create Liability
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/liabilities" \
     -H "Content-Type: application/json" \
     -d '{"liabilityName": "Car Loan", "type": "Auto", "amount": 15000, "interestRate": 5.5, "paymentDueDate": "2026-02-15"}')
print_result $STATUS "POST /liabilities"

# GET All Liabilities
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/liabilities")
print_result $STATUS "GET /liabilities"

# 6. Credit Cards
echo -e "\n6. Testing Credit Cards..."
# POST Create Card
STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$BASE_URL/cards" \
     -H "Content-Type: application/json" \
     -d '{"cardName": "Travel Rewards", "creditLimit": 5000, "currentBalance": 450, "apr": 22.5, "paymentDueDate": "2026-01-28"}')
print_result $STATUS "POST /cards"

# GET All Cards
STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/cards")
print_result $STATUS "GET /cards"

echo -e "\n--------------------------------------------------"
echo "Tests Completed"
echo "--------------------------------------------------"
