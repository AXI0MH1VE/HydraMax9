# Contributing to HydraMax9

Thank you for your interest in contributing to AXIOM HIVE HydraMax9! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/AXI0MH1VE/HydraMax9/issues)
2. If not, create a new issue using the bug report template
3. Include:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Environment details (OS, browser, Node version)

### Suggesting Features

1. Check if the feature has already been suggested
2. Create a new issue using the feature request template
3. Clearly describe:
   - The problem you're trying to solve
   - Your proposed solution
   - Any alternatives you've considered
   - Additional context or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/AXI0MH1VE/HydraMax9.git
   cd HydraMax9
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards (see below)
   - Write/update tests
   - Update documentation

4. **Test your changes**
   ```bash
   npm run test
   npm run lint
   npm run typecheck
   npm run build
   ```

5. **Commit your changes**
   - Follow [Conventional Commits](https://www.conventionalcommits.org/)
   - Examples:
     ```
     feat: add neural graph optimization
     fix: resolve memory leak in performance monitor
     docs: update API documentation
     test: add tests for security module
     refactor: simplify dashboard component logic
     ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Use the PR template
   - Link related issues
   - Provide clear description of changes
   - Request review from maintainers

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Installation
```bash
npm install
cp .env.example .env
# Configure your .env file
npm run dev
```

### Project Structure
```
OneDrive/Desktop/HyHive/src/
├── components/       # React components
│   ├── views/       # Page-level components
│   └── ...          # Reusable components
├── services/        # API and service integrations
├── __tests__/       # Test files
├── types.ts         # TypeScript types
├── App.tsx          # Root component
└── index.tsx        # Entry point
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Enable strict mode
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Use type unions for discriminated unions

### React
- Use functional components with hooks
- Keep components focused and composable
- Use meaningful prop names
- Implement proper error boundaries
- Memoize expensive computations

### Styling
- Use TailwindCSS utility classes
- Follow the brutalist design system
- Maintain UV green accent color (#06af6e)
- Use consistent spacing and sizing

### Testing
- Write unit tests for utilities and services
- Write component tests for UI components
- Aim for >80% code coverage
- Test edge cases and error states
- Use meaningful test descriptions

### Code Style
- Follow ESLint and Prettier configurations
- Use 2 spaces for indentation
- Use semicolons
- Use double quotes for strings
- Max line length: 100 characters

## Testing Guidelines

### Running Tests
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Writing Tests
```typescript
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Documentation

- Update README.md for significant changes
- Add JSDoc comments for complex functions
- Update API documentation when adding endpoints
- Include examples in documentation

## Git Workflow

1. Always work on a feature branch
2. Keep commits atomic and focused
3. Write clear commit messages
4. Rebase on master before submitting PR
5. Squash commits if requested

## Review Process

1. Automated checks must pass (CI/CD)
2. Code review by at least one maintainer
3. All comments must be addressed
4. Approval required before merge

## Release Process

1. Version bump in package.json
2. Update CHANGELOG.md
3. Create release tag
4. Deploy to production

## Questions?

If you have questions:
- Check existing issues and discussions
- Create a new discussion
- Contact maintainers: devdollzai@gmail.com

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to HydraMax9! Your efforts help build a more deterministic and sovereign AI substrate.
