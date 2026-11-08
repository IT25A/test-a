# Dockerfile

# base image
FROM node:26-alpine

# create & set working directory
RUN mkdir -p /app
WORKDIR /app

# copy source files
COPY . /app

# install dependencies
RUN npm ci

# folder for the SQLite file (attached as a volume in app.it25a.yml)
RUN mkdir -p /data && chown node:node /data
ENV DB_PATH=/data/entries.db

USER node

# start app
EXPOSE 3001
CMD npm run start