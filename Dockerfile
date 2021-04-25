# ---- Base Node ----
FROM node:12.22.1-alpine3.10 AS base

COPY . .

RUN npm install
RUN npm run build

# ---- Prod ----
FROM nginx

COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=base build /app/static
