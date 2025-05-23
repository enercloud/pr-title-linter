# PR Title Linter

A GitHub Action that lints pull request titles using commitlint.

## Usage

Create a workflow file (e.g., `.github/workflows/pull-request-title-linter.yml`):

```yaml
name: PR Title Linter

on:
  pull_request:
    types: [opened, edited, reopened, synchronize]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: enercloud/pull-request-title-linterer@v0.1.0
        with:
          config: '@commitlint/config-conventional'  # Optional, defaults to conventional config
```

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `config` | Path to commitlint config file | No | `@commitlint/config-conventional` |

## Outputs

| Output | Description |
|--------|-------------|
| `valid` | Whether the PR title is valid |

## License

MIT 