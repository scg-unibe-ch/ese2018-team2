FROM node:8.12.0-jessie AS build

WORKDIR /app

COPY . .

RUN yarn
RUN yarn build

FROM node:8.12.0-alpine AS release

WORKDIR /app
COPY --from=build /app/static ./static/
COPY --from=build /app/package.json .
COPY --from=build /app/yarn.lock .
COPY --from=build /app/.next/ ./.next/
RUN yarn --production

EXPOSE 3000

CMD ["yarn", "start"]