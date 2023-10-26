FROM node:16.6.1-stretch-slim AS build
WORKDIR /src
COPY . .

ARG LANG
ARG SITE
ARG BRAND

RUN npm install
RUN npm run build --BRAND=${BRAND} --API_URL=/ --SITE=${SITE} --DEFAULT_LANGUAGE=${LANG}

FROM caddy:2.1.1-alpine
COPY --from=build /src/caddy/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /dist /usr/share/caddy