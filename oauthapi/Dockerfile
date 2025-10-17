# 1️⃣ Build Stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# 2️⃣ Runtime Stage
FROM node:20-alpine

WORKDIR /app

# Copy only built files and minimal deps
COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

# Expose Nest default port
EXPOSE 3004

# Start the app
CMD ["node", "dist/main.js"]
