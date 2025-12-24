# Docker Setup Guide

This guide provides instructions for building and running the Dama Productions website using Docker.

## Prerequisites

- Docker installed (version 20.10 or later)
- Docker Compose installed (version 2.0 or later)
- Environment variables configured (see Environment Variables section)

## Environment Variables

The application requires the following environment variables:

### Required (with defaults)

- `NEXT_PUBLIC_APPWRITE_ENDPOINT` - Appwrite endpoint URL (defaults to `https://api.center-phone.com.io/v1`)
- `NEXT_PUBLIC_APPWRITE_DATABASE_ID` - Appwrite database ID (defaults to `dama_db`)

### Optional

- `APPWRITE_API_KEY` - Appwrite API key for admin operations (required for CMS functionality)

### Setting Environment Variables

You can set environment variables in several ways:

1. **Using a `.env` file** (recommended for local development):
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.center-phone.com.io/v1
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=dama_db
   APPWRITE_API_KEY=your-api-key-here
   ```

2. **Using docker-compose.yml**: Edit the `environment` section in `docker-compose.yml`

3. **Using command line** (for `docker run`):
   ```bash
   docker run -e NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.center-phone.com.io/v1 ...
   ```

## Building the Docker Image

### Using Docker directly:

```bash
docker build -t dama-website .
```

### Using Docker Compose:

```bash
docker-compose build
```

## Running the Container

### Using Docker directly:

```bash
docker run -d \
  -p 5589:5589 \
  -e NEXT_PUBLIC_APPWRITE_ENDPOINT=https://api.center-phone.com.io/v1 \
  -e NEXT_PUBLIC_APPWRITE_DATABASE_ID=dama_db \
  --name dama-website \
  dama-website
```

### Using Docker Compose (recommended):

```bash
# Create a .env file with your environment variables first
docker-compose up -d
```

The application will be available at `http://localhost:5589`

## Development vs Production

### Production (Current Setup)

The current Dockerfile and docker-compose.yml are optimized for production:

- Multi-stage build for smaller image size
- Standalone output mode for Next.js
- Runs as non-root user for security
- Production optimizations enabled

### Development

For development with hot-reload, you can modify `docker-compose.yml`:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    command: npm run dev
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      - NODE_ENV=development
      # ... other environment variables
```

Note: You'll need to create a separate Dockerfile for development or modify the existing one.

## Viewing Logs

### Using Docker:

```bash
docker logs -f dama-website
```

### Using Docker Compose:

```bash
docker-compose logs -f app
```

## Stopping the Container

### Using Docker:

```bash
docker stop dama-website
docker rm dama-website
```

### Using Docker Compose:

```bash
docker-compose down
```

## Health Check

The container includes a health check that verifies the application is responding. You can check the health status:

```bash
docker ps
# Look for "healthy" status in the STATUS column
```

Or:

```bash
docker inspect dama-website | grep -A 10 Health
```

## Troubleshooting

### Port 5589 is already in use

If port 5589 is already in use, you can change the port mapping in `docker-compose.yml`:

```yaml
ports:
  - "3390:5589"  # Map host port 3390 to container port 5589
```

Then access the application at `http://localhost:3390`

### Build fails with "Cannot find module"

Ensure that:
1. All dependencies are properly installed locally before building
2. The `.dockerignore` file is not excluding necessary files
3. The `package.json` and `package-lock.json` are included in the build context

### Application won't start

1. Check the logs: `docker-compose logs app`
2. Verify environment variables are set correctly
3. Ensure the Appwrite endpoint is accessible from the container
4. Check that the port is not blocked by a firewall

### Container exits immediately

1. Check logs: `docker-compose logs app`
2. Verify the build completed successfully
3. Ensure all required environment variables are set
4. Check that the `.next/standalone` directory exists after build

### Environment variables not working

For `NEXT_PUBLIC_*` variables, ensure they are set at build time as well if needed. However, for runtime configuration, setting them in `docker-compose.yml` or via `docker run -e` should work.

## Image Size Optimization

The Dockerfile uses multi-stage builds to minimize the final image size:

- Base image: Node.js 20 Alpine (~50MB)
- Dependencies stage: Installs only production dependencies
- Builder stage: Builds the Next.js application
- Runner stage: Final image contains only the standalone build output

The final image should be significantly smaller than building with a full Node.js image.

## Security Considerations

- The container runs as a non-root user (`nextjs` with UID 1001)
- Only necessary files are copied to the final image
- Environment variables containing secrets should be managed securely (use Docker secrets or environment variable files with proper permissions)

