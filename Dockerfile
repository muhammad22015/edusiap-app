# --- Step 1: Build the app ---
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY . .

RUN npm install
RUN npm run build

# --- Step 2: Run the app using Node.js ---
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
