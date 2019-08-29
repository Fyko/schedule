FROM node:12-alpine

LABEL name "Twitter Schedule"
LABEL maintainer "Carter <me@fyko.net>"

WORKDIR /usr/schedule

COPY package.json package-lock.json ./

RUN apk add --update \
        && apk add --no-cache --virtual .build-deps git build-base g++ python

RUN npm install \
        && apk del .build-deps

COPY . .

RUN npm run build
CMD [ "npm", "start" ]
