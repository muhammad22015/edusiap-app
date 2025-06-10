# Tahap 1: Build stage
FROM node:20 AS builder

# Set workdir
WORKDIR /app

# Salin file
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Salin semua source code
COPY . .

# Build Next.js app
RUN npm run build

# Tahap 2: Production stage
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./

# Default port
ENV PORT 8080
EXPOSE 8080

# Jalankan app
CMD ["npx", "next", "start", "-p", "8080"]