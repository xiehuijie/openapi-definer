# Basic API Example

This example demonstrates a simple Pet Store API definition.

```typescript
import { defineApi } from 'openapi-definer';

const petStoreApi = defineApi({
  name: 'pet-store',
  version: '1.0.0',
  description: 'A sample Pet Store API',
});

console.log('API defined:', petStoreApi);
```

## Running the Example

```bash
# Install dependencies
pnpm install

# Run the example
tsx examples/basic/index.ts
```

## Expected Output

```
API defined: {
  name: 'pet-store',
  version: '1.0.0',
  description: 'A sample Pet Store API'
}
```
