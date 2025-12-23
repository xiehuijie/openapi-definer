# openapi-definder

A factory definition program that allows you to define things related to the API using intuitive code and generate a non-intrusive SDK that can be highly reused by both the server and the client.

[![CI](https://github.com/xiehuijie/openapi-definder/actions/workflows/ci.yml/badge.svg)](https://github.com/xiehuijie/openapi-definder/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/openapi-definder.svg)](https://www.npmjs.com/package/openapi-definder)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Type-Safe**: Built with TypeScript for complete type safety
- 🚀 **Intuitive API**: Define your OpenAPI specs using clean, readable code
- 📦 **SDK Generation**: Generate both server and client SDKs from definitions
- 🔧 **CLI Support**: Powerful command-line tools for development workflow
- 🧪 **Well Tested**: Comprehensive test coverage
- 📚 **Great Documentation**: Detailed docs and examples

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
  name: 'pet-store',
  version: '1.0.0',
  description: 'A sample Pet Store API',
});
```

### Use the CLI

```bash
# Initialize a new project
openapi-definder init

# Generate SDK
openapi-definder generate --input api.ts --output ./sdk

# Validate API definition
openapi-definder validate api.ts
```

## Documentation

- [Getting Started](docs/getting-started.md)
- [API Definition](docs/api-definition.md)
- [CLI Commands](docs/cli-commands.md)
- [Examples](examples/)

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

### Project Structure

```
openapi-definder/
├── src/              # Source code
│   ├── index.ts      # Main entry point
│   ├── cli.ts        # CLI entry point
│   ├── types.ts      # TypeScript types
│   └── utils.ts      # Utility functions
├── tests/            # Test files
├── docs/             # Documentation
├── examples/         # Example projects
├── playground/       # Development playground
├── dist/             # Build output
└── .github/          # GitHub workflows
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
- 🐛 [Issue Tracker](https://github.com/xiehuijie/openapi-definder/issues)
- 💬 [Discussions](https://github.com/xiehuijie/openapi-definder/discussions)

