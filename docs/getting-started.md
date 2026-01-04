# Getting Started

## Installation

```bash
npm install openapi-definer
# or
pnpm add openapi-definer
# or
yarn add openapi-definer
```

## Quick Start

### Define an API

```typescript
import { defineApi } from 'openapi-definer';

const api = defineApi({
  name: 'my-api',
  version: '1.0.0',
  description: 'My awesome API',
});
```

### Using the CLI

```bash
# Initialize a new project
openapi-definer init

# Generate SDK
openapi-definer generate --input api.ts --output ./sdk

# Validate API definition
openapi-definer validate api.ts
```

## Next Steps

- Learn about [API Definition](./api-definition.md)
- Explore [CLI Commands](./cli-commands.md)
- Check out [Examples](../examples/)
