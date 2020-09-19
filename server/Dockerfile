FROM node:12 as prod

WORKDIR /usr/src/app/server

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .

ENV NODE_ENV=production

CMD [ "yarn", "start" ]

FROM prod as dev

ENV NODE_ENV=development

RUN npm install -g nodemon

RUN yarn install --only=dev

CMD [ "yarn", "dev" ]