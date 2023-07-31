FROM node:18-alpine

WORKDIR usr/src/app
COPY . .

ENV HOST=0.0.0.0
ENV PORT=3000

CMD ["node", "./dist/server/entry.mjs"]

EXPOSE $PORT
