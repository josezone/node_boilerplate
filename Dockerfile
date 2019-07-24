FROM node:10-alpine
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 9229 9230
RUN npm i npm@latest -g
RUN mkdir /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
COPY package.json package-lock.json* ./
RUN apk add --no-cache --virtual .build-deps alpine-sdk python  && npm install --production --silent && npm cache clean --force && apk del .build-deps
USER node
ENV PATH /home/node/app/node_modules/.bin:$PATH
WORKDIR /home/node/app
COPY . .
# COPY docker-entrypoint.sh /usr/local/bin/
# ENTRYPOINT ["docker-entrypoint.sh"]
CMD [ "npm", "start" ]