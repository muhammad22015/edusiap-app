# 1. Step: Build stage
FROM node:18 AS builder

WORKDIR /app

# Copy only necessary files first to optimize cache
COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./

# Install dependencies
RUN npm install

# Copy all other source code
COPY . .

# Build the Next.js app
RUN npm run build

# 2. Step: Production image
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only necessary artifacts from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Next.js uses port 3000 by default
EXPOSE 3000

# Start the server
CMD ["npm", "start"]
