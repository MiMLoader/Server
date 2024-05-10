FROM oven/bun

WORKDIR /app

RUN apt-get update
RUN apt-get install -y wget curl

COPY package.json .
COPY bun.lockb .

RUN bun install

COPY src src
COPY tsconfig.json .
COPY svelte.config.js .
COPY vite.config.ts .
COPY docs.md .
COPY docs.html .
COPY .svelte-kit .svelte-kit
COPY static static

RUN bun --bun run build

COPY build build

CMD ["bun", "--bun", "run", "build/index.js"]