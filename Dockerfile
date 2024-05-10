FROM oven/bun

WORKDIR /app

RUN apt-get update
RUN apt-get install -y wget curl

COPY . /app/

RUN bun install

RUN bun --bun run build

CMD ["bun", "--bun", "run", "build/index.js"]