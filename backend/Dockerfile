FROM node:8.12.0-jessie AS build
WORKDIR /app
COPY package*.json ./
COPY src/ ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY schema.graphql ./
COPY graphqlgen.yml ./
RUN yarn
RUN yarn build

FROM node:8.12.0-alpine AS release
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/schema.graphql ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/yarn.lock ./
COPY --from=build /app/graphqlgen.yml ./
RUN yarn --production

EXPOSE 4000

CMD ["node", "dist/index.js"]