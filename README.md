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

To run the project use `docker-compose up -d`.

After docker-compose finished you can browse the following urls:

* ~~[front end: http://localhost:3000](http://localhost:3000)~~ (Currently not available)
* [back end: http://localhost:4000](http://localhost:4000)

The PostgreSQL instance runs on *localhost:5432*.