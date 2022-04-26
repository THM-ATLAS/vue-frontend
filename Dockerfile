FROM node:14 AS base

WORKDIR /frontend

COPY package*.json ./

#RUN mkdir -p /frontend/node_modules

#RUN chown -R $user:$user /frontend/node_modules

RUN npm i

FROM base as dev

EXPOSE 8080

USER $user

CMD [ "npm", "run", "serve"]

FROM base as build

COPY . .

RUN npm run build --prod

FROM nginx:1.19 AS production

EXPOSE 8080

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=BUILD --chown=www-data:www-data /frontend/dist /frontend