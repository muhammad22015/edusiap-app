# Build stage
FROM node:20 AS builder
WORKDIR /app

# Install native build tools
RUN apt-get update && apt-get install -y python3 make gcc g++ rust cargo

# Copy dependency files only
COPY package*.json ./
ENV CARGO_NET_GIT_FETCH_WITH_CLI=true
RUN npm install
RUN npm rebuild lightningcss --build-from-source

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
