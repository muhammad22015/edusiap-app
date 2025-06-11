# ---------- Build Stage ----------
FROM node:20 AS builder
WORKDIR /app

# Install dependencies (no need for apk in Debian-based image)
RUN apt-get update && \
    apt-get install -y python3 make gcc g++ rust cargo && \
    apt-get clean

COPY package*.json ./

# Force install lightningcss with source build
ENV CARGO_NET_GIT_FETCH_WITH_CLI=true
RUN npm install
RUN npm rebuild lightningcss --build-from-source

COPY . .

RUN npm run build

# ---------- Runtime Stage ----------
FROM node:20 AS runner
WORKDIR /app

# Copy only what's needed for standalone deployment
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV PORT 8080
EXPOSE 8080

CMD ["node", "server.js"]
