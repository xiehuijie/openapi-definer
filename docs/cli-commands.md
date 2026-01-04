# CLI Commands

## openapi-definer init

Initialize a new API definition project.

```bash
openapi-definer init
```

This command creates a new project structure with sample API definitions.

## openapi-definer generate

Generate server or client SDK from API definition.

```bash
openapi-definer generate --input api.ts --output ./sdk
```

### Options

- `--input` - Path to the API definition file
- `--output` - Output directory for generated SDK
- `--type` - SDK type: `server` or `client` (default: both)

## openapi-definer validate

Validate an API definition file.

```bash
openapi-definer validate api.ts
```

This command checks if the API definition is valid and reports any errors.

## openapi-definer help

Display help information.

```bash
openapi-definer help
```

## openapi-definer version

Display version information.

```bash
openapi-definer version
```
