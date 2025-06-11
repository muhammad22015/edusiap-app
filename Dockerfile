# Build stage
FROM node:20 AS builder
WORKDIR /app

# Copy dependency files only
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js
RUN npm run build

# Runtime stage
FROM node:20
WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV PORT=8080
EXPOSE 8080

CMD ["node", "server.js"]
