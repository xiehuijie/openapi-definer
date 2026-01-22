# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-01-04

### Added

- ✨ Initial release of OpenAPI Definer
- 🎯 Type-safe API definition using TypeScript and Zod
- 📦 OpenAPI 3.1.0 specification generation
- 📄 Export to JSON and YAML formats
- 📚 Built-in documentation server with three UI options:
  - Scalar (default)
  - Swagger UI
  - Redoc
- 🔥 Hot reload development server for automatic documentation updates
- 🔧 Complete CLI toolset:
  - `init` - Initialize new API projects
  - `export` - Export OpenAPI specifications
  - `serve` - Start documentation server with optional hot reload
  - `validate` - Validate API definitions
- 🌍 Internationalization (i18n) support for titles and descriptions
- 📝 Comprehensive API definition helpers:
  - `defineApp` - Define API applications
  - `defineEndpoint` - Define API endpoints
  - `defineTag` - Define endpoint tags
  - `defineServer` - Define API servers
  - `defineExternalDocs` - Define external documentation
  - `defineSecurity` - Define security schemes
- 🧪 Full test coverage with Vitest
- 📖 Complete documentation and usage guide
- 💡 Example Pet Store API implementation

### Features

#### Core Functionality

- Complete OpenAPI 3.1 specification support
- Zod schema to OpenAPI schema conversion
- Support for all HTTP methods (GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS, TRACE)
- Path parameters, query parameters, headers, and cookies support
- Request body and response definitions
- Multiple response status codes
- Tags and external documentation
- Server configurations
- Security schemes (API Key, HTTP, OAuth2, OpenID Connect)

#### Developer Experience

- Type-safe API definitions
- Intuitive and clean API
- Auto-completion support in IDEs
- Clear error messages
- Fast build times with tsup
- ESM and CJS module support

### Documentation

- README with quick start guide
- Usage guide with examples
- Complete API reference
- Pet Store example application
- Project summary and architecture

### Technical Details

- Built with TypeScript 5.9
- Uses Zod 4.2 for schema validation
- Commander 14.0 for CLI
- Node.js 18+ required
- Fully typed with complete type definitions

[0.1.0]: https://github.com/xiehuijie/openapi-definer/releases/tag/v0.1.0

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup
- TypeScript configuration
- Build system with tsup
- Testing framework with vitest
- Linting with ESLint
- Code formatting with Prettier
- CLI entry point structure
- Basic API definition interface
- Utility functions (formatPath, isValidHttpMethod)
- Comprehensive documentation
- Example projects
- Playground for development
- CI/CD workflows (GitHub Actions)
- Package publishing configuration

## [0.1.0] - 2025-12-23

### Added

- Initial release
- Project scaffolding and configuration
- Development environment setup
