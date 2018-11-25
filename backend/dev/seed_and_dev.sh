#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")/.."

docker-compose down -v;
docker-compose up -d;

# https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running
RETRIES=10

until psql -H postgres://postgres@localhost:5432/postgres -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

clear

yarn;

clear;

yarn run clean;

clear;

yarn run build;

clear;

./node_modules/.bin/ts-node node_modules/.bin/typeorm migration:run;

clear;

yarn seed;

clear;

yarn dev;