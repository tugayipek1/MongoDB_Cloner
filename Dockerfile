# build frontend
FROM node:14 as build
WORKDIR /app
COPY ./frontend/package.json /app/package.json
RUN npm install --silent
COPY ./frontend /app
RUN npm run build



#app
FROM node:14
WORKDIR /usr/src/app


COPY ./app/package.json ./package.json
RUN npm install --unsafe-perm --only=prod
COPY ./app ./
COPY --from=build /app/dist ./html

CMD [ "node", "app.js" ]