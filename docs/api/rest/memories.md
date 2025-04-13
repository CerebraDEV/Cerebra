# Memory Processing API

The Memory Processing API allows you to manage and process memory data for AI training.

## Endpoints

### Create Memory

```http
POST /api/v1/memories
```

Creates a new memory entry.

#### Request Body

```json
{
  "title": "string",
  "description": "string",
  "data": "string",
  "type": "text|image|audio|video",
  "tags": ["string"],
  "metadata": {
    "source": "string",
    "timestamp": "string",
    "location": "string"
  }
}
```

#### Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "data": "string",
  "type": "text|image|audio|video",
  "tags": ["string"],
  "metadata": {
    "source": "string",
    "timestamp": "string",
    "location": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### List Memories

```http
GET /api/v1/memories
```

Retrieves a list of memories.

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | integer | Page number for pagination |
| limit | integer | Number of items per page |
| type | string | Filter by memory type |
| tags | string[] | Filter by tags |

#### Response

```json
{
  "items": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "type": "text|image|audio|video",
      "tags": ["string"],
      "createdAt": "string",
      "updatedAt": "string"
    }
  ],
  "total": 0,
  "page": 0,
  "limit": 0
}
```

### Get Memory

```http
GET /api/v1/memories/{id}
```

Retrieves a specific memory by ID.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Memory ID |

#### Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "data": "string",
  "type": "text|image|audio|video",
  "tags": ["string"],
  "metadata": {
    "source": "string",
    "timestamp": "string",
    "location": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Update Memory

```http
PUT /api/v1/memories/{id}
```

Updates a specific memory.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Memory ID |

#### Request Body

```json
{
  "title": "string",
  "description": "string",
  "data": "string",
  "type": "text|image|audio|video",
  "tags": ["string"],
  "metadata": {
    "source": "string",
    "timestamp": "string",
    "location": "string"
  }
}
```

#### Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "data": "string",
  "type": "text|image|audio|video",
  "tags": ["string"],
  "metadata": {
    "source": "string",
    "timestamp": "string",
    "location": "string"
  },
  "createdAt": "string",
  "updatedAt": "string"
}
```

### Delete Memory

```http
DELETE /api/v1/memories/{id}
```

Deletes a specific memory.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Memory ID |

#### Response

```json
{
  "success": true,
  "message": "Memory deleted successfully"
}
```

### Process Memory

```http
POST /api/v1/memories/{id}/process
```

Processes a memory for AI training.

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| id | string | Memory ID |

#### Request Body

```json
{
  "model": "string",
  "parameters": {
    "temperature": 0.7,
    "maxTokens": 100
  }
}
```

#### Response

```json
{
  "id": "string",
  "status": "processing|completed|failed",
  "result": {
    "output": "string",
    "metrics": {
      "processingTime": 0,
      "tokenCount": 0
    }
  },
  "createdAt": "string",
  "completedAt": "string"
}
```

## Error Codes

| Code | Description |
|------|-------------|
| MEMORY_NOT_FOUND | The specified memory was not found |
| INVALID_MEMORY_TYPE | The memory type is not supported |
| PROCESSING_FAILED | Memory processing failed |
| INVALID_PARAMETERS | Invalid processing parameters |

## Rate Limits

- Create Memory: 10 requests per minute
- List Memories: 30 requests per minute
- Get Memory: 60 requests per minute
- Update Memory: 10 requests per minute
- Delete Memory: 10 requests per minute
- Process Memory: 5 requests per minute 