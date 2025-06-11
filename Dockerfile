FROM node:20-alpine AS builder
WORKDIR /app

# Install tool agar bisa build native module (lightningcss)
RUN apk add --no-cache build-base python3 make gcc g++ rust cargo

COPY package*.json ./

# Force install ulang lightningcss di environment Linux
ENV CARGO_NET_GIT_FETCH_WITH_CLI=true
RUN npm install
RUN npm rebuild lightningcss --build-from-source


COPY . .

RUN npm run build

FROM node:20-alpine
WORKDIR /app

# Salin hasil build standalone (lebih minimal)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

ENV PORT 8080
EXPOSE 8080

CMD ["node", "server.js"]
