# Installs Node.js image
FROM node:14.17.4-alpine

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /app
EXPOSE 4000
COPY ./src ./src

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", ".eslintrc.json" ,"tsconfig.build.json" ,"tsconfig.json", ".env.development", "jest.config.js","./"]

RUN apk update && apk add bash



# Installs all packages
RUN npm install
