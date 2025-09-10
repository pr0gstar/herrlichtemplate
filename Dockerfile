# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION
ENV BUN_VERSION=${BUN_VERSION}
FROM oven/bun:${BUN_VERSION}-slim AS base

# Remix app lives here
WORKDIR /app

# NPM Token
ARG NPM_TOKEN
ENV NPM_TOKEN=${NPM_TOKEN}

# Github Token
ARG MY_GITHUB_TOKEN
ENV MY_GITHUB_TOKEN=${MY_GITHUB_TOKEN}
# Github Owner
ARG GITHUB_OWNER
ENV GITHUB_OWNER=${GITHUB_OWNER}
# Github Repo
ARG GITHUB_REPO
ENV GITHUB_REPO=${GITHUB_REPO}
# Github Branch
ARG GITHUB_BRANCH
ENV GITHUB_BRANCH=${GITHUB_BRANCH}

# Set production environment
ENV NODE_ENV="production"

# Throw-away build stage to reduce size of final image
FROM base AS build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3

# Install node modules
COPY bun.lock package.json bunfig.toml ./
RUN bun install

# Copy application code
COPY . .

# Build application
RUN bun --bun run build

# Remove development dependencies
RUN rm -rf node_modules && \
    bun install --ci


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "bun", "run", "start" ]
