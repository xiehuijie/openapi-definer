# Getting Started

## Installation

```bash
npm install openapi-definder
# or
pnpm add openapi-definder
# or
yarn add openapi-definder
```

## Quick Start

### Define an API

```typescript
import { defineApi } from 'openapi-definder';

const api = defineApi({
  name: 'my-api',
  version: '1.0.0',
  description: 'My awesome API',
});
```

### Using the CLI

```bash
# Initialize a new project
openapi-definder init

# Generate SDK
openapi-definder generate --input api.ts --output ./sdk

# Validate API definition
openapi-definder validate api.ts
```

## Next Steps

- Learn about [API Definition](./api-definition.md)
- Explore [CLI Commands](./cli-commands.md)
- Check out [Examples](../examples/)
