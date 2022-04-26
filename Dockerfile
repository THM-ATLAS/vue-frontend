FROM node:14 AS BASE

WORKDIR /frontend

COPY package*.json ./

#RUN mkdir -p /frontend/node_modules

#RUN chown -R $user:$user /frontend/node_modules

RUN npm i

FROM BASE as DEV

EXPOSE 8080

USER $user

CMD [ "npm", "run", "serve"]

FROM BASE as BUILD

COPY . .

RUN npm run build --prod

FROM nginx:1.19 AS PRODUCTION

EXPOSE 8080

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=BUILD --chown=www-data:www-data /frontend/dist /frontend