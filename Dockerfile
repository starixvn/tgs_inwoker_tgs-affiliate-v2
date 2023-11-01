ARG BUILD_DIR

FROM node:16.6.1-stretch-slim AS build
WORKDIR /src
COPY . .

RUN npm install

RUN echo "BUILD_DIR=$BUILD_DIR"

FROM $BUILD_DIR as base

## https://github.com/docker/for-mac/issues/2155

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build base /usr/share/caddy/