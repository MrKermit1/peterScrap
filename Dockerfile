FROM ghcr.io/puppeteer/puppeteer:16.1.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci
COPY . .
CMD [ "node", "server.js"]