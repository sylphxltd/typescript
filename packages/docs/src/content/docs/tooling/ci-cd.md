---
title: CI/CD & Containerization
sidebar: {}
---

# TypeScript CI/CD & Containerization

This section provides standard workflows and configurations for Continuous Integration, Continuous Deployment (CI/CD), and containerization (Docker) for TypeScript projects.

## 1.1. Release Process Note (IMPORTANT)

**Manual publishing to NPM or creating GitHub releases is strictly forbidden.** The release process, including version bumping, changelog generation, publishing to registries (NPM, Docker Hub), and creating GitHub Releases, is **fully automated** by the CI/CD workflow defined in `.github/workflows/ci-release.yml` (triggered by pushing version tags like `v1.2.3`).

- **DO NOT** run `changeset publish` or `bun run release` (or similar) manually.
- **DO NOT** manually create releases on GitHub.
- The correct workflow involves creating changeset files (`bun run changeset` or manual creation), committing them, and pushing. The CI pipeline handles the rest upon tagging.


## 1. CI/CD Workflow (GitHub Actions Example)

This example workflow validates code, builds, publishes to NPM and Docker Hub (in parallel), and creates a GitHub Release upon tagging.

**Key Corrections**:

- Uses `dist` directory consistently for build artifacts.
- Uses specific, pinned versions for all GitHub Actions.

````yaml
# .github/workflows/ci-release.yml
name: CI, Publish & Release

on:
  push:
    branches:
      - main # Trigger on push to main branch
    tags:
      - 'v*.*.*' # Trigger on push of version tags (e.g., v0.5.5)
  pull_request:
    branches:
      - main # Trigger on PR to main branch

