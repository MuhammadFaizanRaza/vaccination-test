# Local Development setup

# Env Files

1. for development .env.deveploment
2. for production .env.production

## Requirements Without Docker

1. nodejs && install mongodb
2. file at the root directory of your project .env.development add mongo connection url
3. run command for development: `npm run dev`
4. run command for production: `npm run production`
5. run command for test cases: `npm run test`
6. run commant for lint: `npm run lint`

## Requirements With Docker

- Docker
- Docker-compose

## Configure Docker

Linux/MacOS only: By default your user cannot run docker commands without `sudo`. If you want to make your life easier, do the following:

1. Create a `docker` group:
   `sudo groupadd docker`
2. Add your user to the `docker` group:
   `sudo usermod -aG docker $USER`

Your group membership gets updated when you log out and log back in. After next login you can run `docker` commands without `sudo`. If you do not do this or cannot do this for some reason, remember to add `sudo` before any `docker` command.

## Setup repository

Go to the directory `cd `

1. Put `.env.development` file at the root directory of your project
2. Build the docker images and run the project: `docker-compose up --build`

## How to run

1. After first initialization simply: `docker-compose up`

## API Base URL

http://localhost:4500/api/v1

## API Vaccination Summary URL

http://localhost:4000/api/v1/vaccinations/vaccine-summary?c=AT&dateFrom=2022-W01&dateTo=2022-W20&range=5
