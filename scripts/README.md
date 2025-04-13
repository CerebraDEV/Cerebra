# Scripts

This directory contains various scripts for development, deployment, and maintenance of the CEREBRA platform.

## Directory Structure

- `setup/` - Project setup and initialization scripts
  - `setup.ps1` - Windows setup script
  - `setup.sh` - Unix setup script
  - `setup.bat` - Windows batch setup script

- `deploy/` - Deployment scripts
  - `deploy.ps1` - Main deployment script
  - `verify.ps1` - Contract verification script
  - `migrate.ps1` - Database migration script

- `test/` - Testing scripts
  - `test.ps1` - Main test runner
  - `coverage.ps1` - Coverage report generator
  - `e2e.ps1` - End-to-end test runner

## Usage

### Setup Scripts

```bash
# Windows PowerShell
./scripts/setup/setup.ps1

# Unix/Linux
./scripts/setup/setup.sh

# Windows Command Prompt
scripts\setup\setup.bat
```

### Deployment Scripts

```bash
# Deploy to production
./scripts/deploy/deploy.ps1 --env production

# Deploy to staging
./scripts/deploy/deploy.ps1 --env staging

# Verify contracts
./scripts/deploy/verify.ps1
```

### Test Scripts

```bash
# Run all tests
./scripts/test/test.ps1

# Generate coverage report
./scripts/test/coverage.ps1

# Run E2E tests
./scripts/test/e2e.ps1
```

## Script Development Guidelines

1. **Naming Conventions**
   - Use descriptive names
   - Include file extension
   - Follow platform conventions

2. **Documentation**
   - Include usage instructions
   - Document parameters
   - Provide examples

3. **Error Handling**
   - Include proper error messages
   - Handle edge cases
   - Provide exit codes

4. **Security**
   - Validate input
   - Handle sensitive data
   - Follow security best practices 