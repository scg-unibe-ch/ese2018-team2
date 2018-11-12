# ESE2018 - Team 2 [![Build Status](https://travis-ci.com/eseTeam2/ese2018-team2.svg?branch=master)](https://travis-ci.com/eseTeam2/ese2018-team2)

This is the monorepo of a student job board application.
This application was developed in the context of
[*ESE: Introduction to Software Engineering*](http://scg.unibe.ch/teaching/ese?_s=Nsa-grgFUmyAcN6b&_k=42JrWQtE&_n&15),
a course for Bachelor students in Computer Science at the University of Bern.

## Monorepo Structure

* **/frontend** Source of the front end.
* **/backend** Source of the back end.
* **/doc** Requirements and meeting protocols.

## How to Run

Ensure the following tools are installed:

* [Docker](https://www.docker.com)
* [Docker Compose](https://docs.docker.com/compose/)

To run this project use `docker-compose build` then `docker-compose up -d`.

After docker-compose finished you can browse the following urls:

* [front end: http://localhost:3000](http://localhost:3000)
* [back end: http://localhost:4000](http://localhost:4000)

The PostgreSQL instance runs on *localhost:5432*.

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