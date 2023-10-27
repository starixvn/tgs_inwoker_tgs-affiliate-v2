FROM node:16.6.1-stretch-slim AS build
WORKDIR /src
COPY . .

RUN npm install

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /dist /usr/share/caddy