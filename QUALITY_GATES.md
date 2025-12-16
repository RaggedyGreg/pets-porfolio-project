# Quality Gates

This project enforces quality standards through automated checks before commits and pushes.

## Pre-Commit Checks

Before each commit, the following checks run automatically:

1. **Linting** - Ensures code follows style guidelines
   - Command: `npm run lint`
   - Blocks commit if errors found

2. **Tests** - Runs all tests with coverage
   - Command: `npm test`
   - Blocks commit if any test fails

3. **Coverage Thresholds** - Enforces minimum code coverage
   - **Branches**: 50%
   - **Functions**: 40%
   - **Lines**: 50%
   - **Statements**: 50%
   - Blocks commit if thresholds not met

## Pre-Push Checks

Before pushing to remote, additional checks run:

1. **Build Verification** - Ensures production build succeeds
   - Command: `npm run build`
   - Blocks push if build fails

## Manual Verification

Run all quality checks manually:

```bash
npm run verify
```

This runs: lint → tests → build

## Bypassing Checks (Not Recommended)

In rare cases where you need to bypass checks:

```bash
# Skip pre-commit hook
git commit --no-verify -m "message"

# Skip pre-push hook
git push --no-verify
```

⚠️ **Warning**: Bypassing checks may break CI/CD pipelines and should only be done in exceptional circumstances.

## Configuration

### Husky Hooks
- `.husky/pre-commit` - Runs before git commit
- `.husky/pre-push` - Runs before git push

### Coverage Thresholds
Defined in `package.json` under `jest.coverageThreshold`:

```json
{
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 50,
        "functions": 40,
        "lines": 50,
        "statements": 50
      }
    }
  }
}
```

**Note**: Current thresholds are set at **50%** to match the existing coverage level (50.28%). The target is to gradually increase this to **80%** as test coverage improves. Key areas needing coverage:
- `src/hooks` - Currently at 1.19%
- `src/contexts` - Currently at 0%
- `src/views/Home/Home.tsx` - Currently at 63.75%
- `src/views/Detail/Detail.tsx` - Currently at 54.54%

## Troubleshooting

### Hook not running
```bash
# Reinstall husky
npm run prepare
```

### Permission denied
```bash
# Make hooks executable
chmod +x .husky/pre-commit
chmod +x .husky/pre-push
```

### Tests timing out
Increase Jest timeout or fix slow tests.

### Coverage below threshold
Write more tests or improve existing test coverage.
