FROM node:10-alpine
RUN mkdir /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
RUN npm i npm@latest -g
RUN npm i forever@latest -g
COPY package.json package-lock.json* ./
RUN apk add --no-cache --virtual .build-deps alpine-sdk python  && npm install --silent && npm cache clean --force && apk del .build-deps
COPY . .
CMD npm run start
