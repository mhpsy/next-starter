FROM node:22.12-alpine AS builder
WORKDIR /app

COPY package.json .
COPY pnpm-lock.yaml .

RUN corepack enable
RUN corepack prepare pnpm@9.15.0 --activate
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]