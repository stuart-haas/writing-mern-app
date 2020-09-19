FROM node:12 as prod

WORKDIR /usr/src/app/client

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV NODE_ENV=production

CMD [ "yarn", "build" ]

FROM prod as dev

ENV NODE_ENV=development

CMD [ "yarn", "start" ]