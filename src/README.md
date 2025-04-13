# Source Code

This directory contains the main source code for the CEREBRA application.

## Directory Structure

- `app/` - Next.js app directory containing pages and API routes
- `components/` - Reusable React components
- `hooks/` - Custom React hooks
- `lib/` - Utility functions and shared logic
- `test/` - Test files and test utilities

## Development Guidelines

1. **Component Structure**
   - Place components in appropriate subdirectories
   - Use index.ts files for clean exports
   - Follow atomic design principles

2. **Code Style**
   - Use TypeScript for type safety
   - Follow ESLint and Prettier configurations
   - Write unit tests for components

3. **State Management**
   - Use React hooks for local state
   - Implement context for shared state
   - Follow immutability principles

4. **Performance**
   - Implement code splitting
   - Use React.memo for expensive components
   - Optimize images and assets

5. **Testing**
   - Write unit tests for components
   - Include integration tests
   - Test error scenarios 