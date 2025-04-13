# Transformation API

The Transformation API allows you to manage and execute AI model transformations on memory data.

## Endpoints

### Create Transformation

```http
POST /api/v1/transform
```

Creates a new transformation job.

#### Request Body

```json
{
  "memoryId": "string",
  "model": {
    "name": "string",
    "version": "string"
  },
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 100,
    "topP": 0.9,
    "frequencyPenalty": 0.0,
    "presencePenalty": 0.0
  },
  "metadata": {
    "purpose": "string",
    "tags": ["string"]
  }
}
```

#### Response

```json
{
  "id": "string",
  "memoryId": "string",
  "status": "queued|processing|completed|failed",
  "model": {
    "name": "string",
    "version": "string"
  },
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 100,
    "topP": 0.9,
    "frequencyPenalty": 0.0,
    "presencePenalty": 0.0
  },
  "metadata": {
    "purpose": "string",
    "tags": ["string"]
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### List Transformations

```http
GET /api/v1/transform
```

Retrieves a list of transformations.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | integer | Page number for pagination |
| limit | integer | Number of items per page |
| status | string | Filter by status |
| memoryId | string | Filter by memory ID |
| model | string | Filter by model name |

#### Response

```json
{
  "items": [
    {
      "id": "string",
      "memoryId": "string",
      "status": "queued|processing|completed|failed",
      "model": {
        "name": "string",
        "version": "string"
      },
      "metadata": {
        "purpose": "string",
        "tags": ["string"]
      },
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "total": 0,
  "page": 0,
  "limit": 0
}
```

### Get Transformation

```http
GET /api/v1/transform/{id}
```

Retrieves a specific transformation by ID.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Transformation ID |

#### Response

```json
{
  "id": "string",
  "memoryId": "string",
  "status": "queued|processing|completed|failed",
  "model": {
    "name": "string",
    "version": "string"
  },
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 100,
    "topP": 0.9,
    "frequencyPenalty": 0.0,
    "presencePenalty": 0.0
  },
  "metadata": {
    "purpose": "string",
    "tags": ["string"]
  },
  "result": {
    "output": "string",
    "metrics": {
      "processingTime": 0,
      "tokenCount": 0,
      "cost": 0
    }
  },
  "createdAt": "string",
  "updatedAt": "string",
  "completedAt": "string"
}
```

### Cancel Transformation

```http
POST /api/v1/transform/{id}/cancel
```

Cancels a queued or processing transformation.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Transformation ID |

#### Response

```json
{
  "success": true,
  "message": "Transformation cancelled successfully"
}
```

### Get Transformation Result

```http
GET /api/v1/transform/{id}/result
```

Retrieves the result of a completed transformation.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Transformation ID |

#### Response

```json
{
  "output": "string",
  "metrics": {
    "processingTime": 0,
    "tokenCount": 0,
    "cost": 0
  },
  "metadata": {
    "model": {
      "name": "string",
      "version": "string"
    },
    "parameters": {
      "temperature": 0.7,
      "maxTokens": 100,
      "topP": 0.9
    }
  },
  "createdAt": "string",
  "completedAt": "string"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| TRANSFORM_NOT_FOUND | The specified transformation was not found |
| INVALID_MEMORY_ID | The specified memory ID is invalid |
| INVALID_MODEL | The specified model is not supported |
| INVALID_PARAMETERS | Invalid transformation parameters |
| TRANSFORM_FAILED | Transformation processing failed |
| TRANSFORM_CANCELLED | Transformation was cancelled |
| RESULT_NOT_READY | Transformation result is not yet available |

## Rate Limits

- Create Transformation: 5 requests per minute
- List Transformations: 30 requests per minute
- Get Transformation: 60 requests per minute
- Cancel Transformation: 10 requests per minute
- Get Transformation Result: 60 requests per minute 