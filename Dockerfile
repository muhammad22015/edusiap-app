# Tahap build
FROM node:20 AS builder
WORKDIR /app

# Salin file config lebih dulu
COPY package*.json ./

# Pastikan clean install dan native rebuild untuk lightningcss
RUN npm install --ignore-scripts && \
    npm rebuild lightningcss && \
    npm run postinstall || true

# Salin semua source code
COPY . .

# Jalankan build
RUN npm run build

# Tahap produksi
FROM node:20-alpine
WORKDIR /app

# Salin hasil build saja
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./

ENV PORT 8080
EXPOSE 8080

CMD ["npx", "next", "start", "-p", "8080"]
