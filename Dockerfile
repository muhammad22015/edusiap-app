FROM node:20 AS builder
WORKDIR /app

# 1️⃣ Salin file konfigurasi
COPY package*.json ./

# 2️⃣ Install ulang dengan native binary Linux
RUN npm install --ignore-scripts && \
    npm rebuild lightningcss

# 3️⃣ Salin seluruh project
COPY . .

# 4️⃣ Build Next.js app
RUN npm run build

# 5️⃣ Tahap produksi
FROM node:20-alpine
WORKDIR /app

# Salin hasil build dari builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./

ENV PORT 8080
EXPOSE 8080

CMD ["npx", "next", "start", "-p", "8080"]
