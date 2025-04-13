# API Documentation

Welcome to the CEREBRA API documentation. This documentation covers all APIs available in the CEREBRA platform.

## API Categories

### REST API

- [Authentication](/api/rest/auth.md)
- [NFT Operations](/api/rest/nft.md)
- [User Management](/api/rest/users.md)
- [Memory Processing](/api/rest/memories.md)
- [AI Transformations](/api/rest/transform.md)

### Smart Contracts

- [CerebraNFT](/api/contracts/CerebraNFT.md)
- [CerebraMarket](/api/contracts/CerebraMarket.md)
- [CerebraToken](/api/contracts/CerebraToken.md)

### GraphQL API

- [Schema](/api/graphql/schema.md)
- [Queries](/api/graphql/queries.md)
- [Mutations](/api/graphql/mutations.md)
- [Subscriptions](/api/graphql/subscriptions.md)

## Authentication

All API endpoints require authentication unless explicitly marked as public. We support the following authentication methods:

1. **JWT Tokens**
   ```http
   Authorization: Bearer <token>
   ```

2. **Web3 Wallet**
   - Sign message with wallet
   - Verify signature on server

## Rate Limiting

API requests are rate limited based on the following rules:

- 100 requests per 15 minutes for authenticated users
- 20 requests per 15 minutes for unauthenticated users

## Error Handling

All API endpoints follow a consistent error format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      // Additional error details
    }
  }
}
```

## Versioning

The API is versioned through the URL path:

```
https://api.cerebra.work/v1/...
```

## SDKs and Libraries

- [JavaScript SDK](/api/sdk/javascript.md)
- [Python SDK](/api/sdk/python.md)
- [Rust SDK](/api/sdk/rust.md)

## Contributing

See our [Contributing Guide](/docs/guides/contributing.md) for information on how to contribute to the API documentation. 