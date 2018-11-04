docker-compose down -v;
docker-compose up -d postgres;
sleep 1;
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -n Init;
echo "
-------------------------------------------------------------------------------------
Replace used migration InitFile in src/index.ts with the newly createt version.
-------------------------------------------------------------------------------------
