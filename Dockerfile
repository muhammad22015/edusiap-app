FROM node:20 AS builder
WORKDIR /app

# Salin hanya file konfigurasi terlebih dulu
COPY package*.json ./

# Install ulang dependency di Linux environment
RUN npm install

# Baru salin source code
COPY . .

# Jalankan build Next.js
RUN npm run build

# Tahap produksi: hanya copy hasil build
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