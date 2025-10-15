# syntax=docker/dockerfile:1.7

ARG APP_NAME=account-api
ARG DIST_DIR=dist/account-api   # override to dist/apps/account-api if you prefer

# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm install

# --- build ---
FROM node:20-alpine AS builder
WORKDIR /workspace
COPY --from=deps /workspace/node_modules ./node_modules
# nx + tsconfig + sources
COPY package.json package-lock.json nx.json tsconfig.base.json tsconfig.base.json ./
COPY account-api ./account-api
# If you actually have libs, uncomment:
# COPY libs ./libs

# 👇 FORCE Nx to emit exactly where we will copy from
ARG APP_NAME=account-api
ARG DIST_DIR=dist/account-api
RUN npx --yes nx@latest build ${APP_NAME} 

# (optional) show where files landed
RUN echo "Built to: ${DIST_DIR}" && (ls -la ${DIST_DIR} || (echo "Nothing in ${DIST_DIR}"; ls -R dist || true; exit 1))

# --- prod deps ---
FROM node:20-alpine AS prod-deps
WORKDIR /workspace
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm npm install --omit=dev

# --- runner ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=prod-deps /workspace/node_modules ./node_modules
ARG DIST_DIR=dist/account-api
COPY --from=builder /workspace/${DIST_DIR} ./dist
EXPOSE 3001
CMD ["node", "dist/main.js"]
