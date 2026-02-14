FROM oven/bun:1-alpine
RUN apk add --no-cache nodejs
WORKDIR /app

COPY package.json bun.lock ./
COPY prisma ./prisma/
RUN bun install --frozen-lockfile && bunx prisma generate

COPY . .
RUN bun run build

CMD ["node", "dist/src/main"]
