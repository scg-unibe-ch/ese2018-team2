# ESE2018 - Team 2 [![Build Status](https://travis-ci.com/eseTeam2/ese2018-team2.svg?branch=master)](https://travis-ci.com/eseTeam2/ese2018-team2)

This is the monorepo of a student job board application.
This application was developed in the context of
[*ESE: Introduction to Software Engineering*](http://scg.unibe.ch/teaching/ese?_s=Nsa-grgFUmyAcN6b&_k=42JrWQtE&_n&15),
a course for Bachelor students in Computer Science at the University of Bern.

## Limitations

**Only MacOS or Linux are supported and you need at least 8GB of RAM.**

## Monorepo Structure

* **/frontend** Source of the front end.
* **/backend** Source of the back end.
* **/doc** Requirements and meeting protocols.

## How to Run

Ensure the following tools are installed:

* [Docker](https://www.docker.com)
* [Docker Compose](https://docs.docker.com/compose/)
* [yarn](https://yarnpkg.com/lang/en/)

### Run the back end

The *backend/dev/seed_and_dev.sh* will initialize a test environment with a pre seeded database.

After the script ran you can access the GraphQL-Playground on [back end: http://localhost:4000](http://localhost:4000).

The PostgreSQL instance runs on *localhost:5432*.

### Run the front end

You can start the front end by executing the following commands in the folder *frontend*:

````
yarn install && yarn dev
````

### Users for testing

| Username | Password | Type |
| -------- |----------| -----|
| beri | 123456 | Student |
| org | 123456 | Organisation |
| fabio | 123456 | System Adminstrator |

## Technologies

This project uses a number of different technologies. Most prominent are:

* [TypeScript](https://www.typescriptlang.org): All code is written in TypeScript.
* [React](https://reactjs.org): The front end is build with React.
* [GraphQL](https://graphql.org): The back end provides a GraphQL-API.
* [Apollo Client](https://www.apollographql.com/docs/react/): A GraphQL client which can be used with React. React components are connected with the GraphQL-API with this library.
* [Next.js](https://nextjs.org): A React framework for server side rendered pages. The front end is based on Next.js.
* [Docker](https://www.docker.com): To encapsulate front end, back end and make the developer experience a bit nicer.
* [PostgreSQL](https://www.postgresql.org): Used as the main data store.
* [redis](https://redis.io): Used to store sessions.

## Architecture Overview

````
Next.js -- GraphQL -- Back end -- PostgreSQL & Elasticsearch
````

The front end (Next.js) communicates with the back end via a GraphQL powered API. The back end stores data in PostgreSQL and indexes job postings with Elasticsearch.

The job search is implemented with Elasticsearch.

## Points of interest

 Directory | Descrption |
| -------- |----------|
| backend/applications/server | Main back end server and GraphQL API |
| backend/packages/repositories | Business logic |
| backend/packages/models | Database model and mapping |
| backend/packages/search | Search API based on Elasticsearch |
| frontend/components | React components of the front end |