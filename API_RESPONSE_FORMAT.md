# API Response Format

Tất cả các API hiện đã được chuẩn hóa theo một format duy nhất.

## Response Structure

### ✅ Success Response (2xx)

```json
{
  "statusCode": 200,
  "success": true,
  "data": { /* actual data */ },
  "message": "Operation successful"
}
```

### ❌ Error Response (4xx, 5xx)

```json
{
  "statusCode": 400,
  "success": false,
  "data": null,
  "message": "Error description"
}
```

## Common Status Codes

| Code | Meaning | Use Case |
|------|---------|----------|
| 200 | OK | GET, successful operations |
| 201 | Created | POST, resource created |
| 400 | Bad Request | Validation failed, missing fields |
| 401 | Unauthorized | Authentication failed |
| 403 | Forbidden | Permission denied |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Unexpected errors |

## API Response Handlers

Located in: `utils/apiResponse.js`

### Usage Examples

```javascript
// Success Response
return successResponse(res, data, "Message");
// Status: 200

// Created Response
return createdResponse(res, data, "Message");
// Status: 201

// Bad Request
return badRequest(res, "Error message");
// Status: 400

// Not Found
return notFound(res, "Error message");
// Status: 404

// Error Response
return errorResponse(res, 500, "Error message");
// Status: 500
```

## Example API Calls

### Create Order
```javascript
POST /api/orders
{
  "customerId": "123",
  "products": [...],
  "payment": { "amount": 1000 }
}

// Response:
{
  "statusCode": 201,
  "success": true,
  "data": {
    "orderId": "abc",
    "orderCode": "ORD-2024-001",
    "subtotal": 1000,
    "vatAmount": 100,
    "totalAmount": 1100,
    "depositAmount": 1000,
    "remainingAmount": 100,
    "payment": {...}
  },
  "message": "Order created successfully"
}
```

### Get Order
```javascript
GET /api/orders/:id

// Response:
{
  "statusCode": 200,
  "success": true,
  "data": {
    "order": {...},
    "details": [...],
    "payment": {...}
  },
  "message": "Order fetched successfully"
}
```

### Error Example
```javascript
GET /api/orders/invalid-id

// Response:
{
  "statusCode": 404,
  "success": false,
  "data": null,
  "message": "Order not found"
}
```

## Updated Controllers

✅ All controllers now use consistent response format:
- orderController
- customerController
- productController
- paymentController
- orderDetailController
- userController
- productionTaskController
- materialImportController
- accessoryController
- warehouseController
- authController

## Frontend Integration

All responses follow the same structure, so you can create a unified response handler:

```javascript
// frontend/services/api.js
const handleResponse = (response) => {
  const { statusCode, success, data, message } = response;
  
  if (success) {
    return data; // Return data directly
  } else {
    throw new Error(message); // Handle error
  }
};

// Usage:
try {
  const data = await api.getOrder(id);
  const { order, details, payment } = data;
} catch (error) {
  console.error(error.message);
}
```
