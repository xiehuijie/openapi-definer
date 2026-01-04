# API Definition

## Basic Structure

An API definition is the core of OpenAPI Definer. It describes your API in a type-safe, intuitive way.

```typescript
import { defineApi } from 'openapi-definer';

const api = defineApi({
  name: 'pet-store',
  version: '1.0.0',
  description: 'A sample Pet Store API',
});
```

## API Definition Properties

### name (required)

The name of your API.

```typescript
name: 'my-api'
```

### version (required)

The version of your API (semantic versioning recommended).

```typescript
version: '1.0.0'
```

### description (optional)

A description of your API.

```typescript
description: 'My awesome API for managing resources'
```

## Types

OpenAPI Definer provides several TypeScript types to help you define your API:

### HttpMethod

Valid HTTP methods: `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS`

### EndpointDefinition

Defines an API endpoint:

```typescript
interface EndpointDefinition {
  method: HttpMethod;
  path: string;
  description?: string;
  tags?: string[];
}
```

### SchemaDefinition

Defines a data schema:

```typescript
interface SchemaDefinition {
  type: string;
  properties?: Record<string, unknown>;
  required?: string[];
}
```

## Utilities

### formatPath

Ensures a path starts with `/`:

```typescript
import { formatPath } from 'openapi-definer';

formatPath('api/users'); // '/api/users'
formatPath('/api/users'); // '/api/users'
```

### isValidHttpMethod

Validates an HTTP method:

```typescript
import { isValidHttpMethod } from 'openapi-definer';

isValidHttpMethod('GET'); // true
isValidHttpMethod('INVALID'); // false
```
