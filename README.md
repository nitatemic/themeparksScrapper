# ThemeParkScrapper

It is a backend application that retrieves the waiting times of the attractions of the different
Disneyland parks around the world and stores them in a database.

## Why?

I have as a project to make an application that displays statistics on waiting times, for this I
need to store the waiting times, so I made this project to meet this need. I make a request every 10
minutes to store the waiting times every 10 minutes.

## How?

The application runs on a NodeJS server, it uses Express, Axios (to make requests to the ThemeParks
API) and MySQL/MariaDB for the database. The endpoint to trigger the extraction is host:
3001/waitingTimes

## How to run the application?

You need to make an .env file with the variables MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD,
MYSQL_DATABASE, PROTOCOL

To configure the database, here is a SQL dump that will add all the parks and attractions in the
database.
