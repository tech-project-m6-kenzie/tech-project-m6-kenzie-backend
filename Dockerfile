FROM node:16.15.1

ENV PORT=3000

EXPOSE 3000

WORKDIR /app

COPY "package.json" .

RUN yarn

COPY . .

USER node

CMD ["yarn", "dev"]