FROM node:14.4.0
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE ${PORT}
CMD npm run start:${NODE_ENV}