FROM node:16.6.1-stretch-slim AS build
WORKDIR /src
COPY . .

RUN npm install

ARG BRAND

RUN echo "BRAND=$BRAND"

FROM ${BRAND} as base

## https://github.com/docker/for-mac/issues/2155

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/base /usr/share/caddy/