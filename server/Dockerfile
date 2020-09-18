FROM node:12

WORKDIR /usr/src/app/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

CMD ./scripts/start.sh