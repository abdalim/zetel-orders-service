FROM node:14.4.0
WORKDIR /app
COPY . /app
RUN npm install
RUN npm build
EXPOSE ${PORT}
CMD npm run start:${NODE_ENV}