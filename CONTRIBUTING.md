# Contributing to OpenAPI Definder

Thank you for your interest in contributing to OpenAPI Definder! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 10.0.0

### Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/openapi-definder.git
   cd openapi-definder
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage
```

### Linting and Formatting

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Type Checking

```bash
pnpm typecheck
```

### Building

```bash
# Build the project
pnpm build

# Build and watch for changes
pnpm dev
```

### Playground

Use the playground to test your changes:

```bash
pnpm playground
```

## Code Style

- Use TypeScript for all code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write tests for new features
- Keep functions small and focused

## Commit Guidelines

We follow conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build process or auxiliary tool changes

Example:
```
feat: add endpoint validation function
```

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation in the `docs/` folder
3. Add tests for new features
4. Ensure all tests pass
5. Ensure code is properly formatted and linted
6. Update the CHANGELOG.md if applicable
7. Create a Pull Request with a clear description

## Testing

- Write unit tests for new features
- Maintain or improve code coverage
- Test edge cases
- Ensure tests are fast and reliable

## Documentation

- Update documentation for API changes
- Add examples for new features
- Keep documentation clear and concise
- Use proper markdown formatting

## Questions?

If you have questions, feel free to:
- Open an issue
- Start a discussion
- Reach out to maintainers

Thank you for contributing! 🎉
