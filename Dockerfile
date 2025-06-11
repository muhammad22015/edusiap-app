# Tahap build: compile Next.js app
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Tahap production: hanya file yang dibutuhkan
FROM node:20-alpine
WORKDIR /app

# Copy semua hasil build yang dibutuhkan ke container akhir
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./

ENV PORT 8080
EXPOSE 8080

CMD ["npx", "next", "start", "-p", "8080"]