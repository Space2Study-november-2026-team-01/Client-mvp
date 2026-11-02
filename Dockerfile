# syntax=docker/dockerfile:1

ARG NODE_VERSION=22
ARG NGINX_VERSION=1.30.6

FROM node:${NODE_VERSION}-alpine AS build

WORKDIR /app

ENV HUSKY=0

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . .

# Declared after COPY so a local .env cannot override an explicit build-arg.
ARG VITE_API_BASE_PATH=http://localhost:8080
ARG VITE_GMAIL_CLIENT_ID=
ARG VITE_APP_IMG_URL=
ARG VITE_APP_IMG_USER_URL=
ARG VITE_APP_TINY_MCE_API_KEY=

ENV VITE_API_BASE_PATH=$VITE_API_BASE_PATH \
    VITE_GMAIL_CLIENT_ID=$VITE_GMAIL_CLIENT_ID \
    VITE_APP_IMG_URL=$VITE_APP_IMG_URL \
    VITE_APP_IMG_USER_URL=$VITE_APP_IMG_USER_URL \
    VITE_APP_TINY_MCE_API_KEY=$VITE_APP_TINY_MCE_API_KEY

RUN npm run build

FROM nginx:${NGINX_VERSION}-alpine AS runtime

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
