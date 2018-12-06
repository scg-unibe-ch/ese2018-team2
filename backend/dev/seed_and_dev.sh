#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")/.."

docker-compose down -v;
docker-compose up -d;

# https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running
RETRIES=10
until docker run -it --rm --network=backend_default --link postgres postgres:11.1-alpine psql -H postgres://postgres@postgres:5432 -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

clear

yarn install;

clear;

yarn run clean;
yarn run build;

clear;

# Do migration
yarn --cwd="packages/models" run migrate;

clear;

# Run demeter
yarn --cwd="applications/demeter" run start;

yarn watch;