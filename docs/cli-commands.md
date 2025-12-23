# CLI Commands

## openapi-definder init

Initialize a new API definition project.

```bash
openapi-definder init
```

This command creates a new project structure with sample API definitions.

## openapi-definder generate

Generate server or client SDK from API definition.

```bash
openapi-definder generate --input api.ts --output ./sdk
```

### Options

- `--input` - Path to the API definition file
- `--output` - Output directory for generated SDK
- `--type` - SDK type: `server` or `client` (default: both)

## openapi-definder validate

Validate an API definition file.

```bash
openapi-definder validate api.ts
```

This command checks if the API definition is valid and reports any errors.

## openapi-definder help

Display help information.

```bash
openapi-definder help
```

## openapi-definder version

Display version information.

```bash
openapi-definder version
```
