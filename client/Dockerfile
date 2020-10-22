FROM node:12 as prod

WORKDIR /usr/src/app/client

COPY package.json .
COPY yarn.lock .

RUN yarn install

EXPOSE 3000

ENV NODE_ENV=production

CMD [ "yarn", "build" ]

FROM prod as dev

ENV NODE_ENV=development

CMD [ "yarn", "start" ]