FROM node:22-alpine AS base

# deps ステージ
FROM base AS deps
WORKDIR /app

COPY package*.json ./
RUN npm ci

# builder ステージ
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# runner ステージ
FROM base AS runner
WORKDIR /app

# ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next
RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

CMD HOSTNAME="0.0.0.0" node server.js