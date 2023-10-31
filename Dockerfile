FROM node:16.6.1-stretch-slim AS build
WORKDIR /src
COPY . .

RUN npm install

ARG BRAND

RUN echo "BRAND=$BRAND"

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /src/$BRAND /usr/share/caddy