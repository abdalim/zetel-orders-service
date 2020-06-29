![CICD](https://github.com/abdalim/zetel-orders-service/workflows/CICD/badge.svg)

# zetel-orders-service

- Zetel app's orders service
- Endpoints:
  - GET /order =  get list of orders
  - GET /order/:id = get details of an order
  - POST /order/:id = create a new order
  - DELETE /order/:id = cancel an order

## Details

- Tech
  - Typescript
  - NestJS
  - Jest
  - TypeORM
  - Postgresql
  - Docker
  - eslint
  - Prettier
- Unit tests
- Continuous deployment with Github Action and Github Package Registry

## Development Guide

### Setup

- Duplicate `*.env.template` files,  eg `.env.template`, and fill in config details as env vars and remove the `.template` suffix

- Create `db_data` folder in `db/ordersdb`

- start Postgresql DB locally

```
> npm run db:start
```

- run DB migration

```
> npm run env:load && npm run db:migrate
```

- start service with hot-reload

```
> npm run start:dev
```

- start coding

### Unit testing

```
> npm run test
```

### Cleanup

- stop DB

```
> npm run db:stop
```

### Run as containers locally

- create user defined bridge network to connect self-containers

```
> npm run network:create
```

- start DB

```
> npm run docker:db:start
```

- build service

```
> npm run docker:build
```

- start service

```
> npm run docker:start
```

### Stop containers locally

- stop service

```
> npm run docker:stop
```

- stop db

```
> npm run db:stop
```

- cleanup network

```
> npm run network:remove
```

## Future Improvements

- End-to-end integration testing
- Related infrastructure resources as codes under `/ops` directory

