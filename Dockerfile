ARG BUILD_DIR
FROM $BUILD_DIR as base

FROM node:16.6.1-stretch-slim AS build
WORKDIR /src
COPY . .

## https://github.com/docker/for-mac/issues/2155
## https://github.com/moby/moby/issues/38379

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/base /usr/share/caddy/