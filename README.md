# openapi-definer

A factory definition program that allows you to define things related to the API using intuitive code and generate OpenAPI specifications with built-in documentation server and hot-reload support.

[![CI](https://github.com/xiehuijie/openapi-definer/actions/workflows/ci.yml/badge.svg)](https://github.com/xiehuijie/openapi-definer/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/openapi-definer.svg)](https://www.npmjs.com/package/openapi-definer)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Type-Safe**: Built with TypeScript for complete type safety
- 🚀 **Intuitive API**: Define your OpenAPI specs using clean, readable code
- 📦 **OpenAPI 3.1**: Generate OpenAPI 3.1.0 compliant specifications
- 📄 **Multiple Formats**: Export to JSON or YAML
- 📚 **Built-in Doc Server**: Serve interactive API documentation with Swagger UI, Scalar, or Redoc
- 🔥 **Hot Reload**: Auto-refresh documentation when code changes
- 🔧 **CLI Support**: Powerful command-line tools for development workflow
- 🧪 **Well Tested**: Comprehensive test coverage
- 📚 **Great Documentation**: Detailed docs and examples

## Installation

```bash
npm install openapi-definer zod
# or
pnpm add openapi-definer zod
# or
yarn add openapi-definer zod
```

## Quick Start

### 1. Define an API

```typescript
import { defineApp, defineEndpoint, Method } from 'openapi-definer';
import { z } from 'zod';

// Define your API
const app = defineApp({
  title: 'Pet Store API',
  version: '1.0.0',
  description: 'A sample Pet Store API',
});

// Define an endpoint
const getPetEndpoint = defineEndpoint({
  id: 'getPetById',
  path: '/pet/{petId}',
  method: Method.GET,
  summary: 'Find pet by ID',
  parameters: [
    {
      name: 'petId',
      in: 'path',
      description: 'ID of pet to return',
      required: true,
      schema: z.number().int(),
    },
  ],
  responses: {
    '200': {
      description: 'Successful operation',
      content: {
        'application/json': {
          schema: z.object({
            id: z.number(),
            name: z.string(),
            status: z.enum(['available', 'pending', 'sold']),
          }),
        },
      },
    },
    '404': {
      description: 'Pet not found',
    },
  },
});

// Add endpoint to app
app.addEndpoint(getPetEndpoint);

export { app };
```

### 2. Generate OpenAPI Specification

```typescript
import { createGenerator } from 'openapi-definer';
import { app } from './api';

const generator = createGenerator();

// Generate JSON
const json = generator.toJSON(app, true);
console.log(json);

// Generate YAML
const yaml = generator.toYAML(app);
console.log(yaml);
```

### 3. Serve Interactive Documentation

```typescript
import { serveDoc } from 'openapi-definer';
import { app } from './api';

// Start documentation server
serveDoc(app, {
  port: 3000,
  ui: 'scalar', // 'swagger', 'scalar', or 'redoc'
  open: true, // Open browser automatically
});
```

### 4. Use the CLI

```bash
# Initialize a new project
openapi-definer init

# Export OpenAPI spec
openapi-definer export api.ts -o openapi.json
openapi-definer export api.ts -f yaml -o openapi.yaml

# Serve documentation (with hot reload)
openapi-definer serve api.ts --watch --ui scalar

# Validate API definition
openapi-definer validate api.ts
```

## CLI Commands

### `init`

Initialize a new API definition project with example files.

```bash
openapi-definer init [options]

Options:
  -d, --dir <directory>  Target directory (default: ".")
```

### `export`

Export OpenAPI specification from your API definition.

```bash
openapi-definer export <file> [options]

Arguments:
  file                    API definition file

Options:
  -o, --output <file>     Output file path
  -f, --format <format>   Output format: json or yaml (default: "json")
  -p, --pretty            Pretty print JSON output
```

### `serve`

Start an interactive documentation server.

```bash
openapi-definer serve <file> [options]

Arguments:
  file                    API definition file

Options:
  -p, --port <port>       Server port (default: "3000")
  -h, --host <host>       Server host (default: "localhost")
  --ui <ui>               Documentation UI: swagger, scalar, or redoc (default: "scalar")
  --no-open               Do not open browser automatically
  --watch                 Enable hot reload
```

### `validate`

Validate your API definition for errors.

```bash
openapi-definer validate <file>

Arguments:
  file                    API definition file to validate
```

## Documentation UI Options

OpenAPI Definer supports three popular documentation UI frameworks:

- **Scalar** (default): Modern, fast, and beautiful API documentation
- **Swagger UI**: The most widely used OpenAPI documentation tool
- **Redoc**: Clean and responsive API documentation

## Advanced Features

### Hot Reload Development Server

```typescript
import { createDevServer } from 'openapi-definer';

const server = createDevServer(
  async () => {
    // Dynamically load your API definition
    const { app } = await import('./api.ts');
    return app;
  },
  {
    port: 3000,
    ui: 'scalar',
    watchPath: './src',
    hotReload: true,
  },
);

await server.start();
```

### Internationalization (i18n)

OpenAPI Definer supports internationalization through the `createTextDefiner` utility:

```typescript
import { defineApp, createTextDefiner } from 'openapi-definer';

// Create a text definer for Chinese and English
const t = createTextDefiner(['zh', 'en'] as const, 'zh');

const app = defineApp({
  title: t({
    zh: '宠物商店 API',
    en: 'Pet Store API',
  }),
  version: '1.0.0',
  description: t({
    zh: '一个示例宠物商店 API',
    en: 'A sample Pet Store API',
  }),
});

// Generate Chinese version
const generatorZh = createGenerator('zh');
const specZh = generatorZh.toJSON(app);

// Generate English version
const generatorEn = createGenerator('en');
const specEn = generatorEn.toJSON(app);
```

You can also use simple strings for single-language APIs:

```typescript
const app = defineApp({
  title: 'Pet Store API',
  version: '1.0.0',
  description: 'A sample Pet Store API',
});
```

### Custom Servers and Tags

```typescript
import { defineServer, defineTag } from 'openapi-definer';

const prodServer = defineServer({
  url: 'https://api.example.com',
  description: 'Production server',
});

const petTag = defineTag({
  name: 'pet',
  description: 'Everything about your Pets',
});

const app = defineApp({
  title: 'My API',
  version: '1.0.0',
  servers: [prodServer],
  tags: [petTag],
});
```

## Examples

Check out the [examples](examples/) directory for complete examples:

- [Basic Pet Store API](examples/basic/index.ts) - Complete Pet Store API with all CRUD operations

## Development

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 10.0.0

### Setup

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# Run linter
pnpm lint

# Format code
pnpm format

# Type check
pnpm typecheck

# Run playground
pnpm playground
```

## Project Structure

```
openapi-definer/
├── src/
│   ├── core/           # Core functionality
│   │   ├── app.ts          # App definition
│   │   ├── endpoint.ts     # Endpoint definition
│   │   ├── generator.ts    # OpenAPI spec generator
│   │   ├── docServer.ts    # Documentation server
│   │   ├── devServer.ts    # Development server with hot reload
│   │   └── ...
│   ├── types/          # Type definitions
│   ├── utils/          # Utility functions
│   ├── cli.ts          # CLI implementation
│   └── index.ts        # Main entry point
├── examples/           # Example projects
├── tests/              # Test files
└── dist/               # Built files
```

## API Reference

### Core Functions

- `defineApp(options)` - Define an API application
- `defineEndpoint(options)` - Define an API endpoint
- `defineTag(options)` - Define a tag for grouping endpoints
- `defineServer(options)` - Define a server
- `createGenerator(locale?)` - Create an OpenAPI spec generator
- `serveDoc(app, options)` - Start documentation server
- `createDevServer(appLoader, options)` - Create development server with hot reload

### Type Exports

- `AppDefinition` - API application class
- `Endpoint` - Endpoint class
- `Method` - HTTP methods enum
- `OpenAPIGenerator` - Generator class
- `DocServer` - Documentation server class
- `DevServer` - Development server class

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Zod](https://github.com/colinhacks/zod) for schema validation
- Inspired by [tRPC](https://trpc.io/) and [Hono](https://hono.dev/)
- Documentation powered by [Swagger UI](https://swagger.io/tools/swagger-ui/), [Scalar](https://scalar.com/), and [Redoc](https://redocly.com/)

## Links

- [GitHub Repository](https://github.com/xiehuijie/openapi-definer)
- [NPM Package](https://www.npmjs.com/package/openapi-definer)
- [Issues](https://github.com/xiehuijie/openapi-definer/issues)
- [Changelog](CHANGELOG.md)
  ├── src/ # Source code
  │ ├── index.ts # Main entry point
  │ ├── cli.ts # CLI entry point
  │ ├── types.ts # TypeScript types
  │ └── utils.ts # Utility functions
  ├── tests/ # Test files
  ├── docs/ # Documentation
  ├── examples/ # Example projects
  ├── playground/ # Development playground
  ├── dist/ # Build output
  └── .github/ # GitHub workflows

```

## Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development mode with watch |
| `pnpm build` | Build the project |
| `pnpm test` | Run tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Run tests with coverage |
| `pnpm lint` | Lint code |
| `pnpm lint:fix` | Lint and fix code |
| `pnpm format` | Format code |
| `pnpm format:check` | Check code formatting |
| `pnpm typecheck` | Type check TypeScript |
| `pnpm playground` | Run playground |

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [V5.xie](https://github.com/xiehuijie)

## Support

- 📝 [Documentation](docs/)
- 🐛 [Issue Tracker](https://github.com/xiehuijie/openapi-definer/issues)
- 💬 [Discussions](https://github.com/xiehuijie/openapi-definer/discussions)

```
