#!/usr/bin/env bash

cd "$(dirname "${BASH_SOURCE[0]}")/.."

docker-compose down -v
docker-compose up -d

# https://stackoverflow.com/questions/35069027/docker-wait-for-postgresql-to-be-running
RETRIES=10

until psql -H postgres://postgres@localhost:5432/postgres -c "select 1" > /dev/null 2>&1 || [ $RETRIES -eq 0 ]; do
  echo "Waiting for postgres server, $((RETRIES--)) remaining attempts..."
  sleep 1
done

cd packages/models/;

# delete current patch
rm migration/*ts

# Generate new patch
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -n Init

echo "

-------------------------------------------------------------------------------------
New migration generated.
-------------------------------------------------------------------------------------

";