jobs:
  validate:
    name: Validate Code Quality
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4.1.7 # Pinned version

      - name: Install pnpm
        uses: pnpm/action-setup@v4.0.0 # Pinned version
        with:
          version: latest # Use the latest pnpm version

      - name: Set up Node.js
        uses: actions/setup-node@v4.0.3 # Pinned version
        with:
          node-version: 'lts/*' # Use latest LTS
          cache: 'pnpm' # Let pnpm handle caching via pnpm/action-setup

      - name: Install dependencies
        run: pnpm install --frozen-lockfile # Use frozen lockfile for reproducibility

      - name: Check Formatting
        run: pnpm run check-format # Fails job if check fails

      - name: Lint Code
        run: pnpm run lint # Fails job if lint fails

      - name: Run Tests and Check Coverage
        # Ensure test:cov script outputs JUnit XML (e.g., --reporter=junit --outputFile=test-report.junit.xml)
        run: pnpm run test:cov # Fails job if tests fail or coverage threshold not met

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v4.5.0 # Pinned version
        with:
          token: ${{ secrets.CODECOV_TOKEN }} # Use Codecov token
          files: ./coverage/lcov.info # Specify LCOV file path
          fail_ci_if_error: true # Recommended
          # Note: Ensure the target repository is enabled on Codecov.io

      - name: Upload test results to Codecov (for Test Analytics)
        # Run this step even if tests fail to report failures
        if: ${{ !cancelled() }}
        uses: codecov/test-results-action@v1.7.0 # Pinned version
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
          files: ./test-report.junit.xml # Specify JUnit report path

      - name: Upload coverage reports artifact (optional)
        uses: actions/upload-artifact@v4.4.0 # Pinned version
        with:
          name: coverage-report
          path: coverage/ # Upload the whole coverage directory

  build-archive:
    name: Build and Archive Artifacts
    needs: validate # Depends on successful validation
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v') # Only run for tags
    outputs: # Define outputs for the release job
      version: ${{ steps.get_version.outputs.version }}
      artifact_path: ${{ steps.archive_build.outputs.artifact_path }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4.1.7

      - name: Install pnpm
        uses: pnpm/action-setup@v4.0.0
        with:
          version: latest

      - name: Set up Node.js
        uses: actions/setup-node@v4.0.3
        with:
          node-version: 'lts/*'
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build project
        run: pnpm run build # Assumes this outputs to 'dist'

      - name: Get package version from tag
        id: get_version
        run: |
          VERSION=$(echo "${{ github.ref }}" | sed 's#refs/tags/##')
          echo "version=$VERSION" >> $GITHUB_OUTPUT

      - name: Archive build artifacts for release
        id: archive_build
        run: |
          # Archive the 'dist' directory and other relevant files
          ARTIFACT_NAME="project-name-${{ steps.get_version.outputs.version }}.tar.gz" # Replace project-name
          tar -czf $ARTIFACT_NAME dist package.json README.md LICENSE # Add other relevant files like CHANGELOG.md
          echo "artifact_path=$ARTIFACT_NAME" >> $GITHUB_OUTPUT

      - name: Upload build artifact for release job
        uses: actions/upload-artifact@v4.4.0
        with:
          name: release-artifact
          path: ${{ steps.archive_build.outputs.artifact_path }}

  publish-npm:
    name: Publish to NPM
    needs: build-archive # Depends on build-archive completion
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v') # Only run for tags
    permissions:
      id-token: write # Required for trusted publishing to NPM
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4.1.7

      - name: Install pnpm
        uses: pnpm/action-setup@v4.0.0
        with:
          version: latest

      - name: Set up Node.js for NPM
        uses: actions/setup-node@v4.0.3
        with:
          node-version: 'lts/*'
          registry-url: 'https://registry.npmjs.org/'
          cache: 'pnpm'

      # Install dependencies needed for prepublishOnly script (which runs build)
      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Publish packages to npm
        # changeset publish handles publishing only packages that were versioned
        run: pnpm changeset publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
          NPM_CONFIG_PROVENANCE: true # Recommended for security supply chain

  publish-docker:
    name: Publish to Docker Hub
    needs: build-archive # Depends on build-archive completion
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v') # Only run for tags
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4.1.7

      - name: Set up QEMU
        uses: docker/setup-qemu-action@v3.2.0 # Pinned version

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3.5.0 # Pinned version

      - name: Log in to Docker Hub
        uses: docker/login-action@v3.3.0 # Pinned version
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_TOKEN }}

      - name: Extract metadata (tags, labels) for Docker
        id: meta
        uses: docker/metadata-action@v5.5.1 # Pinned version
        with:
          images: sylphlab/your-image-name # Replace with your image name
          # Use version from the build-archive job output
          tags: |
            type=semver,pattern={{version}},value=${{ needs.build-archive.outputs.version }}
            type=semver,pattern={{major}}.{{minor}},value=${{ needs.build-archive.outputs.version }}
            type=raw,value=latest,enable=${{ startsWith(github.ref, 'refs/tags/v') }}

      - name: Build and push Docker image
        uses: docker/build-push-action@v6.7.0 # Pinned version
        with:
          context: .
          push: true
          tags: ${{ steps.meta.outputs.tags }}
          labels: ${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  release:
    name: Create GitHub Release
    needs: [publish-npm, publish-docker] # Depends on successful parallel publishes
    runs-on: ubuntu-latest
    if: startsWith(github.ref, 'refs/tags/v') # Only run for tags
    permissions:
      contents: write # Need permission to create releases
    steps:
      - name: Download build artifact
        uses: actions/download-artifact@v4.1.8 # Pinned version
        with:
          name: release-artifact
          # Downloads to current directory

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2.0.6 # Pinned version
        with:
          tag_name: ${{ github.ref_name }}
          name: Release ${{ github.ref_name }}
          generate_release_notes: true # Auto-generate release notes from commits
          files: ${{ needs.build-archive.outputs.artifact_path }} # Attach the artifact archive
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

## 2. Dockerfile Example (Node.js/TypeScript)

This multi-stage Dockerfile provides a good starting point for containerizing Node.js/TypeScript applications, focusing on security (non-root user) and efficiency (pruning dev dependencies).

**Key Corrections**:
- Uses `dist` directory consistently for build output.

```dockerfile
# Stage 1: Build the application
# Use a specific LTS Alpine version for reproducibility and security
FROM node:20.15.1-alpine AS builder
WORKDIR /app

# Install pnpm globally within this stage (ensures Dockerfile works standalone)
RUN npm install -g pnpm@latest # Consider pinning pnpm version too if needed

# Copy package files
# Using pnpm-lock.yaml ensures reproducible installs
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including dev for build) using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the application source code
# This includes tsconfig.json and the src directory
COPY . .

# Build the TypeScript project (outputs to 'dist' based on tsconfig.json)
RUN pnpm run build

# Remove development dependencies after build to reduce image size
RUN pnpm prune --prod

# Stage 2: Create the final lightweight production image
# Use the same specific LTS Alpine version
FROM node:20.15.1-alpine
WORKDIR /app

# Create a non-root user and group for security
# Running as non-root is a best practice
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built artifacts ('dist') and production dependencies from the builder stage
COPY --from=builder --chown=appuser:appgroup /app/node_modules ./node_modules
COPY --from=builder --chown=appuser:appgroup /app/dist ./dist # Copy 'dist' directory
# Copy package.json for metadata, might be useful for inspection
COPY --from=builder --chown=appuser:appgroup /app/package.json ./

# Switch to the non-root user
USER appuser

# Expose the application port (adjust if needed)
EXPOSE 3000

# Command to run the server using the built output in 'dist'
# This assumes your entry point is dist/index.js
CMD ["node", "dist/index.js"]
````
