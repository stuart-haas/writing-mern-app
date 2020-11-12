FROM node:12 as prod

WORKDIR /usr/src/app/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD [ "yarn", "start" ]

FROM prod as dev

ENV NODE_ENV=development

RUN yarn global add nodemon

CMD [ "yarn", "dev" ]