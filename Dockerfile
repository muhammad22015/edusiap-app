FROM node:20-alpine AS builder
WORKDIR /app

# Install tool agar bisa build native module (lightningcss)
RUN apk add --no-cache build-base python3 make gcc g++ rust cargo

COPY package*.json ./

# Force install ulang lightningcss di environment Linux
ENV CARGO_NET_GIT_FETCH_WITH_CLI=true
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.js ./

ENV PORT 8080
EXPOSE 8080

CMD ["npx", "next", "start", "-p", "8080"]
