# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && \
    npm cache clean --force

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine AS production

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Add labels
LABEL org.opencontainers.image.title="HydraMax9" \
      org.opencontainers.image.description="AXIOM HIVE Deterministic AI Substrate" \
      org.opencontainers.image.vendor="Axiom Hive" \
      org.opencontainers.image.source="https://github.com/AXI0MH1VE/HydraMax9"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
